import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway' 


export class LamdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const hellolambda = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),               //----- (here Assest mean the folder that contain lambda function)
      handler: "hello.handler",                            //----- (from folder as assest we call hello.ts and in hello.ts we call handler function )
    });

//-----------------------------------------------------------Need a hit point url which is API gateway 

new apigateway.LambdaRestApi(this, 'myapi', {
  handler: hellolambda,                                     //-----  it is our function defined above as lambda function
});


  }
}
