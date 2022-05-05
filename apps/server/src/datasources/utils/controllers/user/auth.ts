import * as bcrypt from 'bcrypt';

export function compareHash(str: string, hashStr: string) {
  const isCompare = bcrypt.compareSync(str, hashStr);
  return isCompare;
}

export function generateHash(str: string, saltRounds: 10) {
  const hashStr = bcrypt.hashSync(str, saltRounds);
  return hashStr;
}
