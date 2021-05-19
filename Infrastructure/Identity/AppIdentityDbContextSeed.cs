using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
         public static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    DisplayName = "Ahmed",
                    Email = "ahmed@test.com",
                    UserName = "ahmed@test.com",
                    Address = new Address
                    {
                        FirstName = "Ahmed",
                        LastName = "Adham",
                        Street = "20 The Street",
                        City = "Cairo",
                        State = "CA",
                        Zipcode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}