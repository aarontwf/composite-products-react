import Product from "../../../domain/models/Product";
import { Field, FieldProps, ErrorMessage } from "formik";
import DeleteComponentButton from "./buttons/DeleteComponentButton";
import QuantityValidator from "../../../domain/validation/QuantityValidator";
import ValidationErrorLabel from "./ValidationErrorLabel";

interface ComponentProductCellProps {
  readonly availableProducts: Product[];
  readonly path: string;
  readonly onRemovePressed: () => void;
}

const ComponentProductCell: React.FC<ComponentProductCellProps> = (props) => {
  const productIdPath = `${props.path}.productId`;
  const quantityPath = `${props.path}.quantity`;
  return (
    <div className="mt-2 mr-3">
      <div className="flex items-center justify-between">
        <Field name={productIdPath}>
          {({ field, form: { isSubmitting },
          }: FieldProps) => (
            <select
              {...field}
              disabled={isSubmitting}
              className="block w-full shadow-sm rounded-md border-gray-300">
              {props.availableProducts.map((it) => <option key={it.id} value={it.id}>{it.name}</option>)}
            </select>
          )}
        </Field>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>

        <Field name={quantityPath} validate={QuantityValidator.validate}>
          {({ field, form: { isSubmitting }, meta, }: FieldProps) => (
            <div>
              <input
                type="number"
                placeholder="Qty"
                {...field}
                disabled={isSubmitting}
                min="1"
                className={`block w-24 rounded-md border-gray-300 ${isSubmitting ? 'text-gray-500' : 'shadow-sm'}`} />
            </div>
          )}
        </Field>

        <div className="ml-3">
          <DeleteComponentButton onClick={props.onRemovePressed} />
        </div>
      </div>

      <ErrorMessage
        name={quantityPath}
        render={message => <ValidationErrorLabel>{message}</ValidationErrorLabel>} />
    </div>
  );
}

export default ComponentProductCell;
