import * as bcrypt from 'bcrypt';

/**
 * It takes a string and a number as arguments, and returns a hash string
 * @param {string} str - The string you want to hash
 * @param saltRounds - The number of salt rounds to use. The higher the number, the more secure the
 * hash, but the longer it takes to generate.
 * @returns A string
 */
export default async function generateHash(str: string, saltRounds: 10) {
  try {
    // TODO: missing await
    const hashStr = bcrypt.hashSync(str, saltRounds);
    return hashStr;
  } catch (error) {
    console.log(error);
  }
}
