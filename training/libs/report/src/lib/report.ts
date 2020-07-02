export class Report {
  constructor(
    public id: number,
    public jobYesterday: string,
    public problems: string,
    public jobToday: string,
    public timeCreated: number
  ) {}
}
