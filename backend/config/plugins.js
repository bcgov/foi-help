module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('FOI_S3_ACCESS_KEY_ID'),
          secretAccessKey: env('FOI_S3_ACCESS_SECRET_KEY'),
          region: 'us-east',
          endpoint: `https://${env('FOI_S3_HOST')}/${env('FOI_S3_BUCKETNAME')}`, 
          params: {
            // Bucket: env('FOI_S3_BUCKETNAME'),
            Bucket: 'strapi-help',
          },
          // Required for BCGov S3 due to different endpoint structure from AWS
          // Instead of using subdomains, the bucket is a path.
          s3BucketEndpoint: true,
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    // ...
  });

