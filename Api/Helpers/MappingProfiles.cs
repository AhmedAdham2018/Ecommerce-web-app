using Api.Dtos;
using AutoMapper;
using Core.Entities;

namespace Api.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product , ProductToReturnDto>()
            .ForMember(destination => destination.ProductType ,
             options => options.MapFrom(source => source.ProductType.Name))
            .ForMember(destination => destination.ProductBrand , 
             options => options.MapFrom(source => source.ProductBrand.Name))
            .ForMember(destination => destination.ImageUrl , 
             options => options.MapFrom<ProductUrlResolver>()); 
        }
    }
}