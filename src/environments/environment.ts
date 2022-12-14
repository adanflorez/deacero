// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiLogin: 'http://44.228.61.3:8080/oauth/login',
  apiUser: 'http://44.228.61.3:8080/user',
  apiRegister: 'http://44.228.61.3:8080/register/',
  apiApplication: 'http://44.228.61.3:8080/application/',
  apiMultimedia: 'http://44.228.61.3:8080/multimedia/',
  apiFeedback: 'http://44.228.61.3:8080/feedback/',
  apiAdmin: 'http://44.228.61.3:8080/admin/',
  apiAnnouncement: 'http://44.228.61.3:8080/announcement/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
