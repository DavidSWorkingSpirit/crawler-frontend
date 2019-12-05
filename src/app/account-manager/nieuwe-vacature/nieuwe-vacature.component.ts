import { Component, OnInit } from '@angular/core';
import { VacatureDTO } from 'src/app/model/vacature-dto';
import { PageEvent, MatPaginator } from '@angular/material';
import { SorteerDTO } from 'src/app/model/sorteer-dto';
import { VacatureService } from 'src/app/services/vacature.service';

@Component({
  selector: 'app-nieuwe-vacature',
  templateUrl: './nieuwe-vacature.component.html',
  styleUrls: ['./nieuwe-vacature.component.scss']
})
export class NieuweVacatureComponent implements OnInit {

  vacatureLijst : VacatureDTO[] = new Array;
  vacature : VacatureDTO = new VacatureDTO;
  columnsToDisplay = ['titel', 'datum', 'link'];
  event : PageEvent;
  sorteerDTO: SorteerDTO = new SorteerDTO;
  selectedFilter: string = "";
  paginator: MatPaginator;
  length: number;
  descending=false;
  direction = "ASC";
  sorteerOp:String = "datum";
  datum = new Date;


  constructor(private vacatureService : VacatureService) { }

  ngOnInit() {
    this.haalNieuwsteVacaturesOp();
  }

  sorteer(kolomnaam:String){
    this.descending = !this.descending;
    this.sorteerOp = kolomnaam;
    if(this.descending){
      this.direction = "DESC";
    } else {
      this.direction = "ASC";
    }
    this.haalNieuwsteVacaturesOp();
  }

  haalNieuwsteVacaturesOp(): void {
    this.sorteerDTO.page = 0;
    this.sorteerDTO.size = 25;
    this.sorteerDTO.sort = this.sorteerOp;
    this.sorteerDTO.sortDir = this.direction;
    this.sorteerDTO.zoekopdracht = this.selectedFilter;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalAantalVacaturesOp(sorteerDTO : SorteerDTO): void {
    this.vacatureService.geefAantalNieuweVacatures(sorteerDTO).subscribe(aantal => {
      this.length = aantal;
    });
  }

  haalVacaturesOpPagina(event: PageEvent): void {
    this.sorteerDTO.page = event.pageIndex;
    this.sorteerDTO.size = event.pageSize;
    this.sorteerDTO.sortDir = "ASC";
    this.sorteerDTO.sort = "datum";
    this.sorteerDTO.zoekopdracht = this.selectedFilter;
    this.haalAantalVacaturesOp(this.sorteerDTO);
    this.haalVacaturesOp(this.sorteerDTO);
  }

  haalVacaturesOp(sorteerDTO: SorteerDTO): void {
    this.vacatureService.geefAlleNieuweVacatures(sorteerDTO).subscribe(vacatureLijst => {
      this.vacatureLijst = vacatureLijst;
    });
  }

  filterVacatures(): void {
    this.haalNieuwsteVacaturesOp();
  }

  resetFilter(): void {
    this.selectedFilter = "";
    this.haalNieuwsteVacaturesOp();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }
}
