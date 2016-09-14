const express = require('express')
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const data = {};

const enemies = [
  'Amy',
  'Anubis',
  'Armos',
  'Baby Dodongo',
  'Door Mimic',
  'Bari',
  'Barinade',
  'Beth',
  'Beamos',
  'Big Deku Baba',
  'Big Octo',
  'Big Poe',
  'Big Skulltula',
  'Biri',
  'Blue Bubble',
  'Blue Tektite',
  'Bongo Bongo',
  'Business Scrub',
  'Club Moblin',
  'Dark Link',
  'Dead Hand',
  'Deku Baba',
  'Deku Scrub',
  'Dinolfos',
  'Dodongo',
  'Fire Keese',
  'Flare Dancer',
  'Flat',
  'Floormaster',
  'Freezard',
  'Ganon',
  'Ganondorf',
  'Gerudo Thief',
  'Gibdo',
  'Gohma',
  'Gohma Larva',
  'Gold Skulltula',
  'Green Bubble',
  'Guay',
  'Ice Keese',
  'Iron Knuckle',
  'Joelle',
  'Keese',
  'King Dodongo',
  'Leever',
  'Like Like',
  'Lizalfos',
  'Mad Scrub',
  'Meg',
  'Moblin',
  'Morpha',
  'Nabooru Knuckle',
  'Octorok',
  'Parasitic Tentacle',
  'Peahat',
  'Peahat Larva',
  'Phantom Ganon',
  'Poe',
  'Poe',
  'ReDead',
  'Red Bubble',
  'Red Tektite',
  'Shabom',
  'Sharp',
  'Shell Blade',
  'Skulltula',
  'Skullwalltula',
  'Skull Kid',
  'Spike',
  'Stalchild',
  'Stalfos',
  'Stinger',
  'Tailpasaran',
  'Torch Slug',
  'Twinrova',
  'Volvagia',
  'Wallmaster',
  'White Bubble',
  'White Wolfos',
  'Wolfos'
];

skulls = {
  "Kokiri Forest": 3,
  "Lost Woods Area": 4,
  "Hyrule Field Area": 2,
  "Market Area": 4,
  "Lon Lon Ranch": 4,
  "Kakariko Area": 8,
  "Death Mountain Area": 8,
  "Zora's Domain Area": 8,
  "Lake Hylia": 5,
  "Gerudo Valley": 4,
  "Gerudo's Fortress": 2,
  "Desert Colossus Area": 4,
  "Bottom of the Well": 3,
  "Ice Cavern": 3,
  "Deku Tree": 4,
  "Dodongo's Cavern": 5,
  "Jabu-Jabu's Belly": 4,
  "Forest Temple": 5,
  "Fire Temple": 5,
  "Water Temple": 5,
  "Shadow Temple": 5,
  "Spirit Temple": 5
}

io.on('connection', socket => {
  let name;
  socket.on('join', n => {
    console.log(`socket join ${n}`)
    name = n;
    socket.join(n);
  });

  socket.on('check', enemy => {
    console.log(`socket ${name} check ${enemy}`)
    if (data[name].list[enemy] === false) {
      data[name].count++;
    }
    data[name].list[enemy] = true;
    socket.broadcast.to(name).emit('check', enemy);
  })

  socket.on('uncheck', enemy => {
    console.log(`socket ${name} uncheck ${enemy}`)
    if (data[name].list[enemy] === true) {
      data[name].count--;
    }
    data[name].list[enemy] = false;
    socket.broadcast.to(name).emit('uncheck', enemy);
  })

});

app.get('/enemy-counter/', (req, res) => {
  res.render('enemy-index')
});

app.get('/enemy-counter/leaderboard', (req, res) => {
  const leaders = Object.keys(data).map(name => ({name, score: data[name].count})).sort((a, b) => b.score - a.score)
  res.render('leaderboard', { leaders })
})

app.get('/enemy-counter/:name', (req, res) => {
  const name = req.params.name
    console.log(`GET ${name}`)
  if (!data.hasOwnProperty(name)) {
    data[name] = { count: 0, list: {} }
    for (var e of enemies) {
      data[name].list[e] = false;
    }
  }
  res.render('enemy-counter', { name, data: data[name] })
})

server.listen(process.env.PORT || 8083)
