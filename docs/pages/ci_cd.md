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

