module.exports = [
  'strapi::errors',
  // 'strapi::security',
  // Replacing strapi::security to fix CSP for Media Library when using bcgov s3
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            // 'dl.airtable.com',
            //
            /**
             * This * _should_ be the base url of the bcgov object storage, i.e. FOI_S3_HOST env var
             * But, we cannot access env vars in this file.
             * And since we do not want to leak the value, we simply whitelist all images. 
             */
            '*',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            // 'dl.airtable.com',
            '*',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
