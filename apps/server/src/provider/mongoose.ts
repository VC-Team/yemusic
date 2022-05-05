import { mongoDB } from '@config';
import * as mongoose from 'mongoose';

export const loadMongo = async () => {
  mongoose.connect(
    mongoDB.database_url || `mongodb://${mongoDB.database_host}/${mongoDB.database}`,
    mongoDB.mongoOptions,
    err => {
      if (err) {
        logger.info(`💩 mongodb connection failed ${err}`);
      } else {
        logger.info('🌈 hello from mongodb');
      }
    }
  );
};
