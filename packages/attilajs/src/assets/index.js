const brandName = 'Attila JS';
const tag = 'attila-js';
const mainButtonID = 'main-button';
const closeButtonID = 'close-button';
const dataButtonID = 'data-button';
const buttonPrimaryClassName = 'button--primary';
const dialogID = 'main-dialog';
const controlsClassName = 'controls';
const contentClassName = 'content';

const css = `
:host {
  --font-size: 16px;
  --font-size--l: 1.4rem;
  --font-family: Arial;
  --color-brand: #00703c;
  --color-brand--dark: #005a30;
  --color-neutral: #f3f3f3;
  --color-highlighted: #fd0;
  --color-highlighted--neutral: darkgrey;
  --color-text: #0c0c0c;
  --color-brand-text: #fff;
  --gap: 1rem;
  --gap--l: 1.4rem;
}

:host {
  position: absolute;
  bottom: var(--gap);
  right: var(--gap);
}
  
:host * {
  font-family: var(--font-family);
}

button {
  display: inline-block;
  background-color: var(--color-neutral);
  color: var(--color-text);
  font-size: var(--font-size);
  padding: var(--gap);
  box-shadow: 0 2px 0 var(--color-text);
  -webkit-font-smoothing: antialiased;
  border: 2px solid transparent;
  border-radius: 0;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  -webkit-appearance: none;
  text-transform: uppercase;
}
  
button.${buttonPrimaryClassName} {
  background-color: var(--color-brand);
  color: var(--color-brand-text);
}

button:hover {
  background-color: var(--color-highlighted--neutral);
}

button.${buttonPrimaryClassName}:hover {
  background-color: var(--color-brand--dark);
}

button:focus {
  border-color: var(--color-highlighted);
  outline: 3px solid transparent;
  box-shadow: inset 0 0 0 1px var(--color-highlighted);
}

button:focus:not(:active):not(:hover) {
  border-color: var(--color-highlighted);
  color: var(--color-text);
  background-color: var(--color-highlighted);
  box-shadow: 0 2px 0 var(--color-text);
}

#${mainButtonID} {
  font-size: var(--font-size--l);
  padding: var(--gap--l);
}

.${controlsClassName} {
  display: flex;
  align-items: center;
}

.${controlsClassName} > * {
  flex-grow: 1;
}

.${contentClassName} {
  padding: 1rem;
}

dialog {
  padding: 0;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
`;

class AttilaJS extends HTMLElement {
  attachStyles() {
    const styles = new CSSStyleSheet();

    styles.replaceSync(css);

    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    if (!('replaceSync' in CSSStyleSheet.prototype) || this.shadowRoot) {
      return;
    }

    this.attachShadow({ mode: 'open' });
    this.attachStyles();
    this.render();
    this.dialog = this.shadowRoot.querySelector(`#${dialogID}`);
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button aria-label="${`Open ${brandName}`}" id="${mainButtonID}" class="${buttonPrimaryClassName}">A</button>
      <dialog id="${dialogID}">
        <div class="${controlsClassName}">
          <button id="${dataButtonID}">data</button>
          <button id="${closeButtonID}" class="${buttonPrimaryClassName}">close</button>
        </div>
        <div class="${contentClassName}">
          <h1>Attila JS</h1>
        </div>
      </dialog>
    `;
  }

  addEventListeners() {
    this.addMainButtonEvents();
    this.addCloseButtonEvents();
  }

  addMainButtonEvents() {
    const dialog = this.dialog;
    this.shadowRoot.querySelector(`#${mainButtonID}`).addEventListener('click', () => {
      dialog.showModal();
    });
  }

  addCloseButtonEvents() {
    const dialog = this.dialog;
    this.shadowRoot.querySelector(`#${closeButtonID}`).addEventListener('click', () => {
      dialog.close();
    });
  }
}

customElements.define(tag, AttilaJS);
