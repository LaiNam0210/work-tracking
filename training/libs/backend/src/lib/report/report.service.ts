import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '@training/report';
import { Observable } from 'rxjs';
import {
  ReportCreateRequest,
  ReportUpdateRequest
} from '@training/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  loadReports(): Observable<Report[]> {
    const loadReportsLink = `/api/report`;
    return this.http.get<Report[]>(loadReportsLink);
  }

  addReport(req: ReportCreateRequest) {
    const addReportLink = `/api/report`;
    return this.http.post<Report>(addReportLink, { req });
  }

  deleteReport(id: number) {
    const deleteReportLink = `/api/report/${id}`;
    return this.http.delete<number>(deleteReportLink);
  }

  updateReport(id: number, req: ReportUpdateRequest) {
    const updateReportLink = `/api/report/${id}`;
    return this.http.put<Report>(updateReportLink, { req });
  }

  constructor(private http: HttpClient) {}
}
