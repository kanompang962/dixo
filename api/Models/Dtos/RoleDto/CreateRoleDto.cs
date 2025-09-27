using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos.RoleDto
{
    public class CreateRoleDto
    {
        [Required]
         public required string Name { get; set; }
    }
}