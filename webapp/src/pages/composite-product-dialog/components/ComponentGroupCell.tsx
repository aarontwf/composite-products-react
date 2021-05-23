import ComponentGroup from "../../../domain/models/ComponentGroup";
import Product from "../../../domain/models/Product";
import ComponentCell from "./ComponentCell";
import { FieldArray, Field, FieldProps } from "formik";
import ComponentProduct from "../../../domain/models/ComponentProduct";
import EmptyCompositeMessage from "./EmptyCompositeMessage";
import DeleteComponentButton from "./buttons/DeleteComponentButton";
import AddGroupButton from "./buttons/AddGroupButton";
import AddProductButton from "./buttons/AddProductButton";
import classNames from "classnames";

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
    label: '',
    components: []
  };
};

const ComponentGroupCell: React.FC<ComponentGroupCellProps> = (props) => {
  const hasChildComponents = props.group.components && props.group.components.length > 0;

  const rootClasses = classNames(
    'text-left mt-3 pl-3 py-3',
    props.depth % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50',
    props.depth > 0 ? 'rounded-l border-l border-t border-b border-gray-300' : 'rounded-lg',
    {
      'border-r': props.depth === 1
    }
  );

  return (
    <div className={rootClasses}>
      <FieldArray
        name={`${props.path}.components`}
        render={arrayHelpers => {
          function addProduct() {
            arrayHelpers.insert(0, newProduct(props.availableProducts[0].id));
          }

          function addGroup() {
            arrayHelpers.insert(
              props.group.components ? props.group.components.length : 0,
              newGroup()
            );
          }

          return (
            <div>
              <div className={`flex mr-3 ${props.group.components && props.group.components.length > 0 ? 'pb-2' : ''}`}>
                {
                  props.depth === 0 &&
                  <div className="font-bold text-xl w-full">
                    {props.group.label}
                  </div>
                }

                {
                  props.depth > 0 &&
                  <Field name={`${props.path}.label`}>
                    {({ field, form: { isSubmitting } }: FieldProps) => (
                      <input
                        type="text"
                        placeholder="Group Label"
                        {...field}
                        disabled={isSubmitting}
                        className={`font-bold block w-full rounded-md bg-transparent border-gray-300 ${isSubmitting ? 'text-gray-500' : 'shadow-sm'}`} />
                    )}
                  </Field>
                }

                <div className="ml-4">
                  <AddProductButton onClick={addProduct} />
                </div>

                <div className="ml-1">
                  <AddGroupButton onClick={addGroup} />
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
          );
        }}
      />
    </div>
  );
}

export default ComponentGroupCell;
