using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Dtos.RoleDto;

namespace api.Services.RoleService
{
    public interface IRoleService
    {
        Task CreateRoleAsync(string roleName);
        Task<IList<RoleDto>> GetRolesAsync();
    }
}