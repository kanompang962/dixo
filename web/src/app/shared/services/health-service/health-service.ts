import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HealthModel } from '../../../core/models/health.model';

@Injectable({
  providedIn: 'root'
})

export class HealthService {
  
  constructor(private http: HttpClient) {}

  getHealth(): Observable<HealthModel> {
    return this.http.get<HealthModel>(environment.apiUrl + '/health')
    .pipe(
      map(data => new HealthModel(data))
    );
  }
}
