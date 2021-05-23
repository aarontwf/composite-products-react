import React from "react";
import { Link } from "react-router-dom";
import CompositeProduct from "../../../domain/models/CompositeProduct";
import CompositeProductCell from "./CompositeProductCell";

interface CompositeProductListProps {
  readonly compositeProducts: CompositeProduct[]
};

const CompositeProductList: React.FC<CompositeProductListProps> = (props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {props.compositeProducts.map((composite) => {
          return <li key={composite.id}>
            <Link to={{ pathname: `/composite-products/${composite.id}`, state: { modal: true } }}>
              <CompositeProductCell id={composite.id!} name={composite.name} directComponentCount={composite.components.length} />
            </Link>
          </li>;
        })}
      </ul>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{props.compositeProducts.length}</span> composites
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompositeProductList;
