import { Module } from '@nestjs/common';
import {TestModule} from "./api/test/test.module";
import {GlobalModule} from "./db/db.module";

@Module({
  imports: [TestModule,GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
