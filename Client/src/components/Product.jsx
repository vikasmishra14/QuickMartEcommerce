import ProductCard from "./ProductCard";

const Product = ({ products }) => {
  return (
    <div className="container"> 
   { products.map((product ,i) => {
      return (
         <ProductCard key={i} product={product} />
        );
    })}
  </div>
  );
}
export default Product;