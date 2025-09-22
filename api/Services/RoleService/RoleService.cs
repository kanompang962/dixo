using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Dtos.RoleDto;
using Microsoft.AspNetCore.Identity;

namespace api.Services.RoleService
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        // Create a new role
        public async Task CreateRoleAsync(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
                throw new ArgumentException("Role name is required");

            if (await _roleManager.RoleExistsAsync(roleName))
                throw new Exception($"Role '{roleName}' already exists");

            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));

            if (!result.Succeeded)
                throw new Exception($"Failed to create role '{roleName}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
        // Get all roles
        public async Task<IList<RoleDto>> GetRolesAsync()
        {
            var roles = _roleManager.Roles
                        .Select(r => new RoleDto
                        {
                            Name = r.Name ?? string.Empty,
                            NormalizedName = r.NormalizedName ?? string.Empty
                        })
                        .ToList();

            return await Task.FromResult(roles);
        }
    }
}