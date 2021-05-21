import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";

interface ComponentGroupCellProps {
  readonly group: ComponentGroup;
  readonly availableProducts: Product[];
  readonly depth: number;
}

const ComponentGroupCell: React.FC<ComponentGroupCellProps> = (props) => {
  const baseClasses = 'rounded-l border-l border-t border-b border-gray-300 pl-3 py-3 mt-3';
  return <div className={`${baseClasses} ${props.depth % 2 === 0 ? 'bg-gray-100' : 'bg-white'}${props.depth === 0 ? ' border-r rounded-r' : ''}`}>
    <span className="font-bold px-1">{props.group.label}</span>
    {props.group.components?.map((it) => <ComponentCell component={it} availableProducts={props.availableProducts} depth={props.depth + 1}/>)}
  </div>;
}

export default ComponentGroupCell;
