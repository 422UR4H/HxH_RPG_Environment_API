import { v4 as uuid } from 'uuid';

export abstract class Dice {
  // function and parameter name semantics:
  // roll d20 or roll d6 for example
  static roll(d: number): number {
    const hash = uuid();
    const alphaNum = hash.replace(/\D/g, '') as string;
    const numbers = Number(alphaNum.substring(11));

    const pseudoRandom = Math.ceil(Math.random() * 20) || 1;

    const result = Math.round(numbers / pseudoRandom);
    return (result % d) + 1;
  }
}
