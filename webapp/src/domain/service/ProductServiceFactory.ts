import OnlineProductService from "./OnlineProductService";
import ProductService from "./ProductService";

class ProductServiceFactory {
    static online(url: string): ProductService {
        return new OnlineProductService(url);
    }
}

export default ProductServiceFactory;
