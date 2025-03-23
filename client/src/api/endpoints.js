//uncoment this for dev
// export const SERVER_URL = "http://localhost:3000";
export const SERVER_URL = "https://teamumea.vercel.app/";

export const ENDPOINTS = {
  CONTENT: `${SERVER_URL}/api/content`,
};

export const PROFILE_ENDPOINTS = {
  CREATEPROFILE: `${SERVER_URL}/api/admin/createprofile`,
  EDITPROFILE: `${SERVER_URL}/api/admin/editprofile`,
  GETPROFILE: `${SERVER_URL}/api/admin/profile`,
  GETPROFILEALIAS: `${SERVER_URL}/api/profiles`,
};

export const EVENT_ENDPOINTS = {
  ADDEVENT: `${SERVER_URL}/api/admin/addevent`,
  EDITEVENT: `${SERVER_URL}/api/admin/editevent`,
  GETEVENTS: `${SERVER_URL}/api/events`,
  GETEVENTBYID: `${SERVER_URL}/api/event`,
  DELETEEVENT: `${SERVER_URL}/api/admin/deleteevent`,
  ENROLL: `${SERVER_URL}/api/enroll`,
  EVENTQUESTION: `${SERVER_URL}/api/addeventquestion`,
  EVENTQUESTIONS: `${SERVER_URL}/api/admin/eventquestions`,
  EVENTENROLLMENTS: `${SERVER_URL}/api/admin/eventenrollments`,
};

export const PROJECT_ENDPOINTS = {
  ADDPROJECT: `${SERVER_URL}/api/admin/addproject`,
  EDITPROJECT: `${SERVER_URL}/api/admin/editproject`,
  GETPROJECTS: `${SERVER_URL}/api/projects`,
  GETPROJECTBYID: `${SERVER_URL}/api/project`,
  DELETEPROJECT: `${SERVER_URL}/api/admin/deleteproject`,
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
