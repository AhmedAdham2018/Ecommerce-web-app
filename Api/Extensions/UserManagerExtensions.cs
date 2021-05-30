using System.Threading.Tasks;
using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<User> FindByEmailWithAddressAsync(this UserManager<User> input , ClaimsPrincipal user)
        {
                var email = user?.Claims?.FirstOrDefault(
                     x => x.Type == ClaimTypes.Email)?.Value;
                return await input.Users.Include(x => x.Address)
                    .SingleOrDefaultAsync(x => x.Email == email);    
        }

        public static async Task<User> FindByEmailFromClaimsPrincipals(this UserManager<User> input , ClaimsPrincipal user)
        {
                var email = user?.Claims?.FirstOrDefault(
                     x => x.Type == ClaimTypes.Email)?.Value;
                return await input.Users.SingleOrDefaultAsync(x => x.Email == email);     
        }
    }
}