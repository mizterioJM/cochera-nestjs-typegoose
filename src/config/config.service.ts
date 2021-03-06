import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevEnv: boolean = process.env.NODE_ENV !== 'production';

    if (isDevEnv) {
      const envFilePath: string = __dirname + '/../../.env';
      const existPath: boolean = existsSync(envFilePath);

      if (!existPath) {
        console.log('.env does not exist');
        process.exit(0);
      }

      this.envConfig = parse(readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        DB_URI: process.env.DB_URI,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
