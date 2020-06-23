import { generateId } from './utils/utils';

export class Report {
  id: string;
  timeCreated: number;

  constructor(
    public jobYesterday: string,
    public problems: string,
    public jobToday: string
  ) {
    this.id = generateId();
    this.timeCreated = Date.now();
  }
}
