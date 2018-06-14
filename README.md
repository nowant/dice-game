# DiceGame

This project was created with Angular 6 + Angular CLI 6.

## Installing

```
npm install -g @angular/cli
git clone https://github.com/nowant/dice-game.git dice-game
cd dice-game
npm install
```

## Game architecture

The game is designed with simplified Domain Driven Design

`components` - output the game and сombine the game mechanics with presenatation and business logic

`services` - produce the game business logic

`models` - keep the main game states, produce business events

`dto` - keep the data that is transferred between components

## Demo / Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

