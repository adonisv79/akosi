export interface Configuration {
  api: {
    nodeEnv: string;
    port: number;
    jwt: {
      expiresIn: string;
      secret: string;
    };
  };
  database: {
    url: string;
  };
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
}

export default (): Configuration => ({
  api: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.API_PORT || '3001'),
    jwt: {
      expiresIn: process.env.JWT_EXPIRATION || '15m',
      secret: process.env.JWT_SECRET || '',
    },
  },
  database: {
    url:
      process.env.DATABASE_URL ||
      'mysql://username:password@localhost:3306/akosi',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '465'),
    user: process.env.SMTP_USER || 'username',
    pass: process.env.SMTP_PASS || 'password',
  },
});
