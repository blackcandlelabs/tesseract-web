/*
Copyright 2024 New Vector Ltd.
Copyright 2022, 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import React from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
    type IProtocol,
    type IPublicRoomsChunkRoom,
    type MatrixClient,
    type Room,
    RoomMember,
} from "matrix-js-sdk/src/matrix";
import { KnownMembership } from "matrix-js-sdk/src/types";
import { sanitizeHtml } from "@element-hq/element-web-shared-utils";
import { fireEvent, render, screen, waitFor } from "test-utils-rtl";
import { flushPromisesWithFakeTimers, mkRoom, stubClient } from "test-utils";

import SpotlightDialog from "./SpotlightDialog";
import { Filter } from "./Filter";
import { MatrixClientPeg } from "../../../../MatrixClientPeg";
import { LocalRoom, LOCAL_ROOM_ID_PREFIX } from "../../../../models/LocalRoom";
import { DirectoryMember, startDmOnFirstMessage } from "../../../../utils/direct-messages";
import DMRoomMap from "../../../../utils/DMRoomMap";
import SettingsStore from "../../../../settings/SettingsStore";
import { SettingLevel } from "../../../../settings/SettingLevel";
import defaultDispatcher from "../../../../dispatcher/dispatcher";
import SdkConfig from "../../../../SdkConfig";
import { Action } from "../../../../dispatcher/actions";
import { MetaSpace } from "../../../../stores/spaces";
import { SDKContextClass } from "../../../../contexts/SDKContextClass";

vi.useFakeTimers({ shouldAdvanceTime: true });

vi.mock("../../../../utils/Feedback");

vi.mock("../../../../utils/direct-messages", async () => ({
    // @ts-ignore
    ...(await vi.importActual("../../../../utils/direct-messages")),
    startDmOnFirstMessage: vi.fn(),
}));

vi.mock("../../../../dispatcher/dispatcher", () => ({
    default: {
        register: vi.fn(),
        dispatch: vi.fn(),
    },
}));

interface IUserChunkMember {
    user_id: string;
    display_name?: string;
    avatar_url?: string;
}

interface MockClientOptions {
    userId?: string;
    homeserver?: string;
    thirdPartyProtocols?: Record<string, IProtocol>;
    rooms?: IPublicRoomsChunkRoom[];
    members?: RoomMember[];
    users?: IUserChunkMember[];
}

function mockClient({
    userId = "testuser",
    homeserver = "example.tld",
    thirdPartyProtocols = {},
    rooms = [],
    members = [],
    users = [],
}: MockClientOptions = {}): MatrixClient {
    stubClient();
    const cli = MatrixClientPeg.safeGet();
    cli.getUserId = vi.fn(() => userId);
    cli.getDomain = vi.fn(() => homeserver);
    cli.getHomeserverUrl = vi.fn(() => homeserver);
    cli.getThirdpartyProtocols = vi.fn(() => Promise.resolve(thirdPartyProtocols));
    cli.publicRooms = vi.fn((options) => {
        const searchTerm = options?.filter?.generic_search_term?.toLowerCase();
        const chunk = rooms.filter(
            (it) =>
                !searchTerm ||
                it.room_id.toLowerCase().includes(searchTerm) ||
                it.name?.toLowerCase().includes(searchTerm) ||
                sanitizeHtml(it?.topic || "", { allowedTags: [] })
                    .toLowerCase()
                    .includes(searchTerm) ||
                it.canonical_alias?.toLowerCase().includes(searchTerm) ||
                it.aliases?.find((alias) => alias.toLowerCase().includes(searchTerm)),
        );
        return Promise.resolve({
            chunk,
            total_room_count_estimate: chunk.length,
        });
    });
    cli.searchUserDirectory = vi.fn(({ term, limit }) => {
        const searchTerm = term?.toLowerCase();
        const results = users.filter(
            (it) =>
                !searchTerm ||
                it.user_id.toLowerCase().includes(searchTerm) ||
                it.display_name?.toLowerCase().includes(searchTerm),
        );
        return Promise.resolve({
            results: results.slice(0, limit ?? +Infinity),
            limited: !!limit && limit < results.length,
        });
    });
    cli.getProfileInfo = vi.fn(async (userId) => {
        const member = members.find((it) => it.userId === userId);
        if (member) {
            return Promise.resolve({
                displayname: member.rawDisplayName,
                avatar_url: member.getMxcAvatarUrl(),
            });
        } else {
            return Promise.reject();
        }
    });
    return cli;
}

describe("Spotlight Dialog", () => {
    const testPerson: IUserChunkMember = {
        user_id: "@janedoe:blackcandletech.com",
        display_name: "Jane Doe",
        avatar_url: undefined,
    };

    const testPublicRoom: IPublicRoomsChunkRoom = {
        room_id: "!room247:matrix.org",
        name: "Room #247",
        topic: "We hope you'll have a <b>shining</b> experience!",
        world_readable: false,
        num_joined_members: 1,
        guest_can_join: false,
    };

    const testDMRoomId = "!testDM:example.com";
    const testDMUserId = "@alice:blackcandletech.com";

    let testRoom: Room;
    let testDM: Room;
    let testLocalRoom: LocalRoom;

    let mockedClient: MatrixClient;

    beforeEach(() => {
        SdkConfig.reset();
        localStorage.clear();
        SettingsStore.reset();
        mockedClient = mockClient({ rooms: [testPublicRoom], users: [testPerson] });
        testRoom = mkRoom(mockedClient, "!test23:example.com");
        vi.mocked(testRoom.getMyMembership).mockReturnValue(KnownMembership.Join);
        testLocalRoom = new LocalRoom(LOCAL_ROOM_ID_PREFIX + "test23", mockedClient, mockedClient.getUserId()!);
        testLocalRoom.updateMyMembership(KnownMembership.Join);
        vi.mocked(mockedClient.getVisibleRooms).mockReturnValue([testRoom, testLocalRoom]);

        vi.spyOn(DMRoomMap, "shared").mockReturnValue({
            getUserIdForRoomId: vi.fn(),
        } as unknown as DMRoomMap);

        testDM = mkRoom(mockedClient, testDMRoomId);
        testDM.name = "Chat with Alice";
        vi.mocked(testDM.getMyMembership).mockReturnValue(KnownMembership.Join);

        vi.mocked(DMRoomMap.shared().getUserIdForRoomId).mockImplementation((roomId: string) => {
            if (roomId === testDMRoomId) {
                return testDMUserId;
            }
            return undefined;
        });

        vi.mocked(mockedClient.getVisibleRooms).mockReturnValue([testRoom, testLocalRoom, testDM]);
    });

    it("should not fall into a filter when the query matches nothing", async () => {
        render(<SpotlightDialog initialText="zzzznothingmatchesthis" onFinished={() => null} />);

        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        expect(screen.getByText("No results found")).toBeInTheDocument();

        fireEvent.keyDown(document.querySelector(".mx_SpotlightDialog_searchBox input")!, { key: "Enter" });

        expect(document.querySelector("div.mx_SpotlightDialog_filter")).not.toBeInTheDocument();
    });

    it("should not offer the enter shortcut on the no results entry", async () => {
        render(<SpotlightDialog initialText="zzzznothingmatchesthis" onFinished={() => null} />);

        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        const noResults = document.querySelector("#mx_SpotlightDialog_button_noResults")!;
        expect(noResults.querySelector(".mx_SpotlightDialog_enterPrompt")).not.toBeInTheDocument();

        const startChat = document.querySelector("#mx_SpotlightDialog_button_startChat")!;
        expect(startChat.querySelector(".mx_SpotlightDialog_enterPrompt")).toBeInTheDocument();
    });

    it("should expose the no results entry as an unavailable option rather than a button", async () => {
        render(<SpotlightDialog initialText="zzzznothingmatchesthis" onFinished={() => null} />);

        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        const noResults = document.querySelector("#mx_SpotlightDialog_button_noResults")!;
        expect(noResults).toHaveAttribute("aria-disabled", "true");
        expect(noResults).not.toHaveClass("mx_AccessibleButton");

        const startChat = document.querySelector("#mx_SpotlightDialog_button_startChat")!;
        expect(startChat).not.toHaveAttribute("aria-disabled");
        expect(startChat).toHaveClass("mx_AccessibleButton");
    });

    describe("should apply filters supplied via props", () => {
        it("without filter", async () => {
            render(<SpotlightDialog onFinished={() => null} />);

            const filterChip = document.querySelector("div.mx_SpotlightDialog_filter");
            expect(filterChip).not.toBeInTheDocument();
        });

        it("with people filter", async () => {
            render(
                <SpotlightDialog
                    initialFilter={Filter.People}
                    initialText={testPerson.display_name}
                    onFinished={() => null}
                />,
            );
            // search is debounced
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const filterChip = document.querySelector("div.mx_SpotlightDialog_filter")!;
            expect(filterChip).toBeInTheDocument();
            expect(filterChip.innerHTML).toContain("People");

            await waitFor(() => {
                const content = document.querySelector("#mx_SpotlightDialog_content")!;
                const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
                expect(options.length).toBeGreaterThanOrEqual(1);
                expect(options[0]!.innerHTML).toContain(testPerson.display_name);
            });
        });
    });

    describe("when MSC3946 dynamic room predecessors is enabled", () => {
        beforeEach(async () => {
            await SettingsStore.setValue("feature_dynamic_room_predecessors", null, SettingLevel.DEVICE, true);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("should call getVisibleRooms with MSC3946 dynamic room predecessors", async () => {
            render(<SpotlightDialog onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();
            expect(mockedClient.getVisibleRooms).toHaveBeenCalledWith(true);
        });
    });

    describe("should apply manually selected filter", () => {
        it("with people", async () => {
            render(<SpotlightDialog initialText={testPerson.display_name} onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            fireEvent.click(screen.getByText("People"));

            // search is debounced
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const filterChip = document.querySelector("div.mx_SpotlightDialog_filter")!;
            expect(filterChip).toBeInTheDocument();
            expect(filterChip.innerHTML).toContain("People");

            await waitFor(() => {
                const content = document.querySelector("#mx_SpotlightDialog_content")!;
                const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
                expect(options.length).toBeGreaterThanOrEqual(1);
                expect(options[0]!.innerHTML).toContain(testPerson.display_name);
            });
        });
    });

    describe("should allow clearing filter manually", () => {
        it("with people filter", async () => {
            render(
                <SpotlightDialog
                    initialFilter={Filter.People}
                    initialText={testPerson.display_name}
                    onFinished={() => null}
                />,
            );
            // search is debounced
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            let filterChip = document.querySelector("div.mx_SpotlightDialog_filter");
            expect(filterChip).toBeInTheDocument();
            expect(filterChip!.innerHTML).toContain("People");

            fireEvent.click(filterChip!.querySelector("div.mx_SpotlightDialog_filter--close")!);
            vi.advanceTimersByTime(1);
            await flushPromisesWithFakeTimers();

            filterChip = document.querySelector("div.mx_SpotlightDialog_filter");
            expect(filterChip).not.toBeInTheDocument();
        });
    });

    describe("searching for rooms", () => {
        let options: NodeListOf<Element>;

        beforeAll(async () => {
            render(<SpotlightDialog initialText="test23" onFinished={() => null} />);
            // search is debounced
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const content = document.querySelector("#mx_SpotlightDialog_content")!;
            options = content.querySelectorAll("li.mx_SpotlightDialog_option");
        });

        it("should find Rooms", () => {
            expect(options).toHaveLength(3);
            expect(options[0]!.innerHTML).toContain(testRoom.name);
        });

        it("should not find LocalRooms", () => {
            expect(options).toHaveLength(3);
            expect(options[0]!.innerHTML).not.toContain(testLocalRoom.name);
        });
    });

    it("should not filter out users sent by the server", async () => {
        vi.mocked(mockedClient.searchUserDirectory).mockResolvedValue({
            results: [
                { user_id: "@user1:blackcandletech.com", display_name: "User Alpha", avatar_url: "mxc://1/avatar" },
                { user_id: "@user2:blackcandletech.com", display_name: "User Beta", avatar_url: "mxc://2/avatar" },
            ],
            limited: false,
        });

        render(<SpotlightDialog initialFilter={Filter.People} initialText="Alpha" onFinished={() => null} />);
        // search is debounced
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        await waitFor(() => {
            const content = document.querySelector("#mx_SpotlightDialog_content")!;
            const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
            expect(options.length).toBeGreaterThanOrEqual(2);
            expect(options[0]).toHaveTextContent("User Alpha");
            expect(options[1]).toHaveTextContent("User Beta");
        });
    });

    it("should not filter out users sent by the server even if a local suggestion gets filtered out", async () => {
        const member = new RoomMember(testRoom.roomId, testPerson.user_id);
        member.name = member.rawDisplayName = testPerson.display_name!;
        member.getMxcAvatarUrl = vi.fn().mockReturnValue("mxc://0/avatar");
        vi.mocked(testRoom.getJoinedMembers).mockReturnValue([member]);
        vi.mocked(mockedClient.searchUserDirectory).mockResolvedValue({
            results: [
                { user_id: "@janedoe:blackcandletech.com", display_name: "User Alpha", avatar_url: "mxc://1/avatar" },
                { user_id: "@johndoe:blackcandletech.com", display_name: "User Beta", avatar_url: "mxc://2/avatar" },
            ],
            limited: false,
        });

        render(<SpotlightDialog initialFilter={Filter.People} initialText="Beta" onFinished={() => null} />);
        // search is debounced
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        await waitFor(() => {
            const content = document.querySelector("#mx_SpotlightDialog_content")!;
            const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
            expect(options.length).toBeGreaterThanOrEqual(2);
            expect(options[0]).toHaveTextContent(testPerson.display_name!);
            expect(options[1]).toHaveTextContent("User Beta");
        });
    });

    it("show non-matching query members with DMs if they are present in the server search results", async () => {
        vi.mocked(mockedClient.searchUserDirectory).mockResolvedValue({
            results: [
                { user_id: testDMUserId, display_name: "Alice Wonder", avatar_url: "mxc://1/avatar" },
                { user_id: "@bob:blackcandletech.com", display_name: "Bob Wonder", avatar_url: "mxc://2/avatar" },
            ],
            limited: false,
        });
        render(
            <SpotlightDialog initialFilter={Filter.People} initialText="Something Wonder" onFinished={() => null} />,
        );
        // search is debounced
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        await waitFor(() => {
            const content = document.querySelector("#mx_SpotlightDialog_content")!;
            const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
            expect(options.length).toBeGreaterThanOrEqual(2);
            expect(options[0]).toHaveTextContent(testDMUserId);
            expect(options[1]).toHaveTextContent("Bob Wonder");
        });
    });

    it("don't sort the order of users sent by the server", async () => {
        const serverList = [
            { user_id: "@user2:blackcandletech.com", display_name: "User Beta", avatar_url: "mxc://2/avatar" },
            { user_id: "@user1:blackcandletech.com", display_name: "User Alpha", avatar_url: "mxc://1/avatar" },
        ];
        vi.mocked(mockedClient.searchUserDirectory).mockResolvedValue({
            results: serverList,
            limited: false,
        });

        render(<SpotlightDialog initialFilter={Filter.People} initialText="User" onFinished={() => null} />);
        // search is debounced
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        await waitFor(() => {
            const content = document.querySelector("#mx_SpotlightDialog_content")!;
            const options = content.querySelectorAll("li.mx_SpotlightDialog_option");
            expect(options.length).toBeGreaterThanOrEqual(2);
            expect(options[0]).toHaveTextContent("User Beta");
            expect(options[1]).toHaveTextContent("User Alpha");
        });
    });

    it("only discovers local people, including suggestions from joined rooms", async () => {
        const foreignUserId = "@foreign:example.org";
        const member = new RoomMember(testRoom.roomId, foreignUserId);
        member.name = member.rawDisplayName = "Foreign person";
        vi.mocked(testRoom.getJoinedMembers).mockReturnValue([member]);
        vi.mocked(mockedClient.searchUserDirectory).mockResolvedValue({
            results: [testPerson, { user_id: foreignUserId, display_name: "Foreign person" }],
            limited: false,
        });
        render(<SpotlightDialog initialFilter={Filter.People} initialText="person" onFinished={() => null} />);
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        await waitFor(() => expect(screen.getByText(testPerson.display_name!)).toBeInTheDocument());
        expect(screen.queryByText("Foreign person")).not.toBeInTheDocument();
    });

    it.each(["@foreign:example.org", "@foreign:blackcandletech.com.evil", "@foreign:blackcandletech.com:8448"])(
        "does not look up a foreign profile: %s",
        async (userId) => {
            render(<SpotlightDialog initialFilter={Filter.People} initialText={userId} onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();
            expect(mockedClient.getProfileInfo).not.toHaveBeenCalled();
        },
    );

    it("looks up a local profile by full user ID", async () => {
        render(
            <SpotlightDialog initialFilter={Filter.People} initialText={testPerson.user_id} onFinished={() => null} />,
        );
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();
        expect(mockedClient.getProfileInfo).toHaveBeenCalledWith(testPerson.user_id);
    });

    it("should start a DM when clicking a person", async () => {
        render(
            <SpotlightDialog
                initialFilter={Filter.People}
                initialText={testPerson.display_name}
                onFinished={() => null}
            />,
        );

        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        let options: NodeListOf<Element> | undefined;
        await waitFor(() => {
            options = document.querySelectorAll("li.mx_SpotlightDialog_option");
            expect(options.length).toBeGreaterThanOrEqual(1);
            expect(options[0]!.innerHTML).toContain(testPerson.display_name);
        });

        fireEvent.click(options![0]!);
        expect(startDmOnFirstMessage).toHaveBeenCalledWith(mockedClient, [new DirectoryMember(testPerson)]);
    });

    it.each([
        ["#room:blackcandletech.com", true],
        ["#room:example.org", false],
        ["#room:blackcandletech.com.evil", false],
    ])("only offers local room aliases: %s", async (alias, local) => {
        render(<SpotlightDialog initialText={alias} onFinished={() => null} />);
        const option = screen.queryByRole("option", { name: `Join ${alias}` });
        expect(!!option).toBe(local);
    });

    it("does not expose or query public directories", async () => {
        render(<SpotlightDialog initialText="Room" onFinished={() => null} />);
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        expect(screen.queryByText("Public rooms")).not.toBeInTheDocument();
        expect(screen.queryByText("Public spaces")).not.toBeInTheDocument();
        expect(mockedClient.publicRooms).not.toHaveBeenCalled();
        expect(mockedClient.getThirdpartyProtocols).not.toHaveBeenCalled();
    });

    it("should allow jumping into message search", async () => {
        const onFinished = vi.fn();
        render(<SpotlightDialog initialText="search term" onFinished={onFinished} />);
        vi.advanceTimersByTime(200);
        await flushPromisesWithFakeTimers();

        fireEvent.click(screen.getByText("Messages"));

        expect(defaultDispatcher.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                action: Action.FocusMessageSearch,
                initialText: "search term",
            }),
        );
    });

    describe("keyboard prompt filter and query checks", () => {
        it("should show left and right arrow keys in keyboard hint when filter is null and no query", async () => {
            render(<SpotlightDialog onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const keyboardPrompt = document.querySelector("#mx_SpotlightDialog_keyboardPrompt");
            expect(keyboardPrompt).toBeInTheDocument();
            expect(keyboardPrompt?.textContent).toContain("←");
            expect(keyboardPrompt?.textContent).toContain("→");
        });

        it("should not show left and right arrow keys in keyboard hint when filter is set", async () => {
            render(<SpotlightDialog initialFilter={Filter.People} onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const keyboardPrompt = document.querySelector("#mx_SpotlightDialog_keyboardPrompt");
            expect(keyboardPrompt).toBeInTheDocument();
            expect(keyboardPrompt?.textContent).not.toContain("←");
            expect(keyboardPrompt?.textContent).not.toContain("→");
        });

        it("should not show left and right arrow keys in keyboard hint when query is present", async () => {
            render(<SpotlightDialog initialText="test query" onFinished={() => null} />);
            vi.advanceTimersByTime(200);
            await flushPromisesWithFakeTimers();

            const keyboardPrompt = document.querySelector("#mx_SpotlightDialog_keyboardPrompt");
            expect(keyboardPrompt).toBeInTheDocument();
            expect(keyboardPrompt?.textContent).not.toContain("←");
            expect(keyboardPrompt?.textContent).not.toContain("→");
        });
    });

    describe("metaspaces", () => {
        beforeEach(() => {
            vi.spyOn(SDKContextClass.instance.spaceStore, "enabledMetaSpaces", "get").mockReturnValue([
                MetaSpace.Home,
                MetaSpace.Orphans,
            ]);
            vi.spyOn(mockedClient, "isVersionSupported").mockImplementation(() => new Promise(() => {}));
        });

        it("should show Home metaspace", async () => {
            const onFinished = vi.fn();
            const { asFragment, container } = render(
                <SpotlightDialog initialText={MetaSpace.Home.split("-")[0]} onFinished={onFinished} />,
            );
            await waitFor(() =>
                expect(container.querySelector(".mx_SpotlightDialog_metaspaceResult")).toBeInTheDocument(),
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
