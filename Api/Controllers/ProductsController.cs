using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using Api.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _prodBrandRepository;
        private readonly IGenericRepository<ProductType> _prodTypeRepository;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Product> _prodRepository;

        public ProductsController(IGenericRepository<Product> prodRepository,
        IGenericRepository<ProductBrand> prodBrandRepository,
        IGenericRepository<ProductType> prodTypeRepository,
        IMapper mapper)
        {
            _prodTypeRepository = prodTypeRepository;
            _mapper = mapper;
            _prodRepository = prodRepository;
            _prodBrandRepository = prodBrandRepository;
        }

        //Get a list of products api/products
        [HttpGet]
        public async Task<ActionResult<Paginations<ProductToReturnDto>>> GetProducts(
           [FromQuery] ProductSpecificationParams prodsParams)
        {
            var specification = new ProductsWithBrandsAndTypesSpecification(prodsParams);
            var countSpecification = new ProductsWithFiltersForCountSpecification(prodsParams);
            var totalItems = await _prodRepository.CountAsync(countSpecification);
            var products = await _prodRepository.ListAsync(specification);
            var data = _mapper
                .Map<IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Paginations<ProductToReturnDto>(prodsParams.PageIndex, prodsParams.PageSize , totalItems , data));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var specification = new ProductsWithBrandsAndTypesSpecification(id);
            var product =  await _prodRepository.GetEntityWithSpecification(specification);
            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return _mapper.Map<Product , ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _prodBrandRepository.GetAllListAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _prodTypeRepository.GetAllListAsync());
        }
    }
}