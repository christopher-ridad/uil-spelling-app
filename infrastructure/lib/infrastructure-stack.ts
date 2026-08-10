import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';
import * as path from 'path';

// The Gemini SDK layer already attached to the hand-created `misspell`
// Lambda - reused here instead of repackaging google-genai ourselves.
const GEMINI_LAYER_ARN = 'arn:aws:lambda:us-east-1:986778210258:layer:google-generativeai:5';

// Created out-of-band via AWS CLI with placeholder values (see README) -
// the real secret values are set directly in Secrets Manager, never
// passed through CDK source or an env var.
const GEMINI_SECRET_NAME = 'misspell-pipeline/gemini-api-key';
const SUPABASE_SECRET_NAME = 'misspell-pipeline/supabase-service-role-key';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'SUPABASE_URL and SUPABASE_ANON_KEY must be set (see infrastructure/.env.example) before synth/deploy.'
      );
    }

    // -- Queue --------------------------------------------------------

    const deadLetterQueue = new sqs.Queue(this, 'MisspellingDeadLetterQueue', {
      queueName: 'misspelling-generation-dlq',
      retentionPeriod: cdk.Duration.days(14),
    });

    const queue = new sqs.Queue(this, 'MisspellingQueue', {
      queueName: 'misspelling-generation-queue',
      visibilityTimeout: cdk.Duration.seconds(300), // 5x the worker's timeout, per SQS/Lambda guidance
      deadLetterQueue: {
        queue: deadLetterQueue,
        maxReceiveCount: 3, // a word that fails 3 times lands in the DLQ instead of retrying forever
      },
    });

    // -- Secrets (referenced, not created with real values) -----------

    const geminiSecret = secretsmanager.Secret.fromSecretNameV2(this, 'GeminiSecret', GEMINI_SECRET_NAME);
    const supabaseSecret = secretsmanager.Secret.fromSecretNameV2(this, 'SupabaseSecret', SUPABASE_SECRET_NAME);

    // -- Worker Lambda (SQS-triggered) ---------------------------------

    const workerFunction = new lambda.Function(this, 'MisspellingWorker', {
      functionName: 'misspell-worker',
      runtime: lambda.Runtime.PYTHON_3_14,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/worker')),
      timeout: cdk.Duration.seconds(60),
      memorySize: 128,
      layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'GeminiLayerForWorker', GEMINI_LAYER_ARN)],
      environment: {
        SUPABASE_URL: supabaseUrl,
        GEMINI_SECRET_ARN: geminiSecret.secretArn,
        SUPABASE_SECRET_ARN: supabaseSecret.secretArn,
      },
      // Would reserve concurrency here to protect Gemini's free-tier
      // rate limit from a burst of SQS messages, but this account's
      // total Lambda concurrency ceiling is only 10 (AWS requires 10
      // unreserved at minimum) - there's nothing to reserve from. The
      // account-wide cap of 10 already bounds total parallelism across
      // every Lambda in the account, which covers the same concern.
    });

    geminiSecret.grantRead(workerFunction);
    supabaseSecret.grantRead(workerFunction);

    workerFunction.addEventSource(
      new lambdaEventSources.SqsEventSource(queue, {
        batchSize: 1,
        reportBatchItemFailures: true,
      })
    );

    // -- Dispatcher Lambda (manually invoked for now) ------------------

    const dispatcherFunction = new lambda.Function(this, 'MisspellingDispatcher', {
      functionName: 'misspell-dispatcher',
      runtime: lambda.Runtime.PYTHON_3_14,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/dispatcher')),
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
      environment: {
        QUEUE_URL: queue.queueUrl,
        SUPABASE_URL: supabaseUrl,
        SUPABASE_ANON_KEY: supabaseAnonKey,
      },
    });

    queue.grantSendMessages(dispatcherFunction);

    // -- Outputs --------------------------------------------------------

    new cdk.CfnOutput(this, 'QueueUrl', { value: queue.queueUrl });
    new cdk.CfnOutput(this, 'DispatcherFunctionName', { value: dispatcherFunction.functionName });
    new cdk.CfnOutput(this, 'WorkerFunctionName', { value: workerFunction.functionName });
  }
}
