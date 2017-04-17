import {Author} from './authors/author.interface';

export interface Course {
  readonly title: string;
  readonly description: string;
  readonly duration: number;
  readonly authors: Author[];
  readonly topRated: boolean;
  readonly id?: number;
  /* tslint:disable readonly-interface */
  date: Date;
}
