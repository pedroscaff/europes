import { css, LitElement, html, property } from 'lit-element'

export class NavBar extends LitElement {
  @property() items = [];

  static get styles () {
    return styles
  }

  render () {
    return html`
      <div class="container">
        ${this.items.map(item => html`
          <div class="item"><a href=${item.href}>${item.name}</a></div>
        `)}
      </div>
    `
  }
}

const styles = css`
  .container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    justify-content: center;
    color: white;
  }

  .item {
    margin: 0 5px;
    cursor: pointer;
  }

  a {
    font-size: 1.2em;
    color: white;
    text-decoration: none;
  }

  a:hover, a:focus {
    text-decoration: white underline;
  }
`

window.customElements.define('nav-bar', NavBar)
