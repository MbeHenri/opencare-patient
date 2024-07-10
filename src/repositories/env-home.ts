import { base64 } from "../utils";

// O3 env variables HENRI
/*const O3_USER = process.env.REACT_APP_O3_USER;
const O3_PASSWORD = process.env.REACT_APP_O3_PASSWORD;
const O3_PORT = process.env.REACT_APP_O3_PORT;
const O3_HOST = process.env.REACT_APP_O3_HOST;*/

// O3 env variables
const O3_USER = "admin";
const O3_PASSWORD = "Admin123";
const O3_PORT = "80";
const O3_HOST = "192.168.0.10";
//const O3_HOST = "localhost";

console.log(O3_HOST);

export const O3_BASE_SECURE_URL = `https://${O3_HOST}:${O3_PORT}/openmrs/ws/rest/v1`;
export const O3_BASE_URL = `http://${O3_HOST}:${O3_PORT}/openmrs/ws/rest/v1`;
export const O3_BASE64 = base64(`${O3_USER}:${O3_PASSWORD}`);

// Talk env variables HENRI
/*export const TALK_USER = process.env.REACT_APP_TALK_USER;
export const TALK_PASSWORD = process.env.REACT_APP_TALK_PASSWORD;
export const TALK_PORT = process.env.REACT_APP_TALK_PORT;
export const TALK_HOST = process.env.REACT_APP_TALK_PASSWORD;*/

// Talk env variables
export const TALK_USER = process.env.TALK_USER;
export const TALK_PASSWORD = process.env.TALK_PASSWORD;
export const TALK_PORT = process.env.TALK_PORT;
export const TALK_HOST = process.env.TALK_PASSWORD;

export const TALK_BASE64 = base64(`${TALK_USER}:${TALK_PASSWORD}`);

export const NC_BASE_URL = `http://${TALK_HOST}:${TALK_PORT}/ocs/v2.php`;
export const TALK_BASE_URL = `${NC_BASE_URL}/apps/spreed/api/v4`;

export const TALK_BASE_PASSWORD = process.env.REACT_APP_TALK_INIT_PASSWORD;
