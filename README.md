# koerber-challenge-web-app

## Pre-Requirements

### Install Node.js on your computer

[Node.js](https://nodejs.org/en/download/)

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)
You don't need it if you only wants to run the project.

## Project Setup

Run all this commands on project base directory.
If you only want to run the project and don't have dev options you can user the powershell or bash to run prodution commands

```sh
npm install
```

### Configuration

The project needs to be configured with your Auth0 configurations in order for the authentication flow to work.

To do this, first copy `auth_configs_example.json` into a new file in the same folder called `auth_configs.json`, and replace the values within with your own Auth0 application configurations:

```json
{
  "domainAuth0": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>",
  "domainURL": "<YOUR LOCAL DOMAIN>"
}
```

### Development options

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Production

#### Compile and Minify for Production

```sh
npm run build
```

#### Run Production Directory

```sh
npm install -g serve
serve -s dist -l 3000 
```

If appears that error on last step, execute the command below on powershell:
serve : File C:\...\serve.ps1 cannot be loaded because running scripts is
disabled on this system. For more information, see about_Execution_Policies.

```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```


