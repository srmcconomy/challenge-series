import http from 'http';

import setSRL from '../actions/setSRL';

export default function (store) {
  setInterval(() => {
    http.get('https://api.speedrunslive.com/races', res => {
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        console.log(body);
        const { races } = JSON.parse(body);
        const playerList = store.getState().childChecklist.playerList;
        if (playerList.size > 0) {
          const currentRace = races.find(
            race => !!playerList.find(
              (_, code) => {
                if (!store.getState().players.has(code)) {
                  return false;
                }
                const name = store.getState().players.get(code).name;
                return !!Object.keys(race.entrants).find(
                  entrant => entrant.toLowerCase() === name.toLowerCase()
                );
              }
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
              store.dispatch(setSRL(srlPlayers, currentRace.time));
            }
          }
        }
      });
    });
  }, 30000);
}
