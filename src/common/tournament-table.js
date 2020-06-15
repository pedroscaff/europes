import { css, LitElement, html, property } from 'lit-element'

export default class TournamentTable extends LitElement {
  @property() entries = []

  static get headers () {
    return ['Team', 'P', 'W', 'D', 'L', 'GP', 'GC', '+/-', 'Points']
  }

  static get apiHeadersMapping () {
    return ['teamName', 'played', 'wins', 'draws', 'losses', 'gp', 'gc', 'gDiff', 'points']
  }

  static get styles () {
    return styles
  }

  renderEntry(entry, position) {
    return TournamentTable.apiHeadersMapping.map((header, i) => html`
      <td>${i === 0 ? html`${position}&nbsp;` : ''}${i ===0 && position < 10 ? html`&nbsp;&nbsp;` : ''}${entry[header]}</td>
    `)
  }

  render () {
    return html`
      <table>
        <thead class="tableHead">
          <tr>
            ${TournamentTable.headers.map(header => html`<th>${header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.entries.map((entry, index) => html`<tr>${this.renderEntry(entry, index + 1)}</tr>`)}
        </tbody>
      </table>
    `
  }
}

const styles = css`
  table {
    border-collapse: collapse;
    width: 100%;
    color: white;
    text-align: center;
    vertical-align: middle;
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
  }
  td:first-child, th:first-child {
    text-align: left;
    border-left: none;
  }
  td:nth-child(even) {
    background-color: rgba(1, 1, 1, 0.2);
  }
`

window.customElements.define('tournament-table', TournamentTable)
