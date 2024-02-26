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
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.API_PORT),
    jwt: {
      expiresIn: process.env.JWT_EXPIRATION,
      secret: process.env.JWT_SECRET,
    },
  },
  database: { url: process.env.DATABASE_URL },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
