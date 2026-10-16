# Expo Router issue 51694 reproduction

Minimal reproduction for [expo/expo#51694](https://github.com/expo/expo/issues/51694).
It uses Expo SDK 58.0.12, Expo Router 58.0.21, React 19.3.0, and React Native 0.88.0.

## Run

```sh
pnpm install
pnpm ios
# or
pnpm android
```

Open the app on a native device or simulator.

## Reproduce

1. Cold-launch the app.
2. Tap **Open editor**.
3. Type any text in the draft field.
4. Tap **Cancel** or use the native Back action.
5. The app should show the **Discard changes?** alert. Tap **Keep editing** to confirm the editor stays open, then try again and tap **Discard** to leave.

With the root `StrictMode` wrapper, the affected run can remove the editor without calling the `usePreventRemove` callback; the alert is not shown. The terminal log `usePreventRemove callback fired` also does not appear. Removing only `<StrictMode>` and `</StrictMode>` from `app/_layout.tsx` is the control: the guard callback and alert work.

This project intentionally contains only the root stack, a link to the editor, and the unsaved-change guard. The callback follows Expo Router's documented `repeat()` flow.

The callback behavior is documented at <https://docs.expo.dev/versions/v58.0.0/sdk/router/#usepreventremovepreventremove-callback-options>.
