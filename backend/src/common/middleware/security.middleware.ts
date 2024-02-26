import { NextFunction, Request, Response } from 'express';

export function SecurityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${isDevelopment && "'unsafe-eval'"}`,
    `style-src 'self'  ${
      isDevelopment && "'unsafe-inline'"
    } https://fonts.googleapis.com`,
  ].join('; ');

  // Ensure JWT is responded back (Maybe only for dev?)
  if (isDevelopment && req.headers['authorization'])
    res.setHeader('Authorization', req.headers['authorization']);

  // Secure web content sources
  res.setHeader('Content-Security-Policy', csp);

  if (!isDevelopment) { // Ensure https is used in production
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Prevent browser from content-type assumptions (MIME Type Confusion Attacks)
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevents our site from being used in an <iframe> which is a source of click-jacking hacks
  res.setHeader('X-Frame-Options', 'DENY');

  // No need to send referer as it can be used to track users origin but is also useless even for validation as it can be spoofed
  res.setHeader('Referrer-Policy', 'no-referrer');
  
  // Browser features config
  res.setHeader('Feature-Policy', "geolocation 'self'; microphone 'none'; camera 'none'");

  next();
}
