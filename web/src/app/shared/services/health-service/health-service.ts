import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HealthModel } from '../../../core/models/health.model';

@Injectable({
  providedIn: 'root'
})

export class HealthService {

  private apiUrl = environment.apiUrl; // ← ใช้จาก environment

  constructor(private http: HttpClient) {}

  getHealth(): Observable<HealthModel> {
    return this.http.get<HealthModel>(`${this.apiUrl}/health`)
    .pipe(
      map(data => new HealthModel(data))
    );
  }
}
