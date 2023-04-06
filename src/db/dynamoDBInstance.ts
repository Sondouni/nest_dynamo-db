import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import * as AWS from "aws-sdk";
import {awsDynamoDBAccessKey, awsDynamoDBSecretKey} from "../../db_config";
import {Injectable} from "@nestjs/common";

@Injectable({
})
export class dynamoDBInstance{
    private awsInstance: AWS.DynamoDB;
    private awsInstanceDoc: AWS.DynamoDB.DocumentClient;

    constructor() {
        AWS.config.update({
            accessKeyId: awsDynamoDBAccessKey,
            secretAccessKey: awsDynamoDBSecretKey,
            region: 'ap-northeast-2'
        })
        this.awsInstance = new AWS.DynamoDB;
        this.awsInstanceDoc = new AWS.DynamoDB.DocumentClient;

    }

    getTableList():any{
        const tableList = this.awsInstance.listTables({},(err, data)=>{
            if(err){
                console.log(err,'ERR@');
            }else {
                console.log(data,'success');
            }
        });
        return tableList;
    }

    createTable(params):any{
        this.awsInstance.createTable(params, function(err, data) {
            if (err) {
                const errResult = JSON.stringify(err, null, 2);
                console.log(
                    "Unable to create table. Error JSON: ",
                    errResult
                );
            } else {
                const result = JSON.stringify(data, null, 2);
                console.log(
                    "Created table. Table description JSON: ",
                    result
                );
            }
        });
    }

    async insertItem(params):Promise<any>{
        return await this.awsInstanceDoc.put(params).promise();
    }

    async getTable(params):Promise<any>{
        const result = await this.awsInstanceDoc.get(params).promise();
        return result;
    }

    async getAllItem(params):Promise<any>{
        const result = await this.awsInstanceDoc.scan(params).promise();
        return result;
    }

}




