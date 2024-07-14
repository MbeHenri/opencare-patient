/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_OPENCARE_SWITCH: string;
    O3_USER: string;
    O3_PASSWORD: string;
    O3_PORT: string;
    O3_HOST: string;
  }
}
