import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Graphql from '../lib/graphql-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Graphql.GraphqlStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
