import React from "react";
import ComponentGroup from "../../../domain/models/ComponentGroup";
import ComponentProduct from "../../../domain/models/ComponentProduct";
import ComponentProductCell from "./ComponentProductCell";
import ComponentGroupCell from "./ComponentGroupCell";
import Product from "../../../domain/models/Product";

type ComponentCellProps = {
  readonly component: ComponentProduct | ComponentGroup;
  readonly availableProducts: Product[];
  readonly depth?: number;
  readonly children?: React.ReactNode;
};

const ComponentCell: React.FC<ComponentCellProps> = (props: ComponentCellProps) => {
  if ((props.component as ComponentGroup).type === 'GROUP') {
    const group = props.component as ComponentGroup;
    return (<ComponentGroupCell group={group} availableProducts={props.availableProducts} depth={props.depth == null ? 0 : props.depth} />);
  } else  {
    const product = props.component as ComponentProduct;
    return (<ComponentProductCell product={product} key={product.productId} availableProducts={props.availableProducts} />);
  }
}

export default ComponentCell;
