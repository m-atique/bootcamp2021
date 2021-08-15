import * as cdk from '@aws-cdk/core';
//-----------install aws-s3 using command npm install @aws-cdk/aws-s3
import * as s3 from '@aws-cdk/aws-s3'

export class Cdk1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //creating S3 bucket(aws storage)   fowlling cdk1 standards
    new s3.Bucket(this,"ateeqBucket",{versioned:true})
    // Run a cammand to build   npm build
    //Creation of cloud formation by "cdk synth" in terminal
  }
}
