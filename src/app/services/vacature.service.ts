import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vacature } from '../model/vacature';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacatureService {
  private api: string = (environment.apiUrl + "/vacature");

  constructor(private http:HttpClient) { }

  geefAlleVacatures() : Observable<Vacature[]>{
    return this.http.get<Vacature[]>(`${this.api}/`);
  }
}