import { v4 as uuid } from 'uuid';

export abstract class Dice {
  // function and parameter name semantics:
  // roll d20 or roll d6 for example
  static roll(d: number): number {
    return uuid().replace(/\D/g, '') % d;
  }
}
