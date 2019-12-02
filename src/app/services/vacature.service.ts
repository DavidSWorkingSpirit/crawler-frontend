import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VacatureDTO} from '../model/vacature-dto';
import { HttpClient } from '@angular/common/http';
import { SorteerDTO } from '../model/sorteer-dto';

@Injectable({
  providedIn: 'root'
})
export class VacatureService {
  private api: string = (environment.apiUrl + "/vacature");

  constructor(private http:HttpClient) { }

  geefAlleVacatures(sorteerDTO:SorteerDTO) : Observable<any>{
    return this.http.post<VacatureDTO[]>(`${this.api}/`, sorteerDTO);
  }
}
