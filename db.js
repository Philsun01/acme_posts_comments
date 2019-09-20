const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/acme_posts');

// conn is the connection to Acme_Posts database

// Create a model within the connection,
//which defines a table in first parameter

const Restaurant = conn.define('restaurant', { // table name defined here
  // psql doesn't acknowledge capital letters unless in qoutations

  id: { // Each model will have column values declared
        // with sub parameters that need to be specified
    primaryKey: true, // Main identifies for each row
    defaultValue: Sequelize.UUIDV4, // Default randomized value inserted
    type: Sequelize.UUID // Declare value type
  },
  name:{ //declare parameters as objects
    type: Sequelize.STRING,
    unique: true, // prevent duplicate values
    allowNull: false, // makes sure user can't input NULL values
    validate: {
      notEmpty: true
      }
  }
});

const Recipe = conn.define('recipe', {
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  name:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
      }
  }
});

const Ingredient = conn.define('ingredient', {
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  name:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
      }
  }
});

Recipe.belongsTo(Restaurant);

const syncAndSeed = async ()=> { // method that creates tables and inserts values
  await conn.sync( {force: true}); // Forces overwrite each time

  const [moe, joe, larry, curly] = await Promise.all(
    [
      Restaurant.create({name: 'Moe Burger'}),
      Restaurant.create({name: 'Joe Crab'}),
      Restaurant.create({name: 'Larry Pastas'}),
      Restaurant.create({name: 'Curly Fries'})
    ]);
    console.log(moe.id);
  const [burger, chowder, spaghetti, garlic_fries] = await Promise.all(
    [
      Recipe.create({name: 'Hamburger', restaurantId: moe.id}),
      Recipe.create({name: 'Clam Chowder', restaurantId: joe.id}),
      Recipe.create({name: 'Tomatoe Spaghetti', restaurantId: larry.id}),
      Recipe.create({name: 'Garlic Fries', restaurantId: curly.id})
      //note foreign key has to be the parent model name + "Id"
    ]);

  const [beef, bun, clam, starch, penne, tomato, salt, potato, garlic] = await Promise.all(
    [
      Ingredient.create({name: 'Beef'}),
      Ingredient.create({name: 'Bun'}),
      Ingredient.create({name: 'Clam'}),
      Ingredient.create({name: 'Starch'}),
      Ingredient.create({name: 'Penne Pasta'}),
      Ingredient.create({name: 'Tomato'}),
      Ingredient.create({name: 'Salt'}),
      Ingredient.create({name: 'Potato'}),
      Ingredient.create({name: 'Garlic'})
    ]);
    // findAll, findAll w/ Where, findOne, findByPk


}

const findAllRestaurants = async() => {
  const response = await Restaurant.findAll();
  return response;
}
const findAllRecipes = async() => {
  const response = await Recipe.findAll();
  console.log(response)
  return response;
}
const findAllIngredients = async() => {
  const response = await Ingredient.findAll();
  return response;
}


syncAndSeed();
findAllRecipes();

module.exports = {
  syncAndSeed,
  models: {
    Restaurant,
    Recipe,
    Ingredient,
    findAllRestaurants,
    findAllRecipes,
    findAllIngredients

  }

}
