import { css, LitElement, html, property } from 'lit-element'
import { getDiscordId, setFixtureId, DISCORD_AUTH_URL, getDiscordUsername } from '../../oauth2'

const AWAY = 'AWAY'
const HOME = 'HOME'

export default class UploadResults extends LitElement {
  @property() fixtureId = ''
  @property() homeTeamName = 'River'
  @property() awayTeamName = 'Cruzeiro'
  @property() homePlayers = [{ name: 'Pratto', goals: 0 }]
  @property() awayPlayers = [{ name: 'Quintero', goals: 0 }]
  @property() homeGoals
  @property() awayGoals
  @property() discordId
  @property() discordUsername

  static get styles () {
    return styles
  }

  connectedCallback () {
    super.connectedCallback()
    const urlParams = new URLSearchParams(window.location.search)
    this.fixtureId = urlParams.get('id')
    if (!this.fixtureId) {
      window.alert('No fixture ID in URL?')
      window.history.pushState(null, '', '/')
    }
    this.discordId = getDiscordId()
    if (!this.discordId) {
      setFixtureId(this.fixtureId)
      window.location.replace(DISCORD_AUTH_URL)
    }
    this.discordUsername = getDiscordUsername()
  }

  validateTotalGoals (players, goals) {
    let playersGoals = 0
    for (const player of players) {
      playersGoals += player.goals
    }
    return playersGoals <= goals
  }

  handleSubmit () {
    if (!this.homeGoals) {
      window.alert('No home goals!')
      return
    }
    if (!this.awayGoals) {
      window.alert('No away goals!')
      return
    }
    if (!this.validateTotalGoals(this.homePlayers, this.homeGoals)) {
      window.alert('More home players goals than in the score!')
      return
    }
    if (!this.validateTotalGoals(this.awayPlayers, this.awayGoals)) {
      window.alert('More away players goals than in the score!')
    }
    // remove discord id and username to require new oauth2
    window.localStorage.clear()
  }

  handlePlayerChange (e, index, attr, team) {
    this[team === HOME ? 'homePlayers' : 'awayPlayers'][index][attr] = this.parseNumberInput(e.target.value)
  }

  handleSetHomeGoals (e) {
    this.homeGoals = this.parseNumberInput(e.target.value)
    // set value if input was invalid
    e.target.value = this.homeGoals
  }

  handleSetAwayGoals (e) {
    this.awayGoals = this.parseNumberInput(e.target.value)
    // set value if input was invalid
    e.target.value = this.awayGoals
  }

  parseNumberInput (value) {
    const number = Number.parseInt(value)
    if (isNaN(number)) {
      window.alert('Only numbers allowed!')
      return 0
    }
    return number
  }

  renderPlayersList (players, team) {
    return html`
      <div>
        <ul class=${team === HOME ? 'homePlayers' : 'awayPlayers'}>
          ${players.map((p, i) => html`
            <li>${p.name}: <input type="text" @change="${(e) => this.handlePlayerChange(e, i, 'goals', team)}"/><input type="text" @change="${(e) => this.handlePlayerChange(e, i, 'assists', team)}"/></li>
          `)}
        </ul>
      </div>
    `
  }

  render () {
    return html`
      <h3>Authorized as @${this.discordUsername}</h3>
      <div class="listContainer">
        <div class="wrapper">
          ${this.homeTeamName}
          ${this.renderPlayersList(this.homePlayers, HOME)}
        </div>
        <input type="text" @change="${e => this.handleSetHomeGoals(e)}"/>
        X
        <input type="text" @change="${e => this.handleSetAwayGoals(e)}"/>
        <div class="wrapper">
          ${this.awayTeamName}
          ${this.renderPlayersList(this.awayPlayers, AWAY)}
        </div>
      </div>
      <button @click="${this.handleSubmit}">SUBMIT</button>
    `
  }
}

const styles = css`
  :host {
    list-style-type: none;
  }
  .listContainer {
    display: flex;
  }
  input {
    width: 30px;
    height: 20px;
    margin: 0 2px;
  }
  input[type="text"], textarea {
    background-color: #4e6578; 
  }
`

window.customElements.define('upload-results', UploadResults)
