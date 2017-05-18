# serverless-slack-invite-api

Invite people to Slack using AWS Lambda and the [Serverless](https://github.com/serverless/serverless) framework.

## Install steps overview

1. Create a new Serverless project using this repository
2. Generate AWS tokens for Serverless to deploying Lambda functions
3. Generate API token for controlling Slack
4. Add Slack API token and domain to your Serverless environment
5. Deploy API to AWS Lambda
6. (usually) Add a HTML form to your website for requesting automatic invites

## Create a project

You need Node.JS and NPM installed. Newer serverless versions might work too, but this is what I have tested:

    $ npm install -g serverless@v1.13.2
    $ sls install -u https://github.com/amv/serverless-slack-invite-api -n my-slack-api
    $ cd my-slack-api
    $ npm install

## Generate AWS token for deploying Lambda functions

Go to the Serverless.com [Quick start guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) and set up your Access Key ID and Secret Access Key as instructed.

## Generate API token for controlling Slack

Visit [OAuth Tokens for Testing -page](https://api.slack.com/docs/oauth-test-tokens) to generate yourself a test token for Slack.

## Add Slack API token and domain to your Serverless environment

Edit your `serverless.yml` and replace the following variables with your data: `slack_domain`, `slack_token`. There is a `# NOTE` comment above the variables so that you can find them easier.

## Deploy API to AWS Lambda

    $ serverless deploy

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
