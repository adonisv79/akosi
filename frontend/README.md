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

## Data Storages

* sessionStorage - use these whenever possible and you do not know until when data should stay alive. This is because it auto cleans up after a user closes the tab or browser.
* localStorage - use this for non-risky data like user's language or UI theme preferences.