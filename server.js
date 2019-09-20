const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const { syncAndSeed, findAllRestaurants, findAllRecipes, Recipe } = require('./db');
const db = require('./db');

app.get('/api/restaurants', (req, res, next)=> {
  //res.send('Restaurants Page');
  /*findAllRestaurants()
    .then( restaurants => res.send(restaurants))
    .catch(next);*/
});

app.get('/api/recipes', (req, res, next)=> {
  res.send(db.Recipe.findAll());
  /*findAllRecipes()
    .then( recipes => res.send(recipes))
    .catch(next);*/
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
console.log(findAllRecipes);
syncAndSeed()
  .then(()=> app.listen(3001, ()=> console.log('listening on port 3001')));
