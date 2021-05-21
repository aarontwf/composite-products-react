import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";

interface ComponentGroupCellProps {
  readonly group: ComponentGroup;
  readonly availableProducts: Product[];
}

const ComponentGroupCell: React.FC<ComponentGroupCellProps> = (props) => {
  return <div className="border rounded p-2 mt-4">
    <span className="font-bold px-1">{props.group.label}</span>
    {props.group.components?.map((it) => <ComponentCell component={it} availableProducts={props.availableProducts} />)}
  </div>;
}

export default ComponentGroupCell;
