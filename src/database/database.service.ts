import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'mongoose';
import { Configuration } from '../config/config.enum';

export const databaseProvider = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(_config: ConfigService) {
      return {
        uri: _config.get(Configuration.DB_URI),
        dbName: _config.get(Configuration.DB_NAME),
        user: _config.get(Configuration.DB_USERNAME),
        pass: _config.get(Configuration.DB_PASSWORD),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      } as ConnectionOptions;
    },
  }),
];
