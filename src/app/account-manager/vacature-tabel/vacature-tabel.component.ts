import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material';
import { VacatureService } from 'src/app/services/vacature.service';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { SorteerDTO } from 'src/app/model/sorteer-dto';

@Component({
  selector: 'app-vacature-tabel',
  templateUrl: './vacature-tabel.component.html',
  styleUrls: ['./vacature-tabel.component.scss']
})
export class VacatureTabelComponent implements OnInit {
  vacatureLijst: VacatureDTO[] = new Array;
  vacature: VacatureDTO = new VacatureDTO;
  columnsToDisplay = ['titel', 'link'];
  event: PageEvent;
  sorteerDTO: SorteerDTO = new SorteerDTO;
  selectedFilter: string = "";
  paginator: MatPaginator;
  length: number;

  constructor(private vacatureService : VacatureService) { }

  ngOnInit() {
    this.haalEersteVacaturesOp();
  }

  haalEersteVacaturesOp(): void {
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = "vacature";
    this.sorteerDTO.sortDir = "desc";
    this.sorteerDTO.zoekopdracht = this.selectedFilter;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalAantalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAantalVacatures(sorteerDTO).subscribe(aantal => {
      this.length = aantal;
    });
  }

  haalVacaturesOpPagina(event: PageEvent): void {
    this.sorteerDTO.page = event.pageIndex;
    this.sorteerDTO.size = event.pageSize;
    this.sorteerDTO.sortDir = "desc";
    this.sorteerDTO.sort = "vacature";
    this.sorteerDTO.zoekopdracht = this.selectedFilter;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAlleVacatures(sorteerDTO).subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
    });
  }

  filterVacatures(): void {
    this.haalEersteVacaturesOp();
  }

  resetFilter(): void {
    this.selectedFilter = "";
    this.haalEersteVacaturesOp();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }
}
