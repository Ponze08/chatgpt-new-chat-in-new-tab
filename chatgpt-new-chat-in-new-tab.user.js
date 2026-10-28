// ==UserScript==
// @name         ChatGPT - New Chat in New Tab
// @namespace    https://chatgpt.com/
// @version      1.2.1
// @description  Open new chats in background tabs with middle-click or Ctrl/Cmd+click. Long middle-click tries temporary mode.
// @author       Ponze
// @license      MIT
// @homepageURL  https://github.com/Ponze08/chatgpt-new-chat-in-new-tab
// @supportURL   https://github.com/Ponze08/chatgpt-new-chat-in-new-tab/issues
// @updateURL    https://raw.githubusercontent.com/Ponze08/chatgpt-new-chat-in-new-tab/main/chatgpt-new-chat-in-new-tab.user.js
// @downloadURL  https://raw.githubusercontent.com/Ponze08/chatgpt-new-chat-in-new-tab/main/chatgpt-new-chat-in-new-tab.user.js
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @grant        GM_openInTab
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // Minimum duration (ms) to trigger temporary chat.
    const LONG_PRESS_MS = 500;

    let middlePressedAt = null;

    function getNewChatControl(target) {
        if (!(target instanceof Element)) return null;

        const control = target.closest('button, a');
        if (!control) return null;

        const label = (control.getAttribute('aria-label') || '')
            .trim()
            .toLowerCase();

        const text = (control.textContent || '')
            .trim()
            .replace(/\s+/g, ' ')
            .toLowerCase();

        return ['new chat', 'nuova chat'].includes(label) ||
               ['new chat', 'nuova chat'].includes(text)
            ? control
            : null;
    }

    function openNewChatInTab(temporary = false) {
        const url = new URL('/', location.origin);

        if (temporary) {
            url.searchParams.set('temporary-chat', 'true');
        }

        if (typeof GM_openInTab === 'function') {
            GM_openInTab(url.href, {
                active: false,
                insert: true,
                setParent: true
            });
        } else {
            window.open(
                url.href,
                '_blank',
                'noopener,noreferrer'
            );
        }
    }

    // Middle mouse button: track press duration.
    document.addEventListener('mousedown', event => {
        if (event.button !== 1 || !getNewChatControl(event.target)) {
            return;
        }

        middlePressedAt = performance.now();

        event.preventDefault();
        event.stopImmediatePropagation();
    }, true);

    // Release middle mouse button.
    document.addEventListener('mouseup', event => {
        if (event.button !== 1 || middlePressedAt === null) {
            return;
        }

        const duration = performance.now() - middlePressedAt;

        middlePressedAt = null;

        event.preventDefault();
        event.stopImmediatePropagation();

        const temporary = duration >= LONG_PRESS_MS;

        openNewChatInTab(temporary);
    }, true);

    // Prevent default middle-click behavior.
    document.addEventListener('auxclick', event => {
        if (event.button !== 1 || !getNewChatControl(event.target)) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
    }, true);

    // Ctrl+click (Windows/Linux) or Cmd+click (Mac).
    document.addEventListener('click', event => {
        if (event.button !== 0 || (!event.ctrlKey && !event.metaKey)) {
            return;
        }

        if (!getNewChatControl(event.target)) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        openNewChatInTab(false);
    }, true);

    // Reset when the browser loses focus.
    window.addEventListener('blur', () => {
        middlePressedAt = null;
    });

})();
