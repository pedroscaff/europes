import { css, LitElement, html, property } from 'lit-element'
import '../../common/tournament-table'
import '../../common/tournament-fixtures'
import {getTournamentFixtures, getTournamentTable} from '../../api/api'

const COOP_TOURNAMENT_ID = '1'

export default class CoopPage extends LitElement {
  @property() tableEntries = []
  @property() tournamentFixtures = []
  @property() currentRound = 1
  @property() maxRounds = 26

  static get styles () {
    return styles
  }

  connectedCallback() {
    super.connectedCallback()

    getTournamentTable(COOP_TOURNAMENT_ID).then(r => {
      this.tableEntries = r.results
    })
    getTournamentFixtures(COOP_TOURNAMENT_ID, this.currentRound).then(r => {
      this.tournamentFixtures = r
    })
  }

  getNextFixtures(e) {
    const { next } = e.detail
    getTournamentFixtures(COOP_TOURNAMENT_ID, next).then(r => {
      this.currentRound = next
      this.tournamentFixtures = r
    })
  }

  render () {
    return html`
      <div class="container">
        <tournament-table .entries="${this.tableEntries}"></tournament-table>
        <tournament-fixtures
          .entries="${this.tournamentFixtures}"
          .currentRound="${this.currentRound}"
          .maxRounds="${this.maxRounds}"
          @onRoundChange="${this.getNextFixtures}"
        ></tournament-fixtures>
      </div>
    `
  }
}

const styles = css`
  .container {
    display: flex;
    padding: 20px;
  }
  tournament-table {
    flex: 2;
  }
  tournament-fixtures {
    flex: 1;
  }
`

window.customElements.define('app-coop', CoopPage)
