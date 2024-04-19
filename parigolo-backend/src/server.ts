import express from "express";
import bodyParser from "body-parser";
import Person from "./models/person";
import Bet from "./models/bet";
import Choice from "./models/choice";
import Room from "./models/room";
import { sequelize } from "./database";
import cors from "cors";
import PersonRoom from "./models/person-room";
import ChoicePerson from "./models/choice-person";
import Leaderboard from "./models/leaderboard";

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

Room.hasMany(Leaderboard)
Leaderboard.belongsTo(Room)

Person.hasMany(Leaderboard)
Leaderboard.belongsTo(Person)

sequelize.sync({ alter: true });

// Person endpoints
app.get("/persons", async (_req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/person/:pseudo", async (req, res) => {
  try {
    const { pseudo } = req.params;
    const person = await Person.findOne({ where: { pseudo: pseudo } })
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: req.body });
  }
})

app.post("/signup", async (req, res) => {
  try {
    const personSearch = await Person.findOne({ where: { pseudo: req.body.pseudo } })
    if (personSearch === null) {
      const newPerson = await Person.create(req.body);
      console.log(newPerson)
      res.json(newPerson);
    } else {
      res.status(500).json({ error: "pseudo already existed" })
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/login", async (req, res) => {
  const personSearch = await Person.findOne({ where: { pseudo: req.body.pseudo } })
  if (personSearch !== null) {
    if (personSearch.getDataValue("password") === req.body.password) {
      res.json(personSearch);
    } else {
      res.status(500).json({ error: "no match" })
    }
  } else {
    res.status(500).json({ error: "no found" })
  }
})


// Bet endpoints
app.get("/bets", async (_req, res) => {
  try {
    const bets = await Bet.findAll();
    res.json(bets);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/bets/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const bets = await Bet.findAll({ where: { RoomId: roomId } })
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

app.put(`/bets/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBet = await Bet.update(req.body, { where: { id: id } });
    res.json(updatedBet);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Choice endpoints
app.get("/choices", async (_req, res) => {
  try {
    const choices = await Choice.findAll();
    res.json(choices);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Room endpoints
app.get("/choices/:personId", async (req, res) => {
  try {
    const { personId } = req.params;
    const choicePerson = await ChoicePerson.findAll({ where: { PersonId: personId } })

    const choicesByPerson: number[] = []
    choicePerson.forEach((choicePers) => {
      choicesByPerson.push(choicePers.ChoiceId)
    })

    const choices = await Choice.findAll({ where: { id: choicesByPerson } })
    res.json(choices);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get(`/choices/bet/:betId`, async (req, res) => {
  try {
    const { betId } = req.params;
    const choicesBet = await Choice.findAll({ where: { BetId: betId } })
    res.json(choicesBet);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.post("/choices", async (req, res) => {
  try {
    const newChoice = await Choice.create(req.body);
    res.json(newChoice);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.put(`/choices/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedChoice = await Choice.update(req.body, { where: { id: id } });
    res.json(updatedChoice);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/choice-person/:personId', async (req, res) => {
  try {
    const { personId } = req.params;

    const choicePerson = await ChoicePerson.findAll({ where: { PersonId: personId } });
    res.json(choicePerson);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.get('/choice-person/choice/:choiceId', async (req, res) => {
  try {
    const { choiceId } = req.params;

    const choicePerson = await ChoicePerson.findOne({ where: { ChoiceId: choiceId } });
    res.json(choicePerson);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.post('/choice-person', async (req, res) => {
  try {
    const newPersonRoom = await ChoicePerson.create(req.body);
    res.json(newPersonRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

// Room endpoints
app.get("/rooms/:personId", async (req, res) => {
  try {
    const { personId } = req.params;
    const personRoom = await PersonRoom.findAll({ where: { PersonId: personId } })

    const roomsByPerson: number[] = []
    personRoom.forEach((persRoom) => {
      roomsByPerson.push(persRoom.RoomId)
    })

    const rooms = await Room.findAll({ where: { id: roomsByPerson } })
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/room/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ where: { id: roomId } })
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})


app.post("/rooms", async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ where: { id: req.params.id } });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    if (room.ownerId !== req.body.ownerId) {
      return res.status(403).json({ error: 'Only the owner can delete the room' });
    }
    await Room.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Person room
app.get("/person-room", async (_req, res) => {
  try {
    const personRoom = await PersonRoom.findAll()
    res.json(personRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.post("/person-room", async (req, res) => {
  try {
    const newPersonRoom = await PersonRoom.create(req.body);
    res.json(newPersonRoom);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

app.get("/leaderboards/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const leaderboards = await Leaderboard.findAll({ where: { RoomId: roomId } })
    console.log(leaderboards)
    const temp_leaderboards: TempLeaderboard[] = []
    for (const leaderboard of leaderboards) {
      const person = await Person.findOne({ where: { id: leaderboard.id } })
      let personPseudo = "";
      if (person != null) {
        personPseudo = person.pseudo
      }
      temp_leaderboards.push({ id: leaderboard.id, personPseudo: personPseudo, score: leaderboard.score, RoomId: parseInt(roomId), PersonId: person!.id })
    }
    res.json(temp_leaderboards);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/leaderboards", async (req, res) => {
  try {
    const newLeaderboard = await Leaderboard.create(req.body);
    res.json(newLeaderboard);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.put("/leaderboards/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedLeaderboard = await Leaderboard.update(req.body, { where: { id: id } });
    res.json(updatedLeaderboard);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

type TempLeaderboard = {
  id: number,
  personPseudo: string,
  score: number,
  PersonId: number,
  RoomId: number
}

// Start the server
const port = process.env.PORT ?? 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));