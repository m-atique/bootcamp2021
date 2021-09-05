import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync'


export class GraphqlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //----------------------------------------------
    const api = new appsync.GraphqlApi(this, 'GraphqlApi', {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('Gql/schema.gql'), //----------path specified for lambda 
      authorizationConfig: {                              //----------defining autherization
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))   //-----------defining expiy
          }
        }
      },
      xrayEnabled: true  //--------------- enablaing xray debbug(an aws code debbugear)
    })

//---------------------printing Grpaph ql url after deploying
    new cdk.CfnOutput(this, 'GrpahqlApiUrl', {
      value: api.graphqlUrl
    })

  }
}
