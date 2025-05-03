export const environment = {
    production: false,
      // BASE_URL : window["env"]["api"] ,
      // WEB_URL : window["env"]["url"],
      BASE_URL : process.env["BASE_URL"] ,
      WEB_URL : window["env"]["url"],
};
