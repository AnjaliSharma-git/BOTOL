import ProductCard from "../../components/ProductCard";

export default function Products() {
  const products = ["Rainbow 600", "Rio 650", "Big Bull 1300", "Rome 600"];
  
  return (
    <div className="container mx-auto my-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Our Product Range</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product} name={product} />
        ))}
      </div>
    </div>
  );
}
