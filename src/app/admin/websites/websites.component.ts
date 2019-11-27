import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Website } from 'src/app/model/website';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  website: Website = new Website();
  displayedColumns: string[] = ['naam', 'url', 'filter', 'bewerk'];
  dataSource = new MatTableDataSource();
  wijzigen: boolean = false;

  constructor(private websiteService: WebsiteService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.haalWebsitesOp();
  }

  haalWebsitesOp(): void {
    this.websiteService.geefAlleWebsites().subscribe(websiteLijst => {
      this.dataSource.data = websiteLijst;
    });
  }

  websiteOpslaan(website: Website): void {
    this.websiteService.websiteOpslaan(website).subscribe(response => {
      this.openSnackbar("De website is opgeslagen.", "Sluit", "correctmelding");
      this.website = new Website();
      this.haalWebsitesOp();
    },
    (error) => {
      this.openSnackbar("Er ging iets fout bij het opslaan van de website.", "Sluit", "foutmelding");
    });
  }

  laadWijzigmenu(id: number): void {
    this.websiteService.geefWebsiteOpId(id).subscribe(website => {
      this.website = website;
      this.wijzigen = true;
    });
  }

  websiteWijzigen(website: Website): void {
    alert("LOL");
  }

  annuleerWijziging(): void {
    this.website = new Website();
    this.wijzigen = false;
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
