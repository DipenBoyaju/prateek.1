import Title from "../../components/Title"
import ProductCard from "./ProductCard"

const Product = () => {
  return (
    <div>
      <Title title="Our Products" tag="Product" />
      <div className="relative container mx-auto px-4 md:px-8 py-10 md:py-20">
        <div className="dotted-bg absolute inset-0 z-[-1]" />
        <div className="grid md:grid-cols-3 w-full">
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
export default Product