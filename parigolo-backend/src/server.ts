import express from "express";
import bodyParser from "body-parser";
import Person from './models/person';
import Bet from './models/bet';
import Choice from './models/choice';
import Room from './models/room';
import { sequelize } from './database';
import cors from 'cors';

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Define relationships
Room.hasMany(Person);
Person.belongsTo(Room);

Room.hasMany(Bet);
Bet.belongsTo(Room);

Bet.hasMany(Choice);
Choice.belongsTo(Bet);

Choice.belongsToMany(Person, { through: 'ChoicePerson' });
Person.belongsToMany(Choice, { through: 'ChoicePerson' });

sequelize.sync();

// Person endpoints
app.get('/persons', async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const personSearch = await Person.findOne({ where: { pseudo : req.body.pseudo }})
    if (personSearch === null) {
      const newPerson = await Person.create(req.body);
      console.log(newPerson)
      res.json(newPerson);
    } else {
      res.status(500).json({error: 'pseudo already existed'})
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/login', async (req, res) => {
  const personSearch = await Person.findOne({ where: { pseudo : req.body.pseudo }})
  if (personSearch !== null) {
    if (personSearch.getDataValue('password') === req.body.password) {
      res.send('login ok')
    } else {
      res.status(500).json({error: 'no match'})
    }
  } else {
      res.status(500).json({error: 'no found'})
  }
})

// Bet endpoints
app.get('/bets', async (req, res) => {
  try {
    const bets = await Bet.findAll();
    res.json(bets);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/bets', async (req, res) => {
  try {
    const newBet = await Bet.create(req.body);
    res.json(newBet);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Choice endpoints
app.get('/choices', async (req, res) => {
  try {
    const choices = await Choice.findAll();
    res.json(choices);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/choices', async (req, res) => {
  try {
    const newChoice = await Choice.create(req.body);
    res.json(newChoice);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Room endpoints
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/rooms', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Start the server
const port = process.env.PORT ?? 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));