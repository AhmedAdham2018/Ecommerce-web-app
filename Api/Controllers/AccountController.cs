using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using Api.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signManager;
        private readonly IMapper _mapper;
        public AccountController(UserManager<User> userManager,
                                SignInManager<User> signManager,
                                ITokenService tokenService,
                                IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _signManager = signManager;
            _userManager = userManager;
        }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {

        var user = await _userManager.FindByEmailFromClaimsPrincipals(HttpContext.User);

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
        return _mapper.Map<Address , AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
    {
        var user =  await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
        user.Address = _mapper.Map<AddressDto , Address>(address);
        var result = await _userManager.UpdateAsync(user);
        if(result.Succeeded) return Ok(_mapper.Map<Address , AddressDto>(user.Address));
        return BadRequest("Problem with updating address");
    }

    [HttpGet("emailexist")]
    public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (CheckEmailExistAsync(registerDto.Email).Result.Value)
        {
            return new BadRequestObjectResult(new ApiValidationErrorResponse{
                Errors = new []{"Sorry , Email Address is in use."}
            });
        }
        
        var user = new User
        {
            DisplayName = registerDto.DisplayName,
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }
}
}
