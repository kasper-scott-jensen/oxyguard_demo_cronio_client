import './config/firebase.config.js'
import './scripts/authentication.js'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
