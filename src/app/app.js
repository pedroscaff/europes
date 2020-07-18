import { css, LitElement, html, query } from 'lit-element'
import 'router-slot'
import '../nav-bar/nav-bar'

const navBarItems = [
  { name: 'Home', href: '/' },
  { name: 'Coop', href: '/coop' }
  // { name: 'GOTM', href: '/gotm' },
  // { name: 'Awards', href: '/awards' },
  // { name: 'Squads', href: '/squads' }
]

class AuthRoute extends LitElement {
  render () {
    return html`Auth...`
  }
}
window.customElements.define('auth-route', AuthRoute)

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
    path: 'upload-result',
    component: () => import('../pages/upload-result/upload-result')
  },
  {
    path: 'auth',
    component: AuthRoute
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
      <img class="header" src="assets/main-header.jpg" alt="Europes main header"/>
      <nav-bar .items="${navBarItems}"></nav-bar>
      <div class="mainContent"><router-slot></router-slot></div>
    `
  }
}

const styles = css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #2a475e;
    font-family: sans-serif;
    overflow-x: hidden;
  }
  .header {
    width: 100%;
    height: auto;
    max-height: 250px;
  }
  @media (max-width: 900px) {
    // :host {
    //   overflow-x: auto;
    // }
    .header {
      visibility: hidden;
      width: 0;
    }
  }
  .mainContent {
    padding: 10px;
  }
`

window.customElements.define('app-root', App)
