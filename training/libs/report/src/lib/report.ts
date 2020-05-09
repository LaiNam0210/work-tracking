import { format } from 'date-fns';
import { generateId } from './utils/utils';

export class Report {
  id: string;
  timeCreated: string;

  constructor(
    public jobYesterday: string,
    public problems: string,
    public jobToday: string
  ) {
    this.id = generateId();
    const now = Date.now();
    this.timeCreated = format(now, 'Pp');
  }
}
