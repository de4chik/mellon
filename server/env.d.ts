declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      DB_LINK: string;
      SERVER_PREFIX: string;
      JWT_KEY_ACCESS: string;
      JWT_KEY_REFRESH: string;
    }
  }
}
export {};
