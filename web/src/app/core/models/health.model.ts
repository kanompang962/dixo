// src/app/core/models/health.model.ts

export class HealthModel {
  status: string;
  timestamp: Date;

  constructor(data: Partial<HealthModel> = {}) {
    this.status = data.status || 'Unknown';
    // ถ้า API ส่ง timestamp เป็น string ให้แปลงเป็น Date
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
  }

  // ตัวอย่าง method แปลง timestamp เป็น string
  formattedTime(): string {
    return this.timestamp.toLocaleString();
  }
}
