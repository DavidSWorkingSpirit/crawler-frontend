import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: "Nieuwe vacatures",
        link: "./nieuw",
        index: 0
      },
      {
        label: "Bekijk vacatures",
        link: "./vacaturelijst",
        index: 1
      },
      {
        label: "Zoekopdracht",
        link: "./zoeken",
        index: 2
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.toonNieuweVacatures();
  }

  toonNieuweVacatures(): void {
    this.router.navigateByUrl('accountmanager/nieuw');
  }
}


