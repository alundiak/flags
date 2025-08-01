# My Flags

A place where I can simply COPY flag emoji.

Using Desktop browsers on MacOS I frequently use emojis of flags for visual representation (in Excel files, in Google Maps, in images while editing, in blog posts, etc.), and frequently I an actual emoji of country flags. NOT always keyboard is available like on iOS. Plus I sometimes need a bigger size of flag emoji to see it better.

I used to use MacOS note, where I put most frequently used flags emojis from iOS keyboard, and increased by size those which most used. Instant sync between devices is great.

But now, having this small app/page, I can always have a handy way on my Desktop to copy emoji and paste elsewhere.

![img](./eu.svg)

## Data

As of Oct-2024 The [UN](https://en.wikipedia.org/wiki/United_Nations) recognizes `195` countries (`193` member states and `2` observer states).

Public API https://restcountries.com/v3.1/all returns `250` records:

- with different groups: Sovereign countries, Dependencies and Territories, Disputed or partially recognized region, Autonomous regions, Smaller entities.
- designated by 5 regions.
- with field are `unMember`: true/false.
- there are also `independent`: true/false.

## Features

- Search/Filtering by name of country.

## TechStack

- Using API call is OK for now - https://restcountries.com/v3.1/all. But maybe I will cache results into JSON file.
- React/Typescript setup via `npm create vite@latest my-react-app -- --template react-swc-ts`
- Added Bootstrap CSS and Reactstrap.

## TODO

- API No emoji-flags for England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 and [Scotland](https://en.wikipedia.org/wiki/Scotland) 🏴󠁧󠁢󠁳󠁣󠁴󠁿 but such emojis exists on https://emojipedia.org

## TODO (maybe)

- Fixup Mobile view, although not really needed.
- Introduce regions.
- Maybe something else, like map so that easier to locate visually.
- Maybe Small Countries dedicated section/region.
- Maybe some sections of flags those which "misleading", eg. Poland and Monaco vs. Indonesia, Singapore and Poland, etc.
  - Maybe section of flags of different cities, like Polish Katowice flag is very similar to flag of Ukraine.
- Maybe dedicated section for flags of countries which are NOT yet officially accepted by all other countries. Like flag of Crimea...
- Maybe section for flags of republics, like in russia. FamilyTreeDNA does it somehow, so I could :)

## Local run

Once:

```sh
npm install
```

When needed:

```sh
npm run dev
npm run lint
npm run build
npm run preview
npm run deploy
```

## Credits

Inspired by:

- flags themselves :) since childhood.
- https://en.wikipedia.org/wiki/Flags_of_Europe
- https://en.wikipedia.org/wiki/Flags_of_Asia
- https://emojipedia.org/flags#grid
- https://emojidb.org/up-down-green-red-arrow-emojis
- https://apps.timwhitlock.info/emoji/tables/iso3166

## New knowledge I got

As I always do, while doing something simple I keep learning basics. 2024, and a few new things arrived in built-in JavaScript, CSS and HTML.

- CSS nesting, since at least Dec-2023 is already known, and I keep using. In favor of CSS preprocessor.
- [`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) can be now easily used in sort-like functions when objects field values are `string` values. No need to use `<=`, `>=`, `==`.
- Handling ESLINT v9 after migration.
- The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
  - It happens when `"type": "module"` removed from `package.json`.
