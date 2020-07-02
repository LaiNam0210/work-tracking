import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '@training/report';
import { Observable } from 'rxjs';
import { ReportCreateRequest } from '@training/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  loadReports(): Observable<Report[]> {
    const loadReportsLink = `/api/report`;
    return this.http.get<Report[]>(loadReportsLink);
  }

  loadReportById(id: number) {
    const loadReportByIdLink = `/api/report/${id}`;
    return this.http.get<Report>(loadReportByIdLink);
  }

  addReport(req: ReportCreateRequest) {
    const addReportLink = `/api/report`;
    return this.http.post<Report>(addReportLink, { req });
  }

  deleteReport(id: number) {
    const deleteReportLink = `/api/report/${id}`;
    return this.http.delete<number>(deleteReportLink);
  }

  updateReport(
    id: number,
    jobYesterday: string,
    problems: string,
    jobToday: string
  ) {
    const updateReportLink = `/api/report/${id}`;
    return this.http.put<Report>(updateReportLink, {
      jobYesterday,
      problems,
      jobToday
    });
  }

  constructor(private http: HttpClient) {}
}
