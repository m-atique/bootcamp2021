import { aws_xray, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from '@aws-cdk/core'
import * as appsync from '@aws-cdk/aws-appsync'
import * as lambda from '@aws-cdk/aws-lambda'
import { CfnDisk } from 'aws-cdk-lib/aws-lightsail';
import { Handler } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HellographqlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new appsync.GraphqlApi(this,'GRAPHQL_API',{
      name:'cdk-api',
      schema:appsync.Schema.fromAsset('graphql/schema.gql'),  // path to schema
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
    //print the url of api
    new cdk.CfnOutput(this,'ApiGraphUrl',{
      value : api.graphqlUrl
    })

    //---------------------------rinting api key
    //print the url of api
    new cdk.CfnOutput(this,'grahqlApiKey',{
      value : api.apiKey || ''
    })
    //----------------------------Defining lambda
    const lambda_function = new lambda.Function(this,'Lambdafunction',{
      runtime:lambda.Runtime.NODEJS_14_X,
      code:lambda.Code.fromAsset("lambda"),
      handler:'index.handler',
      timeout:cdk.Duration.seconds(10)
    })

    //----------------------------------------set lambda as datasouce 
    const lambda_data_source = api.addLambdaDataSource('lambdaDataSource',lambda_function);


    //----------------------------------------defining resolver
    lambda_data_source.createResolver({typeName:"Query",fieldName:'notes'})
  }
}
