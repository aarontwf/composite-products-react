import OnlineProductService from "./OnlineProductService";
import ProductService from "./ProductService";

class ProductServiceFactory {
    static online(url: URL): ProductService {
        return new OnlineProductService(url = url);
    }
}

export default ProductServiceFactory;
