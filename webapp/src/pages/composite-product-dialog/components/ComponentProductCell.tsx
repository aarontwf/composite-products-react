import ComponentProduct from "../../../domain/models/ComponentProduct";
import Product from "../../../domain/models/Product";

interface ComponentProductCellProps {
  readonly product: ComponentProduct;
  readonly availableProducts: Product[];
}

const ComponentProductCell: React.FC<ComponentProductCellProps> = (props) => {
  return (
    <div className="mt-2 mr-2 flex items-center justify-between">
      <select className="block w-full shadow-sm rounded-md border-gray-300" value={props.product.productId}>
        {props.availableProducts.map((it) => <option value={it.id}>{it.name}</option>)}
      </select>

      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>

      <input className="block w-24 shadow-sm rounded-md border-gray-300" type="number" value={props.product.quantity} readOnly />
    </div>
  );
}

export default ComponentProductCell;
