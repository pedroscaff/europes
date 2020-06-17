import { css, LitElement, html, query } from 'lit-element'
import 'router-slot'
import '../nav-bar/nav-bar'

const navBarItems = [
  { name: 'Home', href: '/' },
  { name: 'Coop', href: '/coop' }
  // { name: 'Latest', href: '/latest' },
  // { name: 'GOTM', href: '/gotm' },
  // { name: 'Awards', href: '/awards' },
  // { name: 'Squads', href: '/squads' }
]

const routes = [
  {
    path: 'home',
    component: () => import('../pages/home/home')
  },
  {
    path: 'coop',
    component: () => import('../pages/coop/coop')
  },
  {
    path: '**',
    redirectTo: 'coop'
  }
]

export class App extends LitElement {
  @query('router-slot') $routerSlot

  static get styles () {
    return styles
  }

  firstUpdated (props) {
    super.firstUpdated(props)
    this.$routerSlot.add(routes)
  }

  render () {
    return html`
      <div class="root">
        <img class="header" src="assets/main-header.jpg" alt="Europes main header"/>
        <nav-bar .items="${navBarItems}"></nav-bar>
        <div class="mainContent"><router-slot></router-slot></div>
      </div>
    `
  }
}

const styles = css`
  .root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a475e;
    font-family: sans-serif;
    overflow: hidden;
  }
  .header {
    width: 100%;
    height: auto;
    max-height: 350px;
  }
  .mainContent {
    height: 100%;
    overflow: auto;
  }
`

window.customElements.define('app-root', App)
