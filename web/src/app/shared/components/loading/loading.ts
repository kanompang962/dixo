import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingService } from '../../services/loading-service/loading-service';

@Component({
  selector: 'app-loading',
  imports: [
    CommonModule,
    MatProgressBar, 
    MatProgressSpinnerModule
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
 private loadingService = inject(LoadingService);

  @Input() global: boolean = true;
  @Input() backdrop: boolean = true;
  @Input() type: 'spinner' | 'progress-bar' | 'custom' = 'spinner';
  @Input() size: number = 50;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() strokeWidth: number = 4;
  @Input() message: string = '';
  @Input() center: boolean = true;

  // Computed สำหรับแสดงสถานะ loading
  isLoading = computed(() => this.loadingService.isLoading());
  loadingCount = computed(() => this.loadingService.loadingCount());
  
  // Computed สำหรับ overlay
  showOverlay = computed(() => 
    this.global && this.isLoading()
  );
}
