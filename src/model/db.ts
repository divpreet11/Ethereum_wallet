import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
   process.env.DBNAME,
   process.env.USER_NAME,
   process.env.PASSWORD,
   {
      dialectOptions: {
         connectTimeout: 60000,
      },
      host: process.env.HOST_NAME,
      dialect: 'mysql',
      define: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
         underscored: true,
      },
      logging: false,
      pool: {
         max: 5,
         min: 0,
         idle: 1000,
         acquire: 60000,
      },
   }
);
