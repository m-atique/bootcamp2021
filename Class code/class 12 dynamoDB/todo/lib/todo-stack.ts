import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from '@aws-cdk/core'
import * as appsync from '@aws-cdk/aws-appsync'
import * as lambda from '@aws-cdk/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TodoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //-------------conecting api to schema
    const api = new appsync.GraphqlApi(this,"api",{
      name: 'cdk-todo-appsync-api',
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
    //--------------------------------------------------defining lambda to access funtions to change data 
    const todosLambda = new lambda.Function(this,'Appsync notes handler',{
      runtime:lambda.Runtime.NODEJS_14_X,
      handler:'main.handler',
      code:lambda.Code.fromAsset('functions'),
      memorySize :1024
    })

    //----------------------------------------------conecting data store
    // const lambdaDatasource = api.addLambdaDataSource(this)
  }
}
