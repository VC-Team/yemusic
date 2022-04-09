import * as bcrypt from 'bcrypt';

/**
 * It takes a string and a hash string, and returns a boolean value
 * @param {string} str - The string you want to compare
 * @param {string} hashStr - The hashed string that you want to compare with.
 * @returns A boolean value
 */
export default async function compareHash(str: string, hashStr: string) {
  try {
    const isCompare = bcrypt.compareSync(str, hashStr);
    return isCompare;
  } catch (error) {
    console.log(error);
  }
}
