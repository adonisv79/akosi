# CPANEL CICD with Github Guide

This guide will explain how to setup CICD (using Github Workflows) to produce autodeploy for NodeJS projects. By this time, we assume you already have an idea about CICD and uses CPANEL provided by your host. You should already have an idea of Github workflows (https://docs.github.com/en/actions/using-workflows)

## Setup Workflows

Github workflows looks into your github repo for the `.github/workflows` directory. If it does not exist, create it. Inside it, we can create multiple workflow configurations in the form of YAML files.

### Code quality check workflow

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

