type SRLPlayers = Array<{ name: string, time: number }>;

export type SetSRLAction = {
  type: 'set-srl',
  srlPlayers: SRLPlayers
};

export default function setSRL(srlPlayers: SRLPlayers, time: number) {
  return {
    type: 'set-srl',
    srlPlayers,
    time,
  };
}
