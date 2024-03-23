# CPANEL CICD with Github Guide

This guide will explain how to setup CICD (using Github Workflows) to produce autodeploy for NodeJS projects. By this time, we assume you already have an idea about CICD and uses CPANEL provided by your host. You should already have an idea of Github workflows (https://docs.github.com/en/actions/using-workflows)

## Setup Workflows

Github workflows looks into your github repo for the `.github/workflows` directory. If it does not exist, create it. Inside it, we can create multiple workflow configurations in the form of YAML files.

### Code Quality check workflow on PR to Master (Continous integration)

The first workflow we can add is something that runs a lint and unit test check on our repo for pull requests. create a file inside our workflow directory named `master_pr_quality_check,yaml`. Put the following configuration inside

```
name: MASTER-PR-QUALITY-CHECK

on:
  pull_request:
    branches: [ master ]

jobs:
  test-pull-request:
    name: Validating PR is safe
    runs-on: ubuntu-latest
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v3

      - name: 🖥️ Applying accepted Node version
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 🤝 Installing dependencies
        working-directory: ./backend
        run: npm ci

      - name: 🧦 Checking adherence to coding standards
        working-directory: ./backend
        run: npm run lint

      - name: 🐞 Runing unit tests
        working-directory: ./backend
        run: npm run test

      - name: 🏗️ Testing if project can be built
        working-directory: ./backend
        run: npm run build
```

### Automated deployment upon merge (Continous Delivery)

The next workflow we need is automating deployments. This will trigger when a PR is merged into our master branch. Create a new workflow configuration named `master_merge_deployment.yaml`. Add the following code inside

```
name: 🚀 MASTER-MERGE-DEPLOYMENT

on:
  push:
    branches:
      - master
jobs:
  web-deploy:
    name: Deploy to Shared Host
    runs-on: ubuntu-latest
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v3

      - name: 🖥️ Applying accepted Node version
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 🤝 Installing dependencies
        run: npm ci

      - name: 🧦 Checking adherence to coding standards
        run: npm run lint

      - name: 🐞 Runing unit tests
        run: npm run test

      - name: 🏗️ Exporting distributable files to output directory
        run: npm run build

```

Notice that the 2 has minimal difference. We will modify it in a while to make it deploy. For now, what this does is go thru the same test as the PR steps. There are some steps we need to apply in our repository however before we apply the necessary changes. This is adding the "Secrets" or "Variables" for our SSH access to CPANEL. for now commit the changes into your repo and try creating a new branch and PR to see if everything works.

# references

* https://github.com/marketplace/actions/ftp-deploy