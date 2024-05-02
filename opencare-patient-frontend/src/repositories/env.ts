import { base64 } from "../utils";

// O3 env variables
const O3_USER = "admin";
const O3_PASSWORD = "Admin123";
const O3_PORT = "8011";
const O3_HOST = "localhost";

export const O3_BASE_SECURE_URL = `https://${O3_HOST}:${O3_PORT}/openmrs/ws/rest/v1`;
export const O3_BASE_URL = `http://${O3_HOST}:${O3_PORT}/openmrs/ws/rest/v1`;
export const O3_BASE64 = base64(`${O3_USER}:${O3_PASSWORD}`);

// Talk env variables
export const TALK_USER = "admin";
export const TALK_PASSWORD = "Admin123";
export const TALK_PORT = "8010";
export const TALK_HOST = "localhost";

export const TALK_BASE64 = base64(`${TALK_USER}:${TALK_PASSWORD}`);

export const NC_BASE_URL = `http://${TALK_HOST}:${TALK_PORT}/ocs/v2.php`
export const TALK_BASE_URL = `${NC_BASE_URL}/apps/spreed/api/v4`;
