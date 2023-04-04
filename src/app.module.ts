import { Module } from '@nestjs/common';
import {TestModule} from "./api/test/test.module";

@Module({
  imports: [TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
