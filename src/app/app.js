import { LitElement, html, property, customElement } from 'lit-element';

@customElement('app-root')
export class App extends LitElement {
  @property() name = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
