import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RolesService } from './roles-service';
import { environment } from '../../../../environments/environment';
import { CreateRoleModel, RoleModel } from '../../../core/models/user-management-model/role.model';
import { APIResponse } from '../../../core/models/http.model';

describe('RolesService', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;
  
  const mockApiUrl = 'http://localhost:5153';

  // Mock data
  const mockRoles: RoleModel[] = [
    { name: 'Admin', normalizedName: 'ADMIN' },
    { name: 'User', normalizedName: 'USER' }
  ];

  const mockApiResponse: APIResponse<RoleModel[]> = {
    data: mockRoles,
    message: 'Roles retrieved successfully'
  };

  const mockCreateRolePayload: CreateRoleModel = {
    name: 'Manager',
  };

  const mockCreateRoleResponse: APIResponse = {
    message: 'Role created successfully',
    data: undefined
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolesService]
    });
    
    service = TestBed.inject(RolesService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Mock the private apiUrl property
    (service as any).apiUrl = mockApiUrl;
  });

  afterEach(() => {
    // ตรวจสอบว่าไม่มี HTTP request ที่ค้างอยู่
    httpMock.verify();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have getRoles method', () => {
      expect(service.getRoles).toBeDefined();
      expect(typeof service.getRoles).toBe('function');
    });

    it('should have createRole method', () => {
      expect(service.createRole).toBeDefined();
      expect(typeof service.createRole).toBe('function');
    });
  });

  describe('getRoles', () => {
    it('should retrieve roles successfully', () => {
      // Act
      service.getRoles().subscribe(response => {
        // Assert
        expect(response).toEqual(mockApiResponse);
        expect(response.data).toEqual(mockRoles);
        expect(response.message).toBe('Roles retrieved successfully');
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data).toHaveLength(2);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      
      // Respond with mock data
      req.flush(mockApiResponse);
    });

    it('should handle error when retrieving roles fails', () => {
      const errorMessage = 'Failed to fetch roles';

      // Act
      service.getRoles().subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(500);
          expect(error.error.message).toBe(errorMessage);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      expect(req.request.method).toBe('GET');
      
      // Respond with error
      req.flush({ message: errorMessage }, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network error', () => {
      // Act
      service.getRoles().subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          // Assert
          expect(error).toBeDefined();
          expect(error.status).toBe(0);
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      
      // Simulate network error
      req.error(new ProgressEvent('Network error'));
    });

    it('should use correct API endpoint for getRoles', () => {
      // Act
      service.getRoles().subscribe();

      // Assert
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      expect(req.request.url).toBe(`${mockApiUrl}/role`);
      expect(req.request.urlWithParams).toBe(`${mockApiUrl}/role`);
      
      req.flush(mockApiResponse);
    });

    it('should handle empty response', () => {
      const emptyResponse: APIResponse<RoleModel[]> = {
        data: [],
        message: 'No roles found'
      };

      // Act
      service.getRoles().subscribe(response => {
        // Assert
        expect(response.data).toEqual([]);
        expect(response.data).toHaveLength(0);
        expect(response.message).toBe('No roles found');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      req.flush(emptyResponse);
    });
  });

  describe('createRole', () => {
    it('should create role successfully', () => {
      // Act
      service.createRole(mockCreateRolePayload).subscribe(response => {
        // Assert
        expect(response).toEqual(mockCreateRoleResponse);
        expect(response.message).toBe('Role created successfully');
        expect(response.data).toBeUndefined();
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCreateRolePayload);
      expect(req.request.body).toHaveProperty('name', 'Manager');
      
      // Respond with mock data
      req.flush(mockCreateRoleResponse);
    });

    it('should handle validation error when creating role fails', () => {
      const errorMessage = 'Role name already exists';

      // Act
      service.createRole(mockCreateRolePayload).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
          expect(error.error.message).toBe(errorMessage);
          expect(error.statusText).toBe('Bad Request');
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCreateRolePayload);
      
      // Respond with error
      req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
    });

    it('should handle unauthorized error', () => {
      const errorMessage = 'Unauthorized';

      // Act
      service.createRole(mockCreateRolePayload).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(401);
          expect(error.error.message).toBe(errorMessage);
        }
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      req.flush({ message: errorMessage }, { status: 401, statusText: 'Unauthorized' });
    });

    it('should send correct payload when creating role', () => {
      const customPayload: CreateRoleModel = {
        name: 'Editor',
      };

      // Act
      service.createRole(customPayload).subscribe();

      // Assert
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(customPayload);
      expect(req.request.body).toHaveProperty('name', 'Editor');
      expect(req.request.body.name).toBeTruthy();
      
      req.flush(mockCreateRoleResponse);
    });

    it('should use correct API endpoint for createRole', () => {
      // Act
      service.createRole(mockCreateRolePayload).subscribe();

      // Assert
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(req.request.url).toBe(`${mockApiUrl}/role/create`);
      expect(req.request.urlWithParams).toBe(`${mockApiUrl}/role/create`);
      
      req.flush(mockCreateRoleResponse);
    });

    it('should handle empty payload gracefully', () => {
      const emptyPayload = {} as CreateRoleModel;

      // Act
      service.createRole(emptyPayload).subscribe();

      // Assert
      const req = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(req.request.body).toEqual(emptyPayload);
      
      req.flush(mockCreateRoleResponse);
    });
  });

  describe('HTTP Configuration', () => {
    it('should make requests with correct configuration', () => {
      // Act
      service.getRoles().subscribe();
      service.createRole(mockCreateRolePayload).subscribe();

      // Assert GET request configuration
      const getReq = httpMock.expectOne(`${mockApiUrl}/role`);
      expect(getReq.request.method).toBe('GET');
      expect(getReq.request.responseType).toBe('json');
      expect(getReq.request.body).toBeNull();
      
      // Assert POST request configuration
      const postReq = httpMock.expectOne(`${mockApiUrl}/role/create`);
      expect(postReq.request.method).toBe('POST');
      expect(postReq.request.responseType).toBe('json');
      expect(postReq.request.body).toBeDefined();
      
      // Flush responses
      getReq.flush(mockApiResponse);
      postReq.flush(mockCreateRoleResponse);
    });

    it('should handle concurrent requests', () => {
      // Act - Make multiple requests simultaneously
      service.getRoles().subscribe();
      service.createRole(mockCreateRolePayload).subscribe();
      service.getRoles().subscribe();

      // Assert all requests are captured
      const allRequests = httpMock.match(req => true);
      expect(allRequests).toHaveLength(3);
      // Categorize requests by URL
      const getRoleRequests = allRequests.filter(req => req.request.url.endsWith('/role'));
      const createRoleRequests = allRequests.filter(req => req.request.url.endsWith('/role/create'));
      
      expect(getRoleRequests).toHaveLength(2);
      expect(createRoleRequests).toHaveLength(1);
      
      // Flush all responses
      getRoleRequests.forEach(req => req.flush(mockApiResponse));
      createRoleRequests.forEach(req => req.flush(mockCreateRoleResponse));
    });
  });

  describe('Environment Configuration', () => {
    it('should use apiUrl from environment', () => {
      // Act
      service.getRoles().subscribe();

      // Assert
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      expect(req.request.url).toContain(mockApiUrl);
      expect(req.request.url).toMatch(/^http:\/\/localhost:5153/);
      
      req.flush(mockApiResponse);
    });

    it('should construct URLs correctly', () => {
      // Act
      service.getRoles().subscribe();
      service.createRole(mockCreateRolePayload).subscribe();

      // Assert URL construction
      const getReq = httpMock.expectOne(`${mockApiUrl}/role`);
      const postReq = httpMock.expectOne(`${mockApiUrl}/role/create`);
      
      expect(getReq.request.url).toBe(`${mockApiUrl}/role`);
      expect(postReq.request.url).toBe(`${mockApiUrl}/role/create`);
      
      // Ensure URLs don't have double slashes or other issues
      expect(getReq.request.url).not.toContain('//role');
      expect(postReq.request.url).not.toContain('//role');
      
      getReq.flush(mockApiResponse);
      postReq.flush(mockCreateRoleResponse);
    });
  });

  describe('Observable Behavior', () => {
    it('should return Observable for getRoles', () => {
      const result = service.getRoles();
      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should return Observable for createRole', () => {
      const result = service.createRole(mockCreateRolePayload);
      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should complete Observable after successful response', (done) => {
      service.getRoles().subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        complete: () => {
          done(); // Observable completed successfully
        }
      });

      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      req.flush(mockApiResponse);
    });
  });

  describe('Edge Cases', () => {
    it('should handle malformed response gracefully', () => {
      // Act
      service.getRoles().subscribe(response => {
        // Assert - should receive whatever the server sends
        expect(response).toBeDefined();
      });

      // Respond with malformed data
      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      req.flush('invalid json response');
    });

    it('should handle null response', () => {
      // Act
      service.getRoles().subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/role`);
      req.flush(null);
    });
  });
});