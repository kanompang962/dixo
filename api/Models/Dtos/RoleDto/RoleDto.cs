using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos.RoleDto
{
    public class RoleDto
    {
        public string Name { get; set; } = null!;
        public string NormalizedName { get; set; } = null!;
    }
}