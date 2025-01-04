class AttilaJS extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('ready when you are');
  }
}

customElements.define('attila-js', AttilaJS);
