import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/model/gebruiker';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { GebruikersRol } from 'src/app/model/gebruikers-rol.enum';

@Component({
  selector: 'app-gebruikers',
  templateUrl: './gebruikers.component.html',
  styleUrls: ['./gebruikers.component.scss']
})
export class GebruikersComponent implements OnInit {
  gebruiker: Gebruiker = new Gebruiker();
  displayedColumns: string[] = ['naam', 'username', 'email', 'rol', 'bewerk', 'verwijder'];
  dataSource = new MatTableDataSource();
  wijzigen: boolean = false;
  rollen: any[] = [
    {value: GebruikersRol.ADMIN, naam: "Admin"},
    {value: GebruikersRol.ACCOUNTMANAGER, naam: "Accountmanager"}
  ];

  constructor(private gebruikerService: GebruikerService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.haalGebruikersOp();
  }

  haalGebruikersOp(): void {
    this.gebruikerService.geefAlleGebruikers().subscribe(gebruikerslijst => {
      this.dataSource.data = gebruikerslijst;
    });
  }

  gebruikerOpslaan(gebruiker: Gebruiker): void {
    this.gebruikerService.gebruikerOpslaan(gebruiker).subscribe(response => {
      this.openSnackbar("De gebruiker is aangemaakt.", "Sluit", "correctmelding");
      this.gebruiker = new Gebruiker();
      this.haalGebruikersOp();
    },
    (error) => {
      this.openSnackbar("Er is een fout opgetreden bij het opslaan van de gebruiker.", "Sluit", "foutmelding");
    });
  }

  openSnackbar(melding: string, actie: string, cssOpmaak: string) {
    this.snackbar.open(melding, actie, {
      duration: 5000,
      panelClass: [cssOpmaak]
    });
  }
}
