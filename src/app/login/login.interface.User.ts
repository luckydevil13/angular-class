export interface User {
  readonly id?: number;
  readonly login: string;
  readonly password: string;
  readonly fakeToken?: string;
  readonly name: object;
}
