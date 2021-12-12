import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
// --------------------------------------------importing s3 bucket
import * as s3 from '@aws-cdk/aws-s3';

//-----------------------------------import essential for cdn
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class Step00HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // new s3.Bucket(this,'myFirstBucket',{
    //   versioned:true
    // })

    //-----------------------------------------creating lambda 
    // const hello = new lambda.Function(this, "HelloHandler", {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   code: lambda.Code.fromAsset("lambda"),
    //   handler: "hello.handler",
    // });


   //---------------------------------------------step 002 to deplay web
   const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
    versioned: true,
  });

   //-----------------------------------------------one
   
    // create a CDN to deploy your website
    
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
      },
      defaultRootObject: "index.html",
    });

    
   //-----------------------------------------------two
    // Prints out the web endpoint to the terminal

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
    });


   
    //-----------------------------------------------three
    // housekeeping for uploading the data in bucket 

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("./web")],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
    


  //-------------------------------------------apigateway
  // new apigw.LambdaRestApi(this, "Endpoint", {
  //   handler: hello,
  // });


  }
}
