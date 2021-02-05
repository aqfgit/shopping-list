# Shopping list app

Simple shopping list app created with React Native. It was made as a recruitment task to demonstrate my Typescript and React Native skills. Prior to making this project I had little to no knwoladge of those technologies. Finishing this app, hovever, gave me a better insight into how to use those tools and what makes them powerful.

Created for Android.

## Technologies used

- React Native
- Typescript

## Launch

Clone the repo:

```sh
$ git clone https://github.com/aqfgit/shopping-list.git
$ cd shopping-list
```

To run the app in development mode:

```sh
$ npm install
$ npm start
```

Open it in the Expo app on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the --reset-cache flag to the start script:

```sh
$ npm start -- --reset-cache
```

You can also run it on the Android emulator:

```sh
$ npm run android
```

Like npm start, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://reactnative.dev/docs/environment-setup) for detailed setup).

## Features

### ShoppingList screen:

- List of all the items added by the user which are saved to and loaded from the AsyncStorage
- Button for adding a new list item
- Button for deleting all the list items
- Tapping the checkbox next to the item's name marks the item as complete
- Holding your finger on the item shows the delete icon

  ![s1](https://user-images.githubusercontent.com/17334860/107026042-7b8ef600-67aa-11eb-920d-70567b548b04.jpg)

### AddItem screen:

- Input for typing the name of the item which is added to the list after pressing the button (cannot add an empty string)
- Autocomplete feature which loads up previously added items to pick from, according to what the user types

  ![s2](https://user-images.githubusercontent.com/17334860/107026116-8e092f80-67aa-11eb-80d6-d066eba4f0a3.png)
