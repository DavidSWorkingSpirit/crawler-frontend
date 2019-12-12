import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
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
  columnsToDisplay = ['titel', 'datum', 'link'];
  event: PageEvent;
  sorteerDTO: SorteerDTO = new SorteerDTO;
  filterOpties: string[] = ['Infra', 'Developer', 'Java', '.NET', 'DevOps', 'Engineer'];
  filters: string[] = new Array;
  paginator: MatPaginator;
  length: number;
  descending: boolean = false;
  direction: string = "ASC";
  sorteerOp: string = "datum";

  constructor(private vacatureService: VacatureService) { }

  ngOnInit() {
    this.haalEersteVacaturesOp();
  }

  sorteer(kolomnaam: string): void {
    this.descending = !this.descending;
    this.sorteerOp = kolomnaam;
    if (this.descending) {
      this.direction = "DESC";
    } else {
      this.direction = "ASC";
    }
    this.haalEersteVacaturesOp();
  }

  haalEersteVacaturesOp(): void {
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.zoekopdrachten = this.filters;
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
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.zoekopdrachten = this.filters;
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
    this.filters = new Array;
    this.haalEersteVacaturesOp();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }
}
