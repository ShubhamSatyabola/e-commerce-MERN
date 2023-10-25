import Navbar from "../features/Navbar/Navbar"
import ProductList from "../features/Product-list/product-list"
const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}
export default Home