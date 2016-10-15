type SRLPlayers = Array<{ name: string, time: number }>;

export type SetSRLAction = {
  type: 'set-srl',
  srlPlayers: SRLPlayers
};

export default function setSRL(srlPlayers: SRLPlayers) {
  return {
    type: 'set-srl',
    srlPlayers,
  };
}
