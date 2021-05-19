import ComponentProduct from "../models/ComponentProduct";
import CompositeProduct from "../models/CompositeProduct";

interface ProductService {
    /**
     * Returns a complete list of all Products in the system.
     */
    getProducts(): Promise<ComponentProduct[]>;

    /**
     * Returns a complete list of all Composite Products in the system.
     */
    getCompositeProducts(): Promise<CompositeProduct[]>;

    /**
     * Returns the matching Composite Product in the system if it exists.
     * 
     * @param id Composite product id
     */
    getCompositeProductById(id: string): Promise<CompositeProduct>;

    /**
     * Saves the supplied Composite Product into the system.
     * 
     * @param product The new composite product
     */
    createCompositeProduct(product: CompositeProduct): Promise<void>;

    /**
     * Updates the matching Composite Product in the system with the supplied data.
     * 
     * @param product The updated composite product
     */
    updateCompositeProduct(product: CompositeProduct): Promise<void>;
}

export default ProductService;
