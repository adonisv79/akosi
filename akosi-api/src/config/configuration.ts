export interface Configuration {
  api: {
    nodeEnv: string;
    port: number;
    jwtSecret: string;
  };
  database: {
    url: string;
  };
}

export default (): Configuration => ({
  api: {    
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.API_PORT),
    jwtSecret: process.env.JWT_SECRET,
  },
  database: { url: process.env.DATABASE_URL },
});
