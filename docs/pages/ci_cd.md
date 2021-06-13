# CI/CD

We chose to use Github Action to automatically build and deploy the dev and main branches on test servers.

## Theoretical setup

To set up this workflow you must already have a runner. 

### Add runners

1. For that you have to go to [the repository parameters](https://github.com/PseuToPy/PseuToPy-front/settings/actions/runners)
2. You must click on "Add runner".
3. Choose the OS and architecture of the runner you want to configure. 
4. Copy/paste the marked commands on the runner and it will work 😋

### Workflow setup

You have to create a .yml config file in the `.github/workflows/` folder.  
You can find the syntax of this file [here](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

## Current setup

For the moment, the runners are hosted on Bastien Marais' server. In case of problems with a machine, just send a message and it will be fixed.  
Discord: Bastoune_#6560 / Email: marais.bas@gmail.com 

`PseuToPy-front/.github/workflows/node.js.yml`
```yml
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

# This part indicates that the workflow will be triggered on each push or pull request present on main or dev
on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]

# Here we have a list of jobs, we could have made one that does everything and it would save 20s however it would be less readable.
jobs:

  # The install job allows to do the `npm i` of the project
  install:
    runs-on: self-hosted
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm i

  # Once the dependencies are installed we test the project
  test:
    runs-on: self-hosted
    strategy:
      matrix:
        node-version: [14.x]
    needs: install
    steps:
      - run: npm test

  # If the installation and the tests pass we make the build
  build:
    runs-on: self-hosted
    strategy:
      matrix:
        node-version: [14.x]
    needs: [install, test]
    steps:
      - run: npm run-script build --prod

  # If all previous jobs pass, we deploy the build on the apache server
  deploy:
    runs-on: self-hosted
    needs: [install, test, build]
    steps:
      - run: .github/workflows/deploy_front.sh
```

`PseuToPy-front/.github/workflows/deploy_front.sh` used in the deploy job
```sh
# Removes files from the apache server
rm -rf /var/www/html/*  
# Copy the contents of the build folder to the apache server
cp -rf build/* /var/www/html/
# Add the .htaccess file on the apache server
cp .github/workflows/.htaccess /var/www/html/ -f
```

The `PseuToPy-front/.github/workflows/.htaccess` used in the `deploy_front.sh` allows to activate the url rewriting and to redirect everything to the index.html. This is mandatory since react is a one-page site.