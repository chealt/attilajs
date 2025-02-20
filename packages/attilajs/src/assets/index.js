const css = `
:host {
  --font-size: 16px;
  --font-size--l: 1.4rem;
  --font-family: Arial;
  --color-brand: #00703c;
  --color-brand--dark: #005a30;
  --color-highlighted: #fd0;
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
  background-color: var(--color-brand);
  color: var(--color-brand-text);
  font-size: var(--font-size--l);
  padding: var(--gap--l);
  box-shadow: 0 2px 0 var(--color-text);
  -webkit-font-smoothing: antialiased;
  border: 2px solid transparent;
  border-radius: 0;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  -webkit-appearance: none;
  text-decoration: none;
}

button:hover {
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
`

class AttilaJS extends HTMLElement {
  static tag = 'attila-js';
  static mainButtonID = 'main-button';

  attachStyles() {
    let styles = new CSSStyleSheet();
    
    styles.replaceSync(css);

    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
      return;
    }

    this.attachShadow({ mode: "open" });
    this.attachStyles();
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <button aria-label="Open Attila JS" id="${AttilaJS.mainButtonID}">A</button>
    `;
  }

  addEventListeners() {
    this.addMainButtonEvents();
  }

  addMainButtonEvents() {
    this.shadowRoot.querySelector(`#${AttilaJS.mainButtonID}`).addEventListener('click', () => {
      this.open
    });
  }
}

customElements.define(AttilaJS.tag, AttilaJS);
