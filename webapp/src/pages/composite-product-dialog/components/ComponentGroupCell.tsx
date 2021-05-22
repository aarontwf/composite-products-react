import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";
import { FieldArray } from "formik";
import Button from "../../../components/Button";

interface ComponentGroupCellProps {
  readonly group: ComponentGroup;
  readonly availableProducts: Product[];
  readonly depth: number;
  readonly path: string;
  readonly onRemovePressed: () => void;
}

const ComponentGroupCell: React.FC<ComponentGroupCellProps> = (props) => {
  const baseClasses = 'text-left rounded-l border-l border-t border-b border-gray-300 pl-3 py-3 mt-3';
  return (
    <div className={`${baseClasses} ${props.depth % 2 === 0 ? 'bg-gray-100' : 'bg-white'}${props.depth === 0 ? ' border-r rounded-r' : ''}`}>
      <div className="flex justify-between mr-2 ">
        <div className="font-bold text-lg px-1">{props.group.label}</div>
        <div className="ml-4">
          <Button onClick={props.onRemovePressed}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>

      <FieldArray
        name={`${props.path}.components`}
        render={arrayHelpers => (
          <div>
            {
              props.group.components?.map((component, index) => {
                const subPath = `${props.path}.components[${index}]`;
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
