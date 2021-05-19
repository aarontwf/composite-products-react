import ComponentGroup from "./ComponentGroup";
import ComponentProduct from "./ComponentProduct";

interface CompositeProduct {
    name: string;
    components: (ComponentProduct | ComponentGroup)[];
}

export default CompositeProduct;
