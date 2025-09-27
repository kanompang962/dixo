import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoadingService } from '../shared/services/loading-service/loading-service';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  const modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // เพิ่ม headers อื่นๆ ตามต้องการ
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

  
  // URLs ที่ไม่ต้องการแสดง loading
  const skipLoadingUrls = [
    '/api/health',
    '/api/ping',
    '/api/heartbeat'
  ];

  // ตรวจสอบว่าจะแสดง loading หรือไม่
  const shouldShowLoading = !modifiedReq.headers.has('X-Skip-Loading') && 
    !skipLoadingUrls.some(url => modifiedReq.url.includes(url));

  // เริ่ม loading ถ้าจำเป็น
  if (shouldShowLoading) {
    loadingService.show();
  }

  // ส่ง request ต่อไป
  return next(modifiedReq).pipe(
    catchError((error) => {
      // จัดการ error (optional)
      console.error('HTTP Error in Loading Interceptor:', error);
      return throwError(() => error);
    }),
    finalize(() => {
      // หยุด loading เมื่อ request เสร็จสิ้น (สำเร็จหรือล้มเหลว)
      if (shouldShowLoading) {
        loadingService.hide();
      }
    })
  );
};
