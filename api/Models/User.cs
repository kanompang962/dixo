using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        public required string FirstName { get; set; }           // ชื่อเต็ม
        public required string LastName { get; set; }           // ชื่อเต็ม
        public DateTime? DateOfBirth { get; set; }      // วันเกิด
        public string? Thumbnail { get; set; }  // รูป profile
        public string? Address { get; set; }            // ที่อยู่
        public string? Gender { get; set; }         // Male / Female / Other
        // public int DepartmentId { get; set; }
        // public string PositionId { get; set; }
        public bool IsActive { get; set; } = true; // สถานะใช้งาน
    }
}