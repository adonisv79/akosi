import { ExpressApp, config } from 'adon-api'
import { auth } from 'express-openid-connect'

//ensure env config are set
if (!process.env.BASE_URL || 
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_CLIENT_SECRET ||
  !process.env.AUTH0_ISSUER_BASE_URL)
  throw new Error('Missing required fields in ENV')

const app: ExpressApp = new ExpressApp({
  port:  parseInt(config.API.PORT),
  onHealthCheck: async () => { return true },
  onLoading: async (app) => {
    app.use(auth({
      authRequired: false,
      auth0Logout: true,
      baseURL: process.env.BASE_URL,
      clientID: process.env.AUTH0_CLIENT_ID,
      secret: process.env.AUTH0_CLIENT_SECRET,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
    }))
  },
  onReady: async () => { app.start() },
  onDestroy: async () => { app.log.info('cleaning up stuffs...') },
})