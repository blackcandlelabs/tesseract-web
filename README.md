# Tesseract Web

Black Candle's web messenger: a rebranded fork of
[Element Web](https://github.com/element-hq/element-web), deployed at
`https://chat.internal.blackcandletech.com`. Also the webapp packaged
by [tesseract-desktop](../tesseract-desktop).

Sign-in is OAuth-only through Black Candle auth (MAS/OIDC). The
create-account flow, the server picker, and password login are removed;
the single sign-in path is "Sign in with Black Candle".

## Upstream pin

- **element-web v1.12.30** (`f19cfd9`). Rebases onto newer upstream
  releases ship as pull requests for maintainer approval, never
  silently (monthly cadence; immediately for security releases).
  **Drift note (2026-10-13): upstream v1.12.31 is out; this fork is one
  version behind pending an approved rebase PR.**

## Patch inventory (vs upstream v1.12.30)

1. **Rebrand (Stage A)** — brand "Tesseract"; default homeserver pinned
   to `chat.internal.blackcandletech.com`; "Tesseract Amber" theme
   (#E9A33D) and the tesseract mark (hypercube wireframe, offset-depth;
   Figma "Tesseract — App Icon Candidates" candidate B, swapped in
   2026.10 for web 2026.10.1); create-account, server-picker, and
   password-login UI removed; SSO button reads "Sign in with
   Black Candle".
2. **Agent banner (Stage B)** — the client resolves the agent registry
   via `POST /_tesseract/agents` (5-minute cache, fails closed) and
   renders the agent notice as a UI banner keyed on the sender,
   never as message text.
3. **Deep owner-merge (Stage B-2)** — agent DMs are presented inside
   the owner's conversation with the notice
   `(!) <API_KEY_NAME> sent this message`.

Server-visible changes: none — the Tesseract server side runs upstream
Synapse + MAS; the bridge and its API live in the `tesseract` repo.

## Deployment

Built as a static webapp image and served by the production Caddy
stack on undertaker (image tag `tesseract-web:stage-c2-6207479` at the
time of writing). The production `config.json` (brand + homeserver
pin) is injected into the web container at deploy time, not baked
into the image.
