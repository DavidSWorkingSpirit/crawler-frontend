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

  geefAantalVacatures(sorteerDTO: SorteerDTO) : Observable<any>{
    return this.http.post<number>(`${this.api}/zoekopdracht`, sorteerDTO);
  }

  geefAantalNieuweVacatures(sorteerDTO:SorteerDTO) : Observable<any>{
    console.log(sorteerDTO.datum);
    return this.http.post<number>(`${this.api}/datum` , sorteerDTO);
  }

  geefAlleNieuweVacatures(sorteerDTO: SorteerDTO) : Observable<any>{
    return this.http.post<VacatureDTO[]>(`${this.api}/nieuweVacatures` , sorteerDTO);
  }
}
