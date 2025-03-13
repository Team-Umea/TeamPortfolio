export const SERVER_URL = "http://localhost:3000";

export const ENDPOINTS = {
  CREATEPROFILE: `${SERVER_URL}/api/admin/createprofile`,
  EDITPROFILE: `${SERVER_URL}/api/admin/editprofile`,
  GETPROFILE: `${SERVER_URL}/api/admin/profile`,
  ADDEVENT: `${SERVER_URL}/api/admin/addevent`,
  GETEVENTS: `${SERVER_URL}/api/events`,
};

export const AUTHECHO_ENDPOINTS = {
  REQUESTCODE: `${SERVER_URL}/authecho/app/requestcode`,
  VERIFYCODE: `${SERVER_URL}/authecho/app/verifycode`,
  VALIDATEQUESTION: `${SERVER_URL}/authecho/app/validatequestion`,
  SIGNIN: `${SERVER_URL}/authecho/app/signin`,
  AUTHENTICATE: `${SERVER_URL}/authecho/app/authenticate`,
  SIGNOUT: `${SERVER_URL}/authecho/app/signout`,
  VERIFYSESSION: `${SERVER_URL}/authecho/app/verifysession`,
  TRACKACTIVITY: `${SERVER_URL}/authecho/app/activity`,
};
