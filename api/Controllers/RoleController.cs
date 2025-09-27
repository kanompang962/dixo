using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Dtos.RoleDto;
using api.Services.RoleService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("[controller]")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _roleService.CreateRoleAsync(createRoleDto.Name);
                return Ok(new { message = $"Role '{createRoleDto.Name}' created successfully." });
            }
            catch (Exception Ex)
            {
                return BadRequest(new { message = Ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(new
            {
                message = "Roles retrieved successfully",
                data = roles
            });
        }

    }
}