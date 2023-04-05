import {Global, Module} from '@nestjs/common';
import {dynamoDBInstance} from "./dynamoDBInstance";

@Global()
@Module({
  imports: [],
  providers: [dynamoDBInstance],
  exports:[dynamoDBInstance]
})
export class GlobalModule {}
