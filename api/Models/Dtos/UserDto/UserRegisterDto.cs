using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos.UserDto
{
    public class UserRegisterDto
    {
        [Required]
        public required string FirstName { get; set; }     
        [Required]      
        public required string LastName { get; set; }
        [Required]
        [EmailAddress]           
        public required string Email { get; set; }
        public string? UserName { get; set; }
        [Required]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        public required string Password { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Thumbnail { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }         
        public bool IsActive { get; set; } = true;
    }
}