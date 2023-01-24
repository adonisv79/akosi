import { Router, Request, Response } from 'express'
import { ExpressApp } from 'adon-api'
import { requiresAuth } from 'express-openid-connect'

export default function route (app: ExpressApp, router: Router): void {
    router.get('/', async (req: Request, res: Response) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    })

    router.get('/profile', requiresAuth(), (req, res) => {
      res.send(JSON.stringify(req.oidc.user));
    })

    router.get('/all', requiresAuth(), (req, res) => {
      res.send(JSON.stringify(req.oidc.idToken));
    })
}