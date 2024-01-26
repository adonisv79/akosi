export interface Configuration {
  api: {
    port: number;
    jwtSecret: string;
  };
  database: {
    url: string;
  };
}

export default (): Configuration => ({
  api: {
    port: parseInt(process.env.API_PORT),
    jwtSecret: process.env.JWT_SECRET,
  },
  database: { url: process.env.DATABASE_URL },
});
