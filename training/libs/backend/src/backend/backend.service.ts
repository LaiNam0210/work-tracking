import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '@training/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  loadReports(): Observable<Report[]> {
    const url = `/api/report`;
    return this.http.get<Report[]>(url);
  }

  loadReportByIndex(index: number) {
    const url = `/api/report/${index}`;
    return this.http.get<Report>(url);
  }

  addReport(newReport: Report) {
    const url = `/api/add_report`;
    return this.http.post<Report>(url, newReport);
  }

  deleteReport(index: number) {
    const url = `/api/delete_report/${index}`;
    return this.http.delete<{ deletedId: string }>(url);
  }

  updateReport(
    id: string,
    newJYesterday: string,
    newProblems: string,
    newJToday: string
  ) {
    const url = `/api/update_report/`;
    const body = {
      id,
      newJYesterday,
      newProblems,
      newJToday
    };
    return this.http.put<Report>(url, body);
  }

  constructor(private http: HttpClient) {}
}
