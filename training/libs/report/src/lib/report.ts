export class Report {
  id: string;
  jobYesterday: string;
  problems: string;
  jobToday: string;
  timeCreated: string;

  constructor(id: string, jobYesterday: string, problems: string, jobToday: string) {
    this.id = id;
    this.jobYesterday = jobYesterday;
    this.problems = problems;
    this.jobToday = jobToday;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.timeCreated = date + ' ' + time;
  }
}
