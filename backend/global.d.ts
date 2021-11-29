// Declaration Merging for process.env variable types

namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_URI: string;
  }
}
