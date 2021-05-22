import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";
import { FieldArray } from "formik";
import Button from "../../../components/Button";
import ComponentProduct from "../../../domain/models/ComponentProduct";

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
              <div className="font-bold text-lg w-full">{props.group.label}</div>
              <div className="ml-4">
                <Button onClick={() => arrayHelpers.insert(0, newProduct(props.availableProducts[0].id))}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Button>
              </div>

              <div className="ml-1">
                <Button onClick={() => arrayHelpers.insert(props.group.components ? props.group.components.length : 0, newGroup())}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </Button>
              </div>

              {props.onRemovePressed &&
                <div className="ml-3">
                  <Button onClick={props.onRemovePressed}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              }
            </div>

            {
              props.depth === 0 && !hasChildComponents &&
              <div className="border-2 border-dashed my-4 mr-3 p-6 text-center text-gray-500 rounded-md">Add a product or group above to get started.</div>
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
