import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RestfullApi from '../lib/restfull_api-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RestfullApi.RestfullApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
