using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandsAndTypesSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandsAndTypesSpecification(ProductSpecificationParams prodsParams)
            : base(x => 
                (string.IsNullOrEmpty(prodsParams.Search) || x.Name.ToLower().Contains(prodsParams.Search))&&
                (!prodsParams.TypeId.HasValue || x.ProductTypeId == prodsParams.TypeId) &&
                (!prodsParams.BrandId.HasValue || x.ProductBrandId == prodsParams.BrandId))
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);
            AddOrderBy(p => p.Name);
            ApplyPaging(prodsParams.PageSize * (prodsParams.PageIndex - 1) , prodsParams.PageSize);
            if (!string.IsNullOrEmpty(prodsParams.Sort))
            {
                switch (prodsParams.Sort)
                {
                    case "priceAsc":
                         AddOrderBy(p => p.Price);
                         break;
                    case "priceDesc":
                         AddOrderByDescending(p => p.Price);
                         break;    
                    default:
                         AddOrderBy(n => n.Name);
                         break;
                }
            }
        }
        public ProductsWithBrandsAndTypesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);
        }
    }
}