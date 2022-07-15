# koerber-challenge-web-app

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/).

## Project Setup

```sh
npm install
```

### Configuration

The project needs to be configured with your Auth0 configurations in order for the authentication flow to work.

To do this, first copy `auth_configs_example.json` into a new file in the same folder called `auth_configs.json`, and replace the values within with your own Auth0 application configurations:

```json
{
  "domainAuth0": "<YOUR AUTH0 DOMAIN>",
  "domainURLAuth0": "https://<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>",
  "domainURL": "<YOUR LOCAL DOMAIN>"
}
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
