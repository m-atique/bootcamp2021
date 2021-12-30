import { lambda_layer_awscli, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as ddb from '@aws-cdk/aws-dynamodb'
import { Code } from 'aws-cdk-lib/aws-lambda';
import {
  IResource,
  LambdaIntegration,
  MockIntegration,
  PassthroughBehavior,
  RestApi,
} from "@aws-cdk/aws-apigateway";
import { Integration } from 'aws-cdk-lib/aws-apigateway';

export class BooksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //----------------------------------- The code that defines your stack goes here
    //----------------------------------creating table
    // The code that defines your stack goes here
    const dynamoTable = new ddb.Table(this, "books", {
      partitionKey: {
        name: "bookId",
        type: ddb.AttributeType.STRING,
      },
      tableName: "books",
    });
    //-----------------------------lambda to get all books
    const allBooks = new lambda.Function(this, 'booksLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'allBooks.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        PRIMARY_KEY: "bookId",
        TABLE_NAME: dynamoTable.tableName,


      },
    })
    //-----------------------------lambda to get one book
    const singlebook = new lambda.Function(this, 'oneBooklambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'singleBook.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        PRIMARY_KEY: "bookId",
        TABLE_NAME: dynamoTable.tableName,
      },
    })
    //-----------------------------lambda to add one book
    const addbook = new lambda.Function(this, 'addBooklambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'addBook.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        PRIMARY_KEY: "bookId",
        TABLE_NAME: dynamoTable.tableName,
      },
    })
    //-----------------------------lambda to delete book
    const delbook = new lambda.Function(this, 'delBooklambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'delBook.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        PRIMARY_KEY: "bookId",
        TABLE_NAME: dynamoTable.tableName,
      },
    })
    //-----------------------------lambda to update book
    const updatebook = new lambda.Function(this, 'updateBooklambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'updateBook.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        PRIMARY_KEY: "bookId",
        TABLE_NAME: dynamoTable.tableName,
      },
    })


    // Grant the Lambda function read access to the DynamoDB table

    dynamoTable.grantReadWriteData(allBooks);
    dynamoTable.grantReadWriteData(singlebook);
    dynamoTable.grantReadWriteData(addbook);
    dynamoTable.grantReadWriteData(delbook);
    dynamoTable.grantReadWriteData(updatebook);



    // //-------------integrating lambda
    const addbooksIntegration = new LambdaIntegration(addbook)
    const delbooksIntegration = new LambdaIntegration(delbook)
    const updatebooksIntegration = new LambdaIntegration(updatebook)
    const allbooksIntegration = new LambdaIntegration(allBooks)
    const singlebookIntegration = new LambdaIntegration(singlebook)






    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, "booksApi", {
      restApiName: "Simple Books",
    });



    const items = api.root.addResource("books");
    items.addMethod("GET", allbooksIntegration);
    items.addMethod("POST", addbooksIntegration);
    addCorsOptions(items);

    // const additems = api.root.addResource("addbooks");
    // additems.addMethod("POST", addbooksIntegration);
    // addCorsOptions(additems);

    const singleItem = items.addResource("{id}");
    singleItem.addMethod("GET", singlebookIntegration);
    singleItem.addMethod("PATCH", updatebooksIntegration);
    singleItem.addMethod("DELETE", delbooksIntegration);
    addCorsOptions(singleItem);

  }
}
export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials":
              "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    }
  );
}
