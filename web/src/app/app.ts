import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './shared/services/health-service/health-service';
import { HealthModel } from './core/models/health.model';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  health?: HealthModel;
  protected readonly title = signal('web');
  constructor(private healthService: HealthService) {}
  
  ngOnInit(): void {
    this.healthService.getHealth().subscribe({
      next: (data) => this.health = data,
      error: (err) => console.error('Health API error', err)
    });
  }
}
