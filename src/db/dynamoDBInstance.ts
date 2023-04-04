import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

const dynamoDB = new DynamoDBClient({
    region: 'ap-northeast-2',
});
dynamoDB.config.credentials({

})

const docClient = DynamoDBDocumentClient.from(dynamoDB);

export default docClient;
