using System.Threading.Tasks;
using Api.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var myBasket = await _basketRepository.GetBasketAsync(id);

            return Ok(myBasket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerBasket = _mapper.Map<CustomerBasketDto , CustomerBasket>(basket);
            return Ok(await _basketRepository.UpdateBasketAsync(customerBasket));
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}