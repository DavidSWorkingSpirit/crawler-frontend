import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Zoekterm } from 'src/app/model/zoekterm';
import { ZoektermService } from 'src/app/services/zoekterm.service';

@Component({
  selector: 'app-zoekterm',
  templateUrl: './zoekterm.component.html',
  styleUrls: ['./zoekterm.component.scss']
})
export class ZoektermComponent implements OnInit {
  zoekterm: Zoekterm = new Zoekterm();
  displayedColumns: string[] = ['naam', 'bewerk', 'verwijder'];
  zoektermTabel = new MatTableDataSource();
  wijzigen: boolean = false;

  constructor(private zoektermService: ZoektermService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.haalZoektermenOp();
  }

  haalZoektermenOp(): void {
    this.zoektermService.geefAlleZoektermen().subscribe(zoektermenLijst => {
      this.zoektermTabel.data = zoektermenLijst;
    })
  }

  zoektermOpslaan(zoekterm: Zoekterm): void {
    this.zoektermService.zoektermOpslaan(zoekterm).subscribe(response => {
      this.openSnackbar("De zoekterm is opgeslagen.", "Sluit", "correctmelding");
      this.zoekterm = new Zoekterm();
      this.haalZoektermenOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het opslaan van de zoekterm.", "Sluit", "foutmelding");
    });
  }



  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
