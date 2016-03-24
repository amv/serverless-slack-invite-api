# serverless-slack-invite-api

Invite people to Slack using AWS Lambda and the [Serverless](https://github.com/serverless/serverless) framework.

## Install steps overview

1. Create a new Serverless project using this repository
2. Generate AWS tokens for deploying Lambda functions
3. Configure Serverless to use the AWS tokens
4. Generate API token for controlling Slack
5. Add Slack API token and domain to your Serverless environment
6. Deploy API to AWS Lambda
7. (usually) Add a HTML form to your website for requesting automatic invites

## Create a project

For now this project is compatible only with Serverless 0.4:

    $ npm install -g serverless@v0.4.2
    $ serverless project install serverless-slack-invite-api -s production

... And follow the instructions until you get asked for your AWS ACCESS KEY ID.

It does not really matter what you input as long as your bucket name is unique.

## Generate AWS token for deploying Lambda functions

Go to the [IAM console](https://console.aws.amazon.com/iam/home) and generate a key pair consisting of a Access Key ID and Secret Access Key.

## Configure Serverless to use the AWS tokens

Input the Access Key ID and Secret Access Key as answers to the questions that were presented to you by the "project install" process.

## Generate API token for controlling Slack

Visit [OAuth Tokens for Testing -page](https://api.slack.com/docs/oauth-test-tokens) to generate yourself a test token for Slack.

## Add Slack API token and domain to your Serverless environment

Enter the project directory:

    $ cd serverless-slack-invite-api

Replace YOUR_SLACK_SUBDOMAIN and YOUR_SLACK_TOKEN from the following commands:

    $ serverless env set -k slack_domain -v YOUR_SLACK_SUBDOMAIN.slack.com
    $ serverless env set -k slack_token -v YOUR_SLACK_TOKEN

## Deploy API to AWS Lambda

    $ serverless function deploy --all
    $ serverless endpoint deploy --all

Note the output of the last command, where you can get the URL for your API.

## Add a HTML form to your website for requesting automatic invites

To invite a new user, send a POST request with 'Content-Type: application/json' to the invite endpoint that you got from the previous section.

The content of the POST request should be a JSON object that contains an "email" attribute. Here is an example with curl:

    $ curl -X POST -H 'Content-Type: application/json' -d '{ "email" : "demo@test.com" }' https://fav7ffggds.execute-api.us-east-1.amazonaws.com/production/invite

Under the "examples" directory you can find an example index.html file that showcases how to build a simple public subscription page using jQuery.

The endpoint has permissive CORS headers, so once you edit the index.html to contain the correct execute-api domain in the "settings" -object, you can open if locally with a browser and test the API out.

In OS X:

    $ open examples/index.html

In Windows:

    $ start examples/index.html

In Linux:

    $ xdg-open examples/index.html
