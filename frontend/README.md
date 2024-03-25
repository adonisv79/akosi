# AKOSI Frontend

This serves as the official documentation for the AKOSI UI/UX

## Folder structure

* _components - This folder stores all common reusable components of the app. inside are 2 major groupings
  * akosi - akosi project custom components. Use these whenever possible to adhere to UI/UX standards and avoid rewrites of existing implementations
  * core - These stores barebone reusable components that have very generic implementations. most akosi components will implement these in its component. If for example you have used the HTMLButton with 3 different implementations but used all over the hundreds of components, its best to create an akosi component (ex: MySpecialButton) that returns an HTMLButton with all the configurations fixed.
* api - This folder store all your api related request queries
* locales - this folder contains the translation/localization files
* pages - this folder contains main components that act as route landing pages
* stories - this folder contains all the stories for storybook.


## Running the project

Install dependencies by running the following
```
pnpm install
```

Run the frontend service (VITE)
```
pnpm dev
```

Run storybook (if you want to test and feel the components)
```
pnpm storybook
```

## Syncing with the API

### Types

This project utilizes OpenAPI-Typescript module to sync data types with the backend via Swagger. To generate/sync the latest type updates (if any), first make sure the backend server is runing in the local machine. Then run the following

```
pnpm generate:types
```

This will run the package.json script to generate or update `api.types.ts`


## Data Storages

* sessionStorage - use these whenever possible and you do not know until when data should stay alive. This is because it auto cleans up after a user closes the tab or browser.
* localStorage - use this for non-risky data like user's language or UI theme preferences.


# Docker

We use docker for this nodejs project. We need to precompile the code to a distributable before packaging a docker image. Run `pnpm build` for production environemnt or `pnpm build-dev` for development.


Build a new image by running `pnpm docker:build` ( use `pnpm docker:build-win` if you are on windows). make sure to upgrade the package version when building a new image for deployment.

Once the image is created, we can test run it locally using the following. (Do not forget to update the tag `vX.Y.Z` to the right version). Make sure to also set the API_URL to connect to the correct akosi-api IP. if this is a container hosted in your local docker, the IP will be found when you inspect the container.

```
docker run -d -p 3000:80 --name akosi-app adonisv79/akosi-app:X.Y.Z
```

To publish, run `docker:publish` or `docker:publish-win` for windows