import { LitElement, html, css, property } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'
import { setFixtureId, DISCORD_AUTH_URL } from '../oauth2'

export default class Fixtures extends LitElement {
  @property() entries = []
  @property() maxRounds = 1
  @property() currentRound = 1

  static get styles () {
    return css`
      :host {
        padding: 10px;
        width: 100%;
        color: white;
        border: 2px white;
      }
      .teamContainer {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        height: 3em;
        justify-content: center;
      }
      .team {
        align-items: center;
        display: flex;
        flex-grow: 1;
        font-stretch: 100%;
        font-style: normal;
        height: 40px;
        line-height: 1em;
        vertical-align: middle;
        width: 35%;
      }
      .homeTeam {
        text-align: right;
        justify-content: flex-end;
      }
      .awayTeam { text-align: left;
        justify-content: flex-start;
      }
      .result {
        position: relative;
        align-items: center;
        display: flex;
        flex-grow: 2;
        height: 40px;
        justify-content: center;
        width: 30%;
      }
      .center {
        text-align: center;
      }
      .center > p {
        margin: 0;
      }
      .center > .upload {
        margin: 0 auto;
        font-size: 0.8em;
        cursor: pointer;
      }
      .roundSelectorContainer {
        position: relative;
        display: flex;
        padding: 5px;
        align-items: center;
        justify-content: center;
        cursor: default;
      }
      .previous {
        position: absolute;
        text-align: left;
        justify-content: flex-start;
        left: 10px;
        cursor: pointer;
      }
      .next {
        position: absolute;
        right: 10px;
        text-align: right;
        justify-content: flex-end;
        cursor: pointer;
      }
      .previous:hover, .next:hover {
        text-decoration: white underline;
      }
      .roundNotAvailable {
        cursor: default;
        opacity: 0.5;
      }
      .roundNotAvailable:hover {
        text-decoration: none;
      }
      .played {
        font-weight: 600;
      }
    `
  }

  handleRoundClick (next) {
    if (next < 1 || next > this.maxRounds) {
      return
    }
    this.dispatchEvent(new window.CustomEvent('onRoundChange', { detail: { current: this.currentRound, next } }))
  }

  handleUploadClick (id) {
    setFixtureId(id)
    window.location.replace(DISCORD_AUTH_URL)
  }

  renderRoundSelector (currentRound) {
    const classesPrevious = classMap({ previous: true, roundNotAvailable: currentRound === 1 })
    const classesNext = classMap({ next: true, roundNotAvailable: currentRound === this.maxRounds })
    return html`
      <div class="roundSelectorContainer">
        <div class=${classesPrevious} @click="${() => this.handleRoundClick(this.currentRound - 1)}">PREVIOUS</div>
        <div>Round ${currentRound}</div>
        <div class=${classesNext} @click="${() => this.handleRoundClick(this.currentRound + 1)}">NEXT</div>
      </div>
    `
  }

  renderEntry (game) {
    return html`
      <div class="teamContainer ${game.played ? 'played' : ''}">
        <div class="team homeTeam">${game.homeTeamName}</div>
        <div class="result">
          
          ${game.played ? html`<p>${game.homeGoals}</p>` : html``}
          <div class="center">
            <p class="upload" @click="${() => this.handleUploadClick(game.id)}">${game.played ? html`` : html`Upload Result`}</p>
            <p>x</p>
          </div>
          <p>${game.played ? game.awayGoals : ''}</p>
        </div>
        <div class="team awayTeam">${game.awayTeamName}</p>
      </div>
    `
  }

  render () {
    return html`
      ${this.renderRoundSelector(this.currentRound)}
      ${this.entries.map((e) => this.renderEntry(e))}
    `
  }
}

window.customElements.define('tournament-fixtures', Fixtures)
