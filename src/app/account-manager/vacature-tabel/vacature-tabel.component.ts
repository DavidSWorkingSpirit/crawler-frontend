import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginatorModule } from '@angular/material';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDTO } from 'src/app/model/vacature-dto';

@Component({
  selector: 'app-vacature-tabel',
  templateUrl: './vacature-tabel.component.html',
  styleUrls: ['./vacature-tabel.component.scss']
})
export class VacatureTabelComponent implements OnInit {
  vacatureLijst : VacatureDTO[] = new Array;
  vacature : VacatureDTO = new VacatureDTO;
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
