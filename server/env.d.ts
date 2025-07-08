declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: number;

    DB_PORT: number;
    DB_HOST: string;
    DB_NAME: string;

    JWT_SECRET_KEY_ACCESS_TOKEN: string;
    JWT_SECRET_KEY_REFRESH_TOKEN: string;
  }
}
