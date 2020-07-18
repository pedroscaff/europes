import { css, LitElement, html, property } from 'lit-element'

export default class TournamentTable extends LitElement {
  @property() entries = []

  static get headers () {
    return ['Points', 'P', 'W', 'D', 'L', 'GP', 'GC', '+/-']
  }

  static get apiHeadersMapping () {
    return ['points', 'played', 'wins', 'draws', 'losses', 'gp', 'gc', 'gDiff']
  }

  static get styles () {
    return styles
  }

  renderEntry (entry, position) {
    return TournamentTable.apiHeadersMapping.map(header => html`
      <td>${entry[header]}</td>
    `)
  }

  render () {
    return html`
      <table class="tableNames">
        <thead class="tableHead">
          <tr><th>Team</th></tr>
        </thead>
        <tbody>${this.entries.map((entry, index) => html`<tr><td>${index} ${entry.teamName}</td></tr>`)}</tbody>
      </table>
      <table class="tablePoints">
        <thead class="tableHead">
          <tr> ${TournamentTable.headers.map(header => html`<th>${header}</th>`)} </tr>
        </thead>
        <tbody>
          ${this.entries.map((entry, index) => html`<tr>${this.renderEntry(entry, index + 1)}</tr>`)}
        </tbody>
      </table>
    `
  }
}

const styles = css`
  :host {
    position: relative;
    width: 100%;
  }
  table {
    border-collapse: collapse;
    color: white;
    text-align: center;
    vertical-align: middle;
  }
  .tableNames {
    position: absolute;
    left: 0;
    width: 200px;
  }
  .tableNames td:first-child, .tableNames th:first-child {
    text-align: left;
    border-left: none;
  }
  .tableNames > td, th {
    text-align: left;
  }
  .tablePoints {
    position: absolute;
    left: 200px;
  }
  .tableHead {
    border-bottom: 1px solid #c0c0c0;
    border-right: 0 solid #999;
    border-top: 1px solid #ddd;
    color: #ddd;
    font-family: opensans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    height: 40px;
    line-height: 10px;
    text-transform: uppercase;
  }
  th, td {
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-right: none;
    width: 50px;
  }
  td:nth-child(even) {
    background-color: rgba(1, 1, 1, 0.2);
  }

  @media (max-width: 900px) {
    :host {
      overflow-x: scroll;
    }
  }
`

window.customElements.define('tournament-table', TournamentTable)
