module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          credentials: {
            accessKeyId: env('FOI_S3_ACCESS_KEY_ID'),
            secretAccessKey: env('FOI_S3_ACCESS_SECRET_KEY'),
          },
          region: 'us-east-1',
          endpoint: `https://${env('FOI_S3_HOST')}/${env('FOI_S3_BUCKETNAME')}`,
          params: {
            Bucket: env('FOI_S3_BUCKETNAME'),
            // Bucket: 'strapi-help',
          },
          // baseUrl: `https://${env('FOI_S3_HOST')}/${env('FOI_S3_BUCKETNAME')}`,
          // Required for BCGov S3 due to different endpoint structure from AWS
          // Instead of using subdomains, the bucket is a path.
          s3BucketEndpoint: true,
          s3ForcePathStyle: true,
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

