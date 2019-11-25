import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zoekopdracht } from '../model/zoekopdracht';

@Injectable({
  providedIn: 'root'
})
export class ZoekopdrachtService {
  private api: string = (environment.apiUrl + "/crawl");

  constructor(private http: HttpClient) { }

  crawlWebsite(zoekopdracht: Zoekopdracht): Observable<any> {
    console.log(zoekopdracht);
    return this.http.post<Zoekopdracht>(`${this.api}/`, zoekopdracht);
  }
}
