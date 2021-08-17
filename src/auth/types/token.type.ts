import { Token as TokenE } from './token.enum';

export type Token = {
  login: string;
  name: string;
  type: TokenE;
};
