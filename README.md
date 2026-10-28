# ChatGPT — New Chat in New Tab

A lightweight, open-source [Tampermonkey](https://www.tampermonkey.net/) userscript for opening new ChatGPT conversations in background tabs using your mouse or keyboard.

[**Install userscript**](https://raw.githubusercontent.com/Ponze08/chatgpt-new-chat-in-new-tab/main/chatgpt-new-chat-in-new-tab.user.js) · [Source code](./chatgpt-new-chat-in-new-tab.user.js) · [Report an issue](https://github.com/Ponze08/chatgpt-new-chat-in-new-tab/issues)

## Features

| Action on ChatGPT's **New chat** button | Result |
| --- | --- |
| Middle-click (shorter than 500 ms) | Opens a normal new chat in a background tab |
| Middle-click and hold (500 ms or longer) | Opens a background tab with a temporary-chat URL parameter (experimental; see note below) |
| Ctrl+click (Windows/Linux) | Opens a normal new chat in a background tab |
| Cmd+click (macOS) | Opens a normal new chat in a background tab |

- Runs on `chatgpt.com` and `chat.openai.com`.
- Recognizes buttons labeled **New chat** or **Nuova chat**.
- Uses Tampermonkey's `GM_openInTab` to open a background tab.
- Has no external JavaScript dependencies.

> **Temporary-chat limitation:** Holding the middle button appends `?temporary-chat=true` to the new-tab URL. This is **not an officially documented way to activate ChatGPT's Temporary mode**, so the new conversation might still be a normal chat. Check the mode in ChatGPT before sharing sensitive information. To reliably start a temporary conversation, choose **Temporary** in the ChatGPT interface.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Click **[Install userscript](https://raw.githubusercontent.com/Ponze08/chatgpt-new-chat-in-new-tab/main/chatgpt-new-chat-in-new-tab.user.js)**.
3. Confirm the installation in Tampermonkey.
4. Open [ChatGPT](https://chatgpt.com/) and use the **New chat** button with one of the shortcuts above.

If the direct link doesn't trigger the installer, open the [userscript file](./chatgpt-new-chat-in-new-tab.user.js), select **Raw**, then install it using Tampermonkey.

## Automatic updates

The userscript includes `@updateURL` and `@downloadURL` pointing to the `main` branch of this repository. Tampermonkey can detect and install newer versions when its update checks run.

For future releases, **increase the `@version` number** in the userscript before committing the changes (for example, `1.2.1` → `1.2.2`).

## Configuration

To change the duration of a long middle-click, edit the following constant in the userscript:

```javascript
const LONG_PRESS_MS = 500;
```

The value is in milliseconds.

## Troubleshooting

- **Nothing happens:** Confirm the userscript is enabled in Tampermonkey and that you clicked the **New chat** control (not an existing conversation).
- **Your language is not recognized:** The script currently matches the control text **New chat** or **Nuova chat**; other UI languages may require changes.
- **Temporary mode is not active:** The URL parameter is experimental. Activate **Temporary** directly in ChatGPT.
- **The UI changed:** ChatGPT can change its button markup or labels; [open an issue](https://github.com/Ponze08/chatgpt-new-chat-in-new-tab/issues) with the details.

## License

Distributed under the [MIT License](./LICENSE).

This is an independent, unofficial project and is not affiliated with or endorsed by OpenAI.
