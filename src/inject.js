'use strict';

const REMINDER_ID = 'hotkeyReminder';
const HOTKEY_DATA_ATTRIBUTE = 'data-hotkey';
const FADEOUT_CLASS = 'fadeout';

function getReminder() {
  var reminder = document.getElementById(REMINDER_ID);
  if (!reminder) {
    reminder = document.createElement('div');
    reminder.className = 'hotkey-reminder';
    reminder.id = REMINDER_ID;
    document.body.appendChild(reminder);
  }

  return reminder
}

function injectReminder(action, hotkeys) {
  var reminder = getReminder();

  reminder.innerHTML = '';
  reminder.classList.remove(FADEOUT_CLASS);

  var actionEl = document.createElement('p');
  actionEl.innerHTML = action;

  var keysEl = document.createElement('p')
  for (let i = 0; i < hotkeys.length; i++) {
    let key = document.createElement('kbd');
    key.innerHTML = hotkeys[i];
    keysEl.appendChild(key);
  }

  reminder.innerHTML = '';
  reminder.appendChild(actionEl);
  reminder.appendChild(keysEl);

  setTimeout(function(){reminder.classList.add(FADEOUT_CLASS);}, 1000);
}

function handleHotkeyClick(e) {
  const el = e.target.closest(`[${HOTKEY_DATA_ATTRIBUTE}]`)
  if (el) {
    const hotkeys = el.getAttribute(HOTKEY_DATA_ATTRIBUTE);
    const action = el.innerText.trim().replace(/\d+$/, "");
    Promise.resolve().then(function() {
      injectReminder(action, hotkeys.split(' '));
    });
  }
}

function loadListeners() {
  document.addEventListener('click', handleHotkeyClick, false);
}

loadListeners();
