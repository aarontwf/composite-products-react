import React from "react";
import CompositeProduct from "../domain/models/CompositeProduct";
import CompositeProductCell from "./CompositeProductCell";

type CompositeProductListProps = {
  readonly compositeProducts: CompositeProduct[]
};

class CompositeProductList extends React.Component<CompositeProductListProps> {
  render() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {this.props.compositeProducts.map((composite) => {
            return <li key={composite.id}>
              <CompositeProductCell id={composite.id!} name={composite.name} directComponentCount={composite.components.length} />
            </li>;
          })}
        </ul>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{this.props.compositeProducts.length}</span> composites
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompositeProductList;
