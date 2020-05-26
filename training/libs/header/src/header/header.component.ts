import { Component, OnInit } from '@angular/core';
import { ReportFacade } from '@training/store/report';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private reportFacade: ReportFacade) {}

  ngOnInit(): void {}

  logout() {
    this.reportFacade.logout();
  }
}
