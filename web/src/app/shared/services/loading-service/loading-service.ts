import { Injectable, signal, computed } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // ใช้ Angular Signals (Angular 16+)
  private loadingSignal = signal<boolean>(false);
  private loadingCountSignal = signal<number>(0);
  
  // สำหรับ Observable pattern (รองรับ legacy code)
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Public signals
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly loadingCount = this.loadingCountSignal.asReadonly();
  
  // Computed signal สำหรับแสดงสถานะ
  readonly loadingStatus = computed(() => ({
    isLoading: this.isLoading(),
    count: this.loadingCount()
  }));
  
  // Observable สำหรับ subscription
  readonly loading$ = this.loadingSubject.asObservable();

  constructor() {
    console.log('LoadingService initialized');
  }

  // เริ่ม loading
  show(): void {
    this.loadingCountSignal.update(count => count + 1);
    this.loadingSignal.set(true);
    this.loadingSubject.next(true);
  }

  // หยุด loading
  hide(): void {
    this.loadingCountSignal.update(count => Math.max(0, count - 1));
    
    if (this.loadingCountSignal() === 0) {
      this.loadingSignal.set(false);
      this.loadingSubject.next(false);
    }
  }

  // บังคับหยุด loading ทั้งหมด
  forceHide(): void {
    this.loadingCountSignal.set(0);
    this.loadingSignal.set(false);
    this.loadingSubject.next(false);
  }

  // แสดง loading เป็นเวลา x milliseconds
  showFor(duration: number): void {
    this.show();
    setTimeout(() => {
      this.hide();
    }, duration);
  }

  // Wrapper สำหรับ async operations
  async executeWithLoading<T>(operation: Promise<T>): Promise<T> {
    this.show();
    try {
      const result = await operation;
      return result;
    } finally {
      this.hide();
    }
  }

  // Wrapper สำหรับ Observable operations
  wrapObservable<T>(observable: Observable<T>): Observable<T> {
    this.show();
    return new Observable<T>(subscriber => {
      const subscription = observable.subscribe({
        next: (value) => {
          subscriber.next(value);
        },
        error: (error) => {
          this.hide();
          subscriber.error(error);
        },
        complete: () => {
          this.hide();
          subscriber.complete();
        }
      });

      // Cleanup
      return () => subscription.unsubscribe();
    });
  }

  // สำหรับ debugging
  getStatus() {
    return {
      isLoading: this.isLoading(),
      count: this.loadingCount(),
      timestamp: new Date().toISOString()
    };
  }
}