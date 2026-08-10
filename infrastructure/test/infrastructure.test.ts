import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { InfrastructureStack } from '../lib/infrastructure-stack';

process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_ANON_KEY = 'test-anon-key';

test('stack synthesizes the queue, DLQ, and both Lambdas', () => {
  const app = new cdk.App();
  const stack = new InfrastructureStack(app, 'TestStack', {
    env: { account: '123456789012', region: 'us-east-1' },
  });
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::SQS::Queue', 2);
  template.resourceCountIs('AWS::Lambda::Function', 2);
  template.hasResourceProperties('AWS::SQS::Queue', {
    VisibilityTimeout: 300,
  });
});
