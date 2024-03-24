import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongod: MongoMemoryServer;
export const rootMongooseTestModule = () =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
        },
      });
      const mongoUri = mongod.getUri();
      return { uri: mongoUri };
    },
  });
export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
