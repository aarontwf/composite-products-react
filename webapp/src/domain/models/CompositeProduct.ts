import ComponentGroup from "./ComponentGroup";
import ComponentProduct from "./ComponentProduct";

interface CompositeProduct {
    id?: string;
    name: string;
    components: (ComponentProduct | ComponentGroup)[];
}

export default CompositeProduct;
