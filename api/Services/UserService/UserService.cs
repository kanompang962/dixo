using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.Dtos.UserDto;
using Microsoft.AspNetCore.Identity;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> RegisterUserAsync(UserRegisterDto registerDto)
        {
            // 1. Create user
            var user = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth ?? DateTime.MinValue,
                Thumbnail = registerDto.Thumbnail,
                Address = registerDto.Address,
                Gender = registerDto.Gender,
                IsActive = registerDto.IsActive
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            // 2. Assign role (ต้องมี role อยู่ก่อนใน AspNetRoles)
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
            }

            return result;

        }
    }
}