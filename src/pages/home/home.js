import { css, LitElement, html } from 'lit-element'

export default class HomePage extends LitElement {
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

window.customElements.define('app-home', HomePage)
