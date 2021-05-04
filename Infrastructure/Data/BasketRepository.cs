using System.Threading.Tasks;
using System.Text.Json;
using StackExchange.Redis;
using Core.Entities;
using Core.Interfaces;
using System;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }
        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var dataCreated = await _database.StringSetAsync(basket.Id , 
                JsonSerializer.Serialize(basket) , TimeSpan.FromDays(10));

            if (!dataCreated) return null;
            return await GetBasketAsync(basket.Id);    
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
           return await _database.KeyDeleteAsync(basketId);
        }

    }
}