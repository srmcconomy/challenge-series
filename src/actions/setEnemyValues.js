export type SetEnemyValuesAction = {
  type: 'set-enemy-values',
  enemy: string,
  values: Array<number>,
};

export default function setEnemyValues(
  enemy: string,
  values: Array<number>
): SetEnemyValuesAction {
  return {
    type: 'set-enemy-values',
    enemy,
    values,
  };
}
