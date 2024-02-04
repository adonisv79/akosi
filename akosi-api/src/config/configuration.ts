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
}

export default (): Configuration => ({
  api: {    
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.API_PORT),
    jwt: {
      expiresIn: process.env.JWT_EXPIRATION,
      secret: process.env.JWT_SECRET
    },
  },
  database: { url: process.env.DATABASE_URL },
});
