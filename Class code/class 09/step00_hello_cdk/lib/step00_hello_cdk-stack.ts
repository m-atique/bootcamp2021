import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
// --------------------------------------------importing s3 bucket
import * as s3 from '@aws-cdk/aws-s3';

export class Step00HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // new s3.Bucket(this,'myFirstBucket',{
    //   versioned:true
    // })

    //-----------------------------------------creating lambda 
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });

  //-------------------------------------------apigateway
  new apigw.LambdaRestApi(this, "Endpoint", {
    handler: hello,
  });


  }
}
