import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from '@aws-cdk/core'
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as appsync from '@aws-cdk/aws-appsync'
import * as lambda from '@aws-cdk/aws-lambda'
import * as ddb from '@aws-cdk/aws-dynamodb'
import { AuthorizationType, Schema } from '@aws-cdk/aws-appsync';
import { ApiKey } from 'aws-cdk-lib/aws-apigateway';

export class TodoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

 const api = new appsync.GraphqlApi(this,'api',{
   name:'todo_graphql api',
   schema:appsync.Schema.fromAsset('graphql/schema.gql'),
   authorizationConfig:{
     defaultAuthorization:{
       authorizationType:appsync.AuthorizationType.API_KEY,
       apiKeyConfig:{
         expires:cdk.Expiration.after(cdk.Duration.days(365))
       }

     },
   },
   xrayEnabled:true
 })
  }
}
