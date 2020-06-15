const API_URL = process.env.API_URL || 'http://localhost:8000'

export const getTournamentTable = (id) => window.fetch(`${API_URL}/table/${id}`).then(r => r.json())
export const getTournamentFixtures = (id, round) =>
  window.fetch(`${API_URL}/fixtures?tournamentId=${encodeURIComponent(id)}&round=${encodeURIComponent(round)}`).then(r => r.json())
