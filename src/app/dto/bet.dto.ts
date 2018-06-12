import {BetType} from '../constant';

export class Bet {
  constructor(
    public type: BetType.HIGH | BetType.LOW = null,
    public amount = 0,
    public number = 0
  ) {}
}
