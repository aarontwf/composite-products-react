import React from "react";
import ComponentGroup from "../../../domain/models/ComponentGroup";
import ComponentProduct from "../../../domain/models/ComponentProduct";
import ComponentProductCell from "./ComponentProductCell";
import ComponentGroupCell from "./ComponentGroupCell";
import Product from "../../../domain/models/Product";

interface ComponentCellProps {
  readonly component: ComponentProduct | ComponentGroup;
  readonly availableProducts: Product[];
  readonly depth?: number;
  readonly path: string;
  readonly onRemovePressed: () => void;
};

const ComponentCell: React.FC<ComponentCellProps> = (props: ComponentCellProps) => {
  if ((props.component as ComponentGroup).type === 'GROUP') {
    const group = props.component as ComponentGroup;
    return (
      <ComponentGroupCell
        key={`group-cell-${props.path}`}
        path={props.path}
        group={group}
        availableProducts={props.availableProducts}
        depth={props.depth == null ? 0 : props.depth}
        onRemovePressed={props.onRemovePressed} />
    );
  } else {
    const product = props.component as ComponentProduct;
    return (
      <ComponentProductCell
        path={props.path}
        key={product.productId}
        availableProducts={props.availableProducts}
        onRemovePressed={props.onRemovePressed} />
    );
  }
}

export default ComponentCell;
