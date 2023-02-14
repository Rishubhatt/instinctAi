import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private local: LocalService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.local.clearData();
    this.router.navigate(['/login']);
  }
}
