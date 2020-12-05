const template = document.createElement('template');
template.innerHTML = `
  <style>
    img {
      max-width: 100%;
    }

    h3, p {
      margin-top: 0;
      margin-bottom: 1.1rem;
    }
    
    .user-card {
      display: flex;
      width: 100%;
      font-size: 1rem;
      background: #eee;
      border-bottom: 10px solid red;
    }

    .user-card .card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;
    }

    #toggle-btn {
      height: 25px;
      align-self: flex-start;
      padding: 0.5rem 1rem;
      border: none;
      background: pink; 
      border-radius: 2px;
    }

    #toggle-btn:focus {
      outline: none;
    }

    #toggle-btn:hover {
      box-shadow: 0 0 0 1px red;
    }

  </style>
  <div class="user-card">
    <img />
    <div class="card-content">
      <div class="info">
        <h3 class="info-title"></h3>
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-btn">Hide info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.info-title').innerText = this.getAttribute('name'); 
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar'); 
  }

  toggleInfo() {
    const toggleBtn = this.shadowRoot.querySelector('#toggle-btn');
    const cardInfo = this.shadowRoot.querySelector('.info');
    this.showInfo = !this.showInfo;
    if (this.showInfo) {
      toggleBtn.innerText = 'Hide info';
      cardInfo.style.display = '';
    } else {
      toggleBtn.innerText = 'Show info';
      cardInfo.style.display = 'none';
    }
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-btn').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-btn').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);

