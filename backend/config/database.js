module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('FOI_DATABASE_HOST', 'localhost'),
      port: env.int('FOI_DATABASE_PORT', 5432),
      database: env('FOI_DATABASE_NAME', 'foi-help-backend'),
      user: env('FOI_DATABASE_USERNAME', 'postgres'),
      password: env('FOI_DATABASE_PASSWORD', 'todochangepassword'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
