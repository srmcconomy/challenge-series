import http from 'http';

import setSRL from '../actions/setSRL';

export default function (store) {
  setInterval(() => {
    http.get('http://api.speedrunslive.com/races', res => {
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        const { races } = JSON.parse(body);
        const playerList = store.getState().keyCounter;
        console.log(playerList);
        if (playerList.size > 0) {
          console.log(races);
          const currentRace = races.find(
            race => !!playerList.find(
              (_, name) => !!Object.keys(race.entrants).find(
                entrant => entrant.toLowerCase() === name.toLowerCase()
              )
            )
          );
          if (currentRace) {
            const srlPlayers = Object.keys(currentRace.entrants).filter(
              entrant => currentRace.entrants[entrant].place < 1000
            ).map(
              entrant => ({
                name: entrant,
                time: currentRace.entrants[entrant].time
              })
            );
            if (srlPlayers.length > 0) {
              store.dispatch(setSRL(srlPlayers));
            }
          }
        }
      });
    });
  }, 30000);
}
