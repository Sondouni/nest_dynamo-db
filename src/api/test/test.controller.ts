import {Controller, Get, Post} from '@nestjs/common';
import { TestService } from './test.service';
import {dynamoDBInstance} from "../../db/dynamoDBInstance";
import { v4 as uuid } from 'uuid';

@Controller("/test")
export class TestController {
  constructor(
      private readonly testService: TestService,
      private readonly dynamoDBInstance: dynamoDBInstance
  ) {}

  @Get("/")
  getHello(): string {
    return this.testService.getHello();
  }

  @Get("/tableList")
  getTableList(): any {
    const dynamoDBTableList = this.dynamoDBInstance.getTableList();
    return this.testService.getHello();
  }

  @Get("/createTable")
  createTable(): any {
    const params = {
      TableName: "TEST",
      KeySchema: [
        { AttributeName: "year", KeyType: "HASH" }, // Partition key
        { AttributeName: "title", KeyType: "RANGE" } // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "S" },
        { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
    const dynamoDBTableList = this.dynamoDBInstance.createTable(params);
    console.log(dynamoDBTableList);
    return this.testService.getHello();
  }

  @Get("/insertItem")
  insertItem(): any {
    const params = {
      TableName: "TEST",
      Item: {
        "year": 'test',
        "title": '1',
        "test":"test",
        "test11":"test11",
        "test22":"test22",
        "test33":"test33",
      }
    }
    console.log(params);
    const dynamoDBTableList = this.dynamoDBInstance.insertItem(params);
    console.log(dynamoDBTableList);
    return this.testService.getHello();
  }

  @Get("/testDetail")
  testDetail(): any {
    const params = {
      TableName: "TEST",
      Key:{
        'year':'*',
        'title':'*',
      }
    }
    const dynamoDBTable = this.dynamoDBInstance.getTable(params);
    return dynamoDBTable;
  }

  @Get("/testAllItem")
  testAllItem(): any {
    const params = {
      TableName: "TEST",    // 2. from geoseong
      // ProjectionExpression: "#val, test, id",    // 1. select val, test, id
      // FilterExpression: "#val between :start and :end", // 3. where val between :start and :end
      // ExpressionAttributeNames: {
      //   "#val": "val",
      // },
      // ExpressionAttributeValues: {
      //   ":start": 1,
      //   ":end": 100
      // }

    }
    const dynamoDBTable = this.dynamoDBInstance.getAllItem(params);
    return dynamoDBTable;
  }
}
