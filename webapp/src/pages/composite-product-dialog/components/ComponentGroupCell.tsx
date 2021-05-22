import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";
import { FieldArray } from "formik";
import ComponentProduct from "../../../domain/models/ComponentProduct";
import EmptyCompositeMessage from "./EmptyCompositeMessage";
import DeleteComponentButton from "./buttons/DeleteComponentButton";
import AddGroupButton from "./buttons/AddGroupButton";
import AddProductButton from "./buttons/AddProductButton";

interface ComponentGroupCellProps {
  readonly group: ComponentGroup;
  readonly availableProducts: Product[];
  readonly depth: number;
  readonly path: string;
  readonly onRemovePressed?: () => void;
}

function newProduct(id: string): ComponentProduct {
  return {
    type: 'PRODUCT',
    productId: id,
    quantity: 1
  };
};

function newGroup(): ComponentGroup {
  return {
    type: 'GROUP',
    label: 'Group'
  };
};

const ComponentGroupCell: React.FC<ComponentGroupCellProps> = (props) => {
  const baseClasses = 'text-left mt-3';
  const hasChildComponents = props.group.components && props.group.components.length > 0;

  return (
    <div className={
      `${baseClasses} ${props.depth % 2 === 0 ? 'bg-white' : 'bg-gray-100'} ` +
      `${props.depth > 0 ? 'rounded-l border-l border-t border-b border-gray-300 pl-3 py-3 mt-3' : ''} ` +
      `${props.depth === 1 ? ' border-r rounded-r' : ''}`
    }>
      <FieldArray
        name={props.path ? `${props.path}.components` : 'components'}
        render={arrayHelpers => (
          <div>
            <div className={`flex mr-3 ${props.group.components && props.group.components.length > 0 ? 'pb-2' : ''}`}>
              <div className="font-bold text-lg w-full">
                {props.group.label}
              </div>

              <div className="ml-4">
                <AddProductButton onClick={() => arrayHelpers.insert(0, newProduct(props.availableProducts[0].id))} />
              </div>

              <div className="ml-1">
                <AddGroupButton onClick={() => arrayHelpers.insert(props.group.components ? props.group.components.length : 0, newGroup())} />
              </div>

              {
                props.onRemovePressed &&
                <div className="ml-3">
                  <DeleteComponentButton onClick={props.onRemovePressed} />
                </div>
              }
            </div>

            {
              props.depth === 0 && !hasChildComponents &&
              <div className="my-4 mr-3">
                <EmptyCompositeMessage />
              </div>
            }

            {
              props.group.components?.map((component, index) => {
                const subPath = props.path ? `${props.path}.components[${index}]` : `components[${index}]`;
                return <ComponentCell
                  key={subPath}
                  path={subPath}
                  component={component}
                  availableProducts={props.availableProducts}
                  depth={props.depth + 1}
                  onRemovePressed={() => arrayHelpers.remove(index)} />;
              })
            }
          </div>
        )}
      />
    </div>
  );
}

export default ComponentGroupCell;
