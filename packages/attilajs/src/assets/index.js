const brandName = 'Attila JS';
const tag = 'attila-js';
const mainButtonID = 'main-button';
const closeButtonID = 'close-button';
const buttonPrimaryClassName = 'button--primary';
const dialogID = 'main-dialog';
const controlsClassName = 'controls';
const contentClassName = 'content';
const navClassName = 'nav-button';
const tabClassName = 'tab';

const css = `
:host {
  --font-size: 16px;
  --font-size--l: 1.4rem;
  --font-family: Arial;

  --color-background: white;
  --color-brand: #00703c;
  --color-brand--dark: #005a30;
  --color-neutral: #f3f3f3;
  --color-highlighted: #fd0;
  --color-highlighted--neutral: darkgrey;
  --color-text: #0c0c0c;
  --color-brand-text: #ffffff;

  --gap: 1rem;
  --gap--l: 1.4rem;
}

@media (prefers-color-scheme: dark) {
  :host {
    --color-background: black;
    --color-brand: #00703c;
    --color-brand--dark: #005a30;
    --color-neutral: #0c0c0c;
    --color-highlighted: #fd0;
    --color-highlighted--neutral: grey;
    --color-text: #ffffff;
    --color-brand-text: #ffffff; 
  }
}

:host {
  position: absolute;
  bottom: var(--gap);
  right: var(--gap);
}
  
:host * {
  font-family: var(--font-family);
  color: var(--color-text);
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

button.active {
  box-shadow: 0 2px 0 var(--color-highlighted);
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
  min-width: 90%;
  min-height: 90%;
  background-color: var(--color-background);
  border-radius: 10px;
  border-width: 6px;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

.${tabClassName} {
  display: none;
}

.${tabClassName}.active {
  display: block;
}
`;

class AttilaJS extends HTMLElement {
  static tabs = ['site', 'data', 'accessibility', 'performance', 'settings'];

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
    this.activeTab = AttilaJS.tabs[0];

    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button aria-label="${`Open ${brandName}`}" id="${mainButtonID}" class="${buttonPrimaryClassName}">A</button>
      <dialog id="${dialogID}">
        <div class="${controlsClassName}">
          ${AttilaJS.tabs.map((name) => `<button id="${name}-nav" class="${navClassName}">${name}</button>`).toString().replaceAll(',', '')}
          <button id="${closeButtonID}" class="${buttonPrimaryClassName}">close</button>
        </div>
        <div class="${contentClassName}">
          <div id="site" class="${tabClassName} active">
            <h1>Site</h1>
          </div>
          <div id="data" class="${tabClassName}">
            <h1>Data</h1>
          </div>
          <div id="accessibility" class="${tabClassName}">
            <h1>Accessibility</h1>
          </div>
          <div id="performance" class="${tabClassName}">
            <h1>Performance</h1>
          </div>
          <div id="settings" class="${tabClassName}">
            <h1>Settings</h1>
          </div>
        </div>
      </dialog>
    `;
  }

  addEventListeners() {
    this.addMainButtonEvents();
    this.addCloseButtonEvents();
    this.addNavButtonEvents();
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

  addNavButtonEvents() {
    this.shadowRoot.querySelectorAll(`.${navClassName}`).forEach((element) => {
      element.addEventListener('click', () => {
        this.switchTab(element.id.replace('-nav', ''));
      });
    });
  }

  switchTab(tabID) {
    this.activeTab = tabID;

    this.shadowRoot.querySelectorAll(`.${navClassName}`).forEach((element) => element.classList.remove('active'));
    this.shadowRoot.querySelector(`#${tabID}-nav`).classList.add('active');

    this.shadowRoot.querySelectorAll(`.${tabClassName}`).forEach((element) => element.classList.remove('active'));
    this.shadowRoot.querySelector(`#${tabID}`).classList.add('active');
  }
}

customElements.define(tag, AttilaJS);
