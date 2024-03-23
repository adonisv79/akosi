# CPANEL CICD with Github Guide

This guide will explain how to setup CICD (using Github Workflows) to produce autodeploy for NodeJS projects. By this time, we assume you already have an idea about CICD and uses CPANEL provided by your host. You should already have an idea of Github workflows (https://docs.github.com/en/actions/using-workflows). Note that we also use pnpm so make sure the workflows apply them.

## Setup Inital Workflows

Github workflows looks into your github repo for the `.github/workflows` directory. If it does not exist, create it. Inside it, we can create multiple workflow configurations in the form of YAML files.

### Code Quality check workflow on PR to Master (Continous integration)

The first workflow we can add is something that runs a lint and unit test check on our repo for pull requests. create a file inside our workflow directory named `master_pr_quality_check,yaml`. Put the following configuration inside

```
name: MASTER-PR-QUALITY-CHECK
on:
  pull_request:
    branches: [master]

jobs:
  test-pull-request:
    name: Validating PR is safe
    runs-on: ubuntu-latest
    env:
      HOST_NODE_VERSION: "18"
      HOST_PNPM_VERSION: "8"
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v3

      - name: 🖥️ Applying accepted Node version
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.HOST_NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: ${{ env.HOST_PNPM_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: ${{ env.HOST_PNPM_VERSION }}

      - name: 🤝 Installing dependencies
        working-directory: ./backend
        run: pnpm i

      - name: 🧦 Checking adherence to coding standards
        working-directory: ./backend
        run: pnpm run lint

      - name: 🐞 Runing unit tests
        working-directory: ./backend
        run: pnpm run test

      - name: 🏗️ Testing if project can be built
        working-directory: ./backend
        run: pnpm run build
```

### Automated deployment upon merge (Continous Delivery)

The next workflow we need is automating deployments. This will trigger when a PR is merged into our master branch. Create a new workflow configuration named `master_merge_deployment.yaml`. Add the following code inside

```name: 🚀 MASTER-MERGE-DEPLOYMENT
on:
  push:
    branches: [master]

jobs:
  web-deploy:
    name: Deploy to Shared Host
    runs-on: ubuntu-latest
    env:
      HOST_NODE_VERSION: "18"
      HOST_PNPM_VERSION: "8"
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v3

      - name: 🖥️ Applying accepted Node version
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.HOST_NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: ${{ env.HOST_PNPM_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: ${{ env.HOST_PNPM_VERSION }}

      - name: 🤝 Installing dependencies
        working-directory: ./backend
        run: pnpm i

      - name: 🧦 Checking adherence to coding standards
        working-directory: ./backend
        run: pnpm run lint

      - name: 🐞 Runing unit tests
        working-directory: ./backend
        run: pnpm run test

      - name: 🏗️ Exporting distributable files to output directory
        working-directory: ./backend
        run: pnpm run build

```

Notice that the 2 has minimal difference. We will modify it in a while to make it deploy. For now, what this does is go thru the same test as the PR steps. There are some steps we need to apply in our repository however before we apply the necessary changes. This is adding the "Secrets" or "Variables" for our SSH access to CPANEL. for now commit the changes into your repo and try creating a new branch and PR to see if everything works. if not adjust accordingly.

![Failed workflow1](/docs/images/guides//GITHUB_workflow_failed.png "Failed workflow")

You can see what caused the issue further by clicking more on the details. Fix any build issue before proceeding. (Do not forget to update this guide to help future "you-sir"). Once your validations have passed, it should show the folling.

![Success workflow1](/docs/images/guides//GITHUB_workflow_passed.png "Succeess workflow")

## cPanel NodeJS App and FTP accounts.

Our current hosting account allows NodeJS. So make sure to check yours if they allow it. You will have to specify to it on which directory the distriputed files would exist. Then setup FTP so that our CICD knows where to deploy upon merge to master. 

### Create a cPanel NodeJS App

First we must create the nodejs app. (Skip this step if you already have a nodejs app in cPanel and you already know where its working directory is). 

![CPanel new app](/docs/images/guides//CPANEL_new_nodeapp.png "CPanel new app")

once it is created, you should be able to go to the domain/sub-domain you assigned it to

![CPanel new app created](/docs/images/guides//CPANEL_nodejsapp_created.png "CPanel new app created")

Using the cPanel file explorer, you will find that the nodejs directory we are runing in has the similar basic structure in dist that we use.

![CPanel new app folder](/docs/images/guides//CPANEL_new_nodejs_files.png "CPanel new app folder")

This is where we want our FTP account to point into and we will clear this out and update whenever we automatically deploy.

### Create an FTP account

The next step is we need to have an FTP account so we can have access to our file NodeJS App's folder. In cPanel, fo to FTP Accounts section and create one. remember the credentials as this will be used later in configuring github

![CPanel new ftp account](/docs/images/guides//CPANEL_ftp_account_create.png "CPanel new ftp account")

Once you have created your ftp account, you should be able to access it using ftp tools such as Filezilla

![Filezilla connection test](/docs/images/guides//FILEZILLA_ftp_test.png "Filezilla connection test")

![Filezilla connected](/docs/images/guides//FILEZILLA_ftp_success.png "Filezilla connected")



## Setting up: Actions secrets and variables

Before we can make the automated deployment work, we need to setup our repository to store our secret and other necessary configurations. Variables are things that are ok to be visible to users who manage the configurations. Secrets are mostly for credentials like passwords and API keys.

In GitHub, go to Settings, on the side, select `Secrets and variables` and in the dropdown, select `Actions`

![GITHUB Secrets and Variables](/docs/images/guides//GITHUB_secrets_and_vars.png "GITHUB Secrets and Variables")

We need to create the following.

* Variables
  * BACKEND_BUILD_DIR - The directory where the distributable files will be stored. This is technically our DIST folder where you add every file you want to be sent to the host. Since we have a monorepo and this is for `backend`, we name it with the `BACKEND_` prefix. The value for this would normaly be found in your CICD build output. ex: `/home/runner/work/akosi/akosi/backend/dist/`
  * FTP_HOST - The FTP Host URL where we will send the files. Either this is provided in your CPanel or you have to contact host as to what it is. in our case it can be as simple as `ftp.yourdomain.com`
  * FTP_HOST_DIR - The target directory in the FTP host where the files will exist. we must set this to '/'
* Secrets
  * FTP_USERNAME - Your FTP User account name
  * FTP_PASSWORD - Your FTP Password

Variables can be created using the Variables Tab. Click `New repository variable`, give it a name and value. Secrets are the same. the only difference is secrets are encrypted once you submit and you cannot retrieve the values later.

## Auto deploy via FTP

With everything setup, we must now update the deployment script. Open the `master_merge_deployment.yaml` file and add the following new steps

```
      - name: ⏰ Create restart.txt file
        run: echo "This file triggers cPanel nodeJS to restart" > ./backend/dist/tmp/restart.txt

      - name: 📂 Uploading distributable files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          dangerous-clean-slate: true
          server: ${{ vars.FTP_HOST }}
          server-dir: ${{ vars.FTP_HOST_DIR }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ${{ vars.BACKEND_BUILD_DIR }}

```

this should automatically deploy your dist files to your host. Merge this into your master branch via PR and see if it runs successfully. You should be able to see that the commit status in your master branch was a success

you can also check your nodejs folder in cPanel if the distributable files were uploaded.

![cPanel upload success](/docs/images/guides//CPANEL_ftp_success.png "cPanel upload success")

# references

* Github Actions/Workflows guide -  https://docs.github.com/en/actions/using-workflows
* Github Actions for FTP - https://github.com/marketplace/actions/ftp-deploy
* PNPM Github Actions -  https://pnpm.io/continuous-integration#github-actions
