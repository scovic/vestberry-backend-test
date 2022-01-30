import config from '../config/config'
import Server from './Server'

const server = new Server(config)
server.init()
server.start()
