const template = document.createElement('template');

template.innerHTML = `
  <h1>Hello world</h1>
  <button id="alert-btn">Alert</button>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name');
  }

  getShadowRoot() {
    const h1 = this.shadowRoot.querySelector('h1')
    h1.textContent = 'Something wrong';
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#alert-btn').addEventListener('click', () => this.getShadowRoot());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#alert-btn').removeEventListener();
  }
}


window.customElements.define(
  'user-card',
  UserCard
)