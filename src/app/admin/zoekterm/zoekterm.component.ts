import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-zoekterm',
  templateUrl: './zoekterm.component.html',
  styleUrls: ['./zoekterm.component.scss']
})
export class ZoektermComponent implements OnInit {
  displayedColumns: string[] = ['naam', 'url', 'filter', 'bewerk', 'verwijder'];
  dataSource = new MatTableDataSource();
  wijzigen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
