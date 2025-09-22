using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.DTOs.UserDTO
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }           
        public string LastName { get; set; }           
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Thumbnail { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }         
        public int RoleId { get; set; }
        public int DepartmentId { get; set; }
        public string PositionId { get; set; }
        public bool IsActive { get; set; } = true;
    }
}