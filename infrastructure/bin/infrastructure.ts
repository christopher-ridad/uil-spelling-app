#!/usr/bin/env node
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib/core';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new InfrastructureStack(app, 'MisspellingPipelineStack', {
  // pinned to us-east-1: the existing misspell Lambda, its API Gateway,
  // and the reused google-generativeai layer all live there, and layer
  // ARNs are region-bound.
  env: { account: '986778210258', region: 'us-east-1' },
});
