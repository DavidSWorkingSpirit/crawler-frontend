import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginatorModule } from '@angular/material';
import { VacatureService } from 'src/app/services/vacature.service';
import { Vacature } from 'src/app/model/vacature';

@Component({
  selector: 'app-vacature-tabel',
  templateUrl: './vacature-tabel.component.html',
  styleUrls: ['./vacature-tabel.component.scss']
})
export class VacatureTabelComponent implements OnInit {
  vacatureLijst : Vacature[] = new Array;
  vacature : Vacature = new Vacature;
  columnsToDisplay = ['titel', 'tekst'];

  constructor(private vacatureService : VacatureService) { }

  ngOnInit() {
    this.haalVacaturesOp();
  }
  haalVacaturesOp(): void {
    this.vacatureService.geefAlleVacatures().subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
      console.log(this.vacatureLijst);
    });
  }
}
