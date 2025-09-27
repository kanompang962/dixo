using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.Dtos.UserDto;
using Microsoft.AspNetCore.Identity;

namespace api.Services.UserService
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(UserRegisterDto registerDto);
    }
}