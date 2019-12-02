import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginatorModule, PageEvent } from '@angular/material';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { SorteerDTO } from 'src/app/model/sorteer-dto';

@Component({
  selector: 'app-vacature-tabel',
  templateUrl: './vacature-tabel.component.html',
  styleUrls: ['./vacature-tabel.component.scss']
})
export class VacatureTabelComponent implements OnInit {
  vacatureLijst : VacatureDTO[] = new Array;
  vacature : VacatureDTO = new VacatureDTO;
  columnsToDisplay = ['titel', 'tekst'];
  event : PageEvent;
  sorteerDTO: SorteerDTO = new SorteerDTO;

  constructor(private vacatureService : VacatureService) { }

  ngOnInit() {
    this.haalEersteVacaturesOp();
    
  }

  haalEersteVacaturesOp(): void{
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = "vacature";
    this.sorteerDTO.sortDir = "desc";
    this.haalVacaturesOp(this.sorteerDTO);

  }

  haalVacaturesOpPagina(event:PageEvent): void {
    this.sorteerDTO.page = event.pageIndex;
    this.sorteerDTO.size = event.pageSize;
    this.sorteerDTO.sortDir = "desc";
    this.sorteerDTO.sort = "vacature";
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalVacaturesOp(sorteerDTO:SorteerDTO):void{
    this.vacatureService.geefAlleVacatures(sorteerDTO).subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
    });

  }
}
