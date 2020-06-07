import { css, LitElement, html } from 'lit-element'

export default class NavBar extends LitElement {
  static get styles () {
    return styles
  }

  render () {
    return html`
      <div class="container">
        HOME CONTENT
      </div>
    `
  }
}

const styles = css`
`

window.customElements.define('app-home', NavBar)
