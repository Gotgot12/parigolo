import express from "express";
import bodyParser from "body-parser";
import Person from './models/person';
import Bet from './models/bet';
import Choice from './models/choice';
import Room from './models/room';
import { sequelize } from './database';
import cors from 'cors';
import PersonRoom from "./models/person-room";
import ChoicePerson from "./models/choice-person";

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Define relationships
Room.belongsToMany(Person, { through: PersonRoom });
Person.belongsToMany(Room, { through: PersonRoom });

Room.hasMany(Bet);
Bet.belongsTo(Room);

Bet.hasMany(Choice);
Choice.belongsTo(Bet);

Choice.belongsToMany(Person, { through: ChoicePerson });
Person.belongsToMany(Choice, { through: ChoicePerson });

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

app.get('/person', async (req, res) => {
  try {
    const person = await Person.findOne({where : {pseudo : req.query.pseudo}});
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.post('/signup', async (req, res) => {
  try {
    const personSearch = await Person.findOne({ where: { pseudo : req.body.pseudo }})
    if (personSearch === null) {
      req.body.nbPoints = 0
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
app.get('/rooms/:personId', async (req, res) => {
  try {
    const { personId } = req.params;
    const personRoom = await PersonRoom.findAll({where: {PersonId: personId}})

    const roomsByPerson: number[] = []
    personRoom.forEach((persRoom) => {
      roomsByPerson.push(persRoom.RoomId)
    })

    const rooms = await Room.findAll({where: {id: roomsByPerson}})
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/room/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({where: {id: roomId}})
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})


app.post('/rooms', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Person room
app.get('/person-room', async (req, res) => {
  try {
    const personRoom = await PersonRoom.findAll()
    res.json(personRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.post('/person-room', async (req, res) => {
  try {
    const newPersonRoom = await PersonRoom.create(req.body);
    res.json(newPersonRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

// Start the server
const port = process.env.PORT ?? 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));