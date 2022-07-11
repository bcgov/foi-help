module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('FOI_S3_ACCESS_KEY_ID'),
          secretAccessKey: env('FOI_S3_ACCESS_SECRET_KEY'),
        //   region: env('AWS_REGION'),
          params: {
            Bucket: env('FOI_S3_BUCKETNAME'),
          },
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