export interface Configuration {
  api: {
    port: number;
  },
  database: {
    url: string;
  };
}

export default (): Configuration => ({
  api: { port: parseInt(process.env.API_PORT) },
  database: { url: process.env.DATABASE_URL },
});
