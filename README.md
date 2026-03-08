# MegaXolotls

MegaXolotls is styled with a **mobile-app-first** direction (rounded phone shell, playful palette, mascot art, and pocket-game UI patterns).

## Screenshot Gallery

| Page | Preview | Notes |
|---|---|---|
| Home (`/`) | ![Home mobile screenshot](browser:/tmp/codex_browser_invocations/c5765a50fab79b1c/artifacts/home-mobile-updated.png) | App-like landing flow with axolotl hero art and wallet/install fallback UX. |
| Demo Hub (`/demo-hub`) | ![Demo hub mobile screenshot](browser:/tmp/codex_browser_invocations/c5765a50fab79b1c/artifacts/demo-landscape-updated.png) | Landscape-first layout with orientation enforcement on mobile. |
| Pets (`/pets`) | ![Pets mobile screenshot](browser:/tmp/codex_browser_invocations/c5765a50fab79b1c/artifacts/pets-mobile-updated.png) | Core pet page captured in mobile viewport as a key gameplay screen. |

## Git LFS

Repository image assets are configured for Git LFS tracking via `.gitattributes`.

## Expo-ready shell

A starter Expo shell is available in `expo/` so this project can be launched in Expo and deep-link to your deployed/web-hosted MegaXolotls URL:

- set `EXPO_PUBLIC_WEB_URL` to your deployed app URL (optional; defaults to `http://localhost:3000`)
- run Expo from that folder:
  - `cd expo && npm install`
  - `npm run start`
