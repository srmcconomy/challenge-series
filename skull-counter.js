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

module.exports = (app, io) => {
  app.get('/skull-counter/:name', (req, res) => {
    const name = req.params.name;
    console.log(`GET ${name}`)
  });
}
