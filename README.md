# Kicktipp


An Express / React / Socket.io application to create a community around a football championship (European / World Cup).

Features:
* Schedule and Results
* Betting for games and champions
* Ranking / Stat
* Chat
* News
* Videos

THIS IS A PRIVATE FUN PROJECT AND THE BUILDING OF THE FRONTEND BUNDLE IS ACTUALLY BROKEN...

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Data infrastructure

* The main part of the data (teams, games, users, etc.) is retained in a **MySQL** database. 
A dump of the structure is inside kicktipp.sql. You must enter the credentials under /api/lib/connection.js.
* The other part (chat messages) are handled in a **mongodb** database. You must enter the credentials under /api/lib/connectMongo.js.

```
Give examples
```

### Installing

Some steps to get a development env running

Run install command in the root and in the app folder

```
npm install
```

Build frontend

```
npm run build:client
```

Build server

```
npm run build:server
```

Start server

```
node server.bundle.js
```

Build socket server

```
npm run build:socket_server
```

Start socket server

```
node socket_server.bundle.js
```

## Steps to get it working

#### Fill the championship data
You need to fill the mysql database tables with the right championship data:
* tournament
* rounds
* teams
* groups
* matches

#### Let users register

http(s)://hostname/register

#### Set admin users

Users with the admin flag set to 1 can add / edit / delete users and can enter the game results.

## Built With

* [Express](http://expressjs.com/) - Node.js framework to serve the application and the backend API
* [React](https://reactjs.org/) - Javascript library for the frontend
* [Redux](https://redux.js.org/) - Predictable state container for the frontend
* [socket.io](https://socket.io/) - Real-time bidirectional event-based communication - Used for the chat part
* [JWT](https://jwt.io/) - JSON Web Tokens - Used for authentication
* [Zurb Foundation](https://foundation.zurb.com/) - Responsive frontend framework for CSS and Widgets

## Authors

* **Estelle Cortet** - *Initial work* - [akleur](https://github.com/akleur)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## @todo

* Remove jquery, use fetch API / async instead
* Update react* dependencies
* Refactor build process:compress bundle more, make gulp tasks work again or move everything to webpack
* More stats / graphs
* Service workers (for caching, etc.)
* App version for automatic updates (did not work properly in the first version)
