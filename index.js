import Server from './server.js'
import config from './config.js'

const PORT = config.PORT
new Server(PORT).start()
