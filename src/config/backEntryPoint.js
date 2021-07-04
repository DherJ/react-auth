export const BASE_API_URL = 'http://localhost:8081/api/';

export const ENDPOINT_AUTH = BASE_API_URL + 'auth/';
export const ENDPOINT_SIGNIN = ENDPOINT_AUTH + 'signin';
export const ENDPOINT_SIGNUP = ENDPOINT_AUTH + 'signup';
export const ENDPOINT_SEND_MESSAGE = BASE_API_URL + 'message/send';
export const ENDPOINT_USERS = BASE_API_URL + 'admin/users';

export const ENDPOINT_PUBLIC_CONTENT = BASE_API_URL + 'test/all';
export const ENDPOINT_USER_CONTENT = BASE_API_URL + 'test/user';
export const ENDPOINT_MODERATOR_CONTENT = BASE_API_URL + 'test/mod';
export const ENDPOINT_ADMIN_CONTENT = BASE_API_URL + 'test/admin';