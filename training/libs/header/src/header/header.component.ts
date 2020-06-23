import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@training/store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  logout() {
    this.authFacade.logout();
  }
}
