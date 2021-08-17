declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      BCRYPT_HASH: string;
      JWT_SECRET: string;
      FILES_PATH: string;
    }
  }
}

export {};
