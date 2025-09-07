import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HealthModel } from '../../../core/models/health.model';
import { environment } from '../../../../environments/environment';
import { HealthService } from './health-service';

describe('HealthService', () => {
  let service: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HealthService],
    });

    service = TestBed.inject(HealthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ตรวจว่าไม่มี request ค้าง
  });

  it('should map API response into HealthModel instance', () => {
    const mockResponse = {
      status: 'Healthy',
      timestamp: '2025-09-07T14:00:00Z'
    };

    service.getHealth().subscribe((res) => {
      expect(res instanceof HealthModel).toBeTrue();   // ✅ ต้องเป็น instance ของ class
      expect(res.status).toBe('Healthy');             // ✅ property ตรงกับ mock
      expect(res.timestamp instanceof Date).toBeTrue(); // ✅ timestamp แปลงเป็น Date แล้ว
      expect(typeof res.formattedTime()).toBe('string'); // ✅ method ใช้งานได้
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/health`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
