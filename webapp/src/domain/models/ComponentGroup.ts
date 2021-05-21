import ComponentProduct from "./ComponentProduct";

interface ComponentGroup {
    type: "GROUP";
    label: string,
    components?: (ComponentGroup | ComponentProduct)[]
}

export default ComponentGroup;
