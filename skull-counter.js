const data = {}

const skulls = {
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
  "Spirit Temple": 5,
  "all": 100
}

module.exports = (app, io) => {
  const nsp = io.of('/skull-counter')

  nsp.on('connection', socket => {
    let name;
    socket.on('join', n => {
      console.log(`[skull-counter] [${n}] socket join`)
      name = n;
      socket.join(n);
    });

    socket.on('plus', area => {
      console.log(`[skull-counter] [${name}] socket plus ${area}`)
      if (data[name].list[area] === skulls[area]) return;
      data[name].list[area]++;
      console.log(data[name].list[area])
      if (area !== 'all') data[name].count++;
      socket.broadcast.to(name).emit('plus', area);
    })

    socket.on('minus', area => {
      console.log(`[skull-counter] [${name}] socket minus ${area}`)
      if (data[name].list[area] === 0) return;
      data[name].list[area]--;
      if (area !== 'all') data[name].count--;
      socket.broadcast.to(name).emit('minus', area);
    })
  })

  app.get('/skull-counter/', (req, res) => {
    res.render('enemy-index');
  });

  app.get('/skull-counter/leaderboard', (req, res) => {
    console.log('[skull-counter] GET leaderboard');
    res.render('leaderboard', { leaders: Object.keys(data).map(name => ({name, score: Math.max(data[name].list.all, data[name].count) })).sort((a, b) => b.score - a.score) });
  });

  app.get('/skull-counter/:name', (req, res) => {
    const name = req.params.name;
    console.log(`[skull-counter] GET ${name}`)
    if (!data.hasOwnProperty(name)) {
      data[name] = { count: 0, list: {} };
      for (let i in skulls) {
        data[name].list[i] = 0;
      }
    }

    res.render('skull-counter', { name, data: data[name] });
  });

  app.get('/skull-counter/:name/simple', (req, res) => {
    const name = req.params.name;
    console.log(`[skull-counter] GET ${name}/simple`)
    if (!data.hasOwnProperty(name)) {
      data[name] = { count: 0, list: {} };
      for (let i in skulls) {
        data[name].list[i] = 0;
      }
    }

    res.render('skull-counter-simple', { name, count: data[name].list.all });
  });





}
