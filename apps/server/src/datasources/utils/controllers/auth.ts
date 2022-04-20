import * as bcrypt from 'bcrypt';

/**
 * It takes a string and a hash string, and returns a boolean value
 * @param {string} str - The string you want to compare
 * @param {string} hashStr - The hashed string that you want to compare with.
 * @returns A boolean value
 */
export function compareHash(str: string, hashStr: string) {
  const isCompare = bcrypt.compareSync(str, hashStr);
  return isCompare;
}

/**
 * It takes a string and a number as arguments, and returns a hash string
 * @param {string} str - The string you want to hash
 * @param saltRounds - The number of salt rounds to use. The higher the number, the more secure the
 * hash, but the longer it takes to generate.
 * @returns A string
 */
export function generateHash(str: string, saltRounds: 10) {
  const hashStr = bcrypt.hashSync(str, saltRounds);
  return hashStr;
}
