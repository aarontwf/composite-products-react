import ComponentProduct from "../../../domain/models/ComponentProduct";
import Product from "../../../domain/models/Product";

interface ComponentProductCellProps {
  readonly product: ComponentProduct;
  readonly availableProducts: Product[];
}

const ComponentProductCell: React.FC<ComponentProductCellProps> = (props) => {
  return (
    <div className="border rounded p-2 mt-2 flex items-center justify-between">
      <select className="block w-full shadow-sm rounded-md border-gray-300" value={props.product.productId}>
        {props.availableProducts.map((it) => <option value={it.id}>{it.name}</option>)}
      </select>

      <span className="px-4">x</span>

      <input className="block w-24 shadow-sm rounded-md border-gray-300" type="number" value={props.product.quantity} readOnly />
    </div>
  );
}

export default ComponentProductCell;
