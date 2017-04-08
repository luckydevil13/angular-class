export interface Course {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly duration: number;
  readonly authors: string[];
  readonly topRated: boolean;
  readonly id?: number;
}
