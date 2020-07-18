export const DISCORD_AUTH_URL = 'https://discord.com/api/oauth2/authorize?client_id=721065678601191515&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth&response_type=token&scope=identify'

const FIXTURE_ID = 'FIXTURE_ID'
export const getFixtureId = () => window.localStorage.getItem(FIXTURE_ID)
export const setFixtureId = (id) => window.localStorage.setItem(FIXTURE_ID, id)

const DISCORD_ID = 'DISCORD_ID'
export const getDiscordId = () => window.localStorage.getItem(DISCORD_ID)
export const setDiscordId = (id) => window.localStorage.setItem(DISCORD_ID, id)

const DISCORD_USERNAME = 'DISCORD_USERNAME'
export const getDiscordUsername = () => window.localStorage.getItem(DISCORD_USERNAME)
export const setDiscordUsername = (username) => window.localStorage.setItem(DISCORD_USERNAME, username)

window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1))

  if (fragment.has('access_token')) {
    const accessToken = fragment.get('access_token')
    const tokenType = fragment.get('token_type')

    window.fetch('https://discordapp.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(response => {
        const { id, username } = response
        setDiscordId(id)
        setDiscordUsername(username)
        window.history.pushState(null, '', `/upload-result?id=${getFixtureId()}`)
      })
      .catch(console.error)
  } else {
    window.history.pushState(null, '', '/')
  }
}
