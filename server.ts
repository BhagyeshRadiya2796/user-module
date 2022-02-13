import { App } from './app'
import * as dotenv from 'dotenv';

import { UserController } from './src/controllers/UserController'

dotenv.config({ path: `./.env` })
const app = new App({
  port: process.env.PORT || 3000,
  controllers: [
    new UserController()
  ]
})

app.listen()
