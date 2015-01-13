A seed angular application with a login and component demo pages, integrated with a SQLite database using SequelizeJS

To get this up and running do the following:
```
npm install
bower install
```
then create the following empty folders:
`/server/sequelize/sqlite-db/` and `/server/sequelize/migrations/`

then copy `/server/config/local.env.sample.js` and rename to `/server/config/local.env.js`

then `grunt` to check it's ok

then `grunt serve`
