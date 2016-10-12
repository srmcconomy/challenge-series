// @flow

export type CreateNewEnemyAction = {
  type: 'create-new-enemy',
  name: string,
};

export default function createNewEnemy(name: string): CreateNewEnemyAction {
  return {
    type: 'create-new-enemy',
    name,
  };
}
