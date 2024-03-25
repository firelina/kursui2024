import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MODEL_URL} from "../util/constant";
import {Observable, of} from "rxjs";
import {StatModel} from "../model/StatModel";
import {StartModel} from "../model/StartModel";
import {PetriAgent} from "../model/PetriAgent";

@Injectable({
  providedIn: 'root'
})
export class ModelService {


  constructor(
    @Inject(MODEL_URL) private baseUrl: InjectionToken<string>,
    private httpClient: HttpClient) {
  }

  stat(): Observable<StatModel>{
    return this.httpClient.get<StatModel>(`${this.baseUrl}stat`);
  }
  testStart(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}test`);
  }
  stop(guid: string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}stop/${guid}`);
  }
  start(startModel: StartModel): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}start`, startModel);
  }

  petri(): Observable<PetriAgent[]>{
    return this.httpClient.get<PetriAgent[]>(`${this.baseUrl}petri`)
  }

  getPetris(): Observable<PetriAgent[]>{
    const size = 30;
    const mockData = new Array();
    for (let i = 0; i < size ; i++) {
      const agent = new PetriAgent();
      agent.title = `Агент ${i + 1}`;
      mockData.push(agent)
    }
    return of(mockData);
  }
}
