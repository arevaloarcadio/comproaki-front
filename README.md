# An Important Update ❗
> This project will not be updated ⚠️ anymore in favour of the newer [Cross Vue](https://github.com/srav001/cross-vue) ❤️ template which has all the features of this template, while offering more easier dev experience 😍 and support for [Tauri](https://https://tauri.app) 🤩.

## Check Out the New Template ❤️  https://github.com/srav001/cross-vue

#

 This is a starter template aimed to be used at apps that will go into production release. It has eslint, prettier and ionic added to it, so that not only does linting and formatting like most projects but also can be made a mobile app when needed with capacitor. It is opinionated to an extend, but at the same time easy to customize since it has minimal config for all packages.  


### Why UnoCSS and bootstrap grid 🤔 ?
UnoCSS is awesome, since it's on-demand ( it offers low bundle size ) while providing access to multiple css utilty class from the likes of tailwind. Bootstrap's grid is included simply because I think bootstrap's grid is most superior in terms of functionality compared to rest like bulma while being easy to use ( Can be removed by deleting file in `src/assets/bootstrap-grid.min.css`). 


## Why use this template ?

-   You might don't want to go through the hassle of setting up linter, formatter, router, store etc and still want the [latest vue](https://twitter.com/youyuxi/status/1464058813649088516?lang=en) has to offer ( All of it is setup ).
-   If you use the ionic components as your base for components, in future you can build your web app as an android or ios app with capacitor ( I feel it is better for mobile than other vue component libraries).
-   You can remove - all capacitor dependencies from `package.json` and `capacitor.config.js` to get all other features except build a mobile app.
-   Eslint for linting and prettier for formatting files ( and yes both work combined without issues ).
-   Husky is setup and is being used for commit linting.
-   Vite is used for superior dev experience.

###

-   ` Examples are included for the most common ones and rest is left for developer decision.`

## Custom Scripts:

```
pnpm project-setup: 'Runs pnpm install and setups up husky for commit linting'
pnpm lint: 'Runs eslint in src directory and fixes all autofixeable errors'
pnpm format: 'Runs src directory through prettier and formats all files'
```
