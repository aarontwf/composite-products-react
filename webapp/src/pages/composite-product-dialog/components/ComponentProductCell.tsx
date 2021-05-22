import Product from "../../../domain/models/Product";
import { Field, FieldProps } from "formik";
import DeleteComponentButton from "./buttons/DeleteComponentButton";

interface ComponentProductCellProps {
  readonly availableProducts: Product[];
  readonly path: string;
  readonly disabled?: boolean;
  readonly onRemovePressed: () => void;
}

const ComponentProductCell: React.FC<ComponentProductCellProps> = (props) => {
  return (
    <div className="mt-2 mr-3 flex items-center justify-between">
      <Field name={`${props.path}.productId`}>
        {({ field, form: { isSubmitting },
        }: FieldProps) => (
          <select
            {...field}
            disabled={isSubmitting}
            className="block w-full shadow-sm rounded-md border-gray-300">
            {props.availableProducts.map((it) => <option value={it.id}>{it.name}</option>)}
          </select>
        )}
      </Field>

      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>

      <Field name={`${props.path}.quantity`}>
        {({ field, form: { isSubmitting }, meta, }: FieldProps) => (
          <div>
            <input
              type="number"
              placeholder="Qty"
              {...field}
              disabled={isSubmitting}
              min="1"
              className={`block w-24 rounded-md border-gray-300 ${isSubmitting ? 'text-gray-500' : 'shadow-sm'}`} />
            {
              meta.touched && meta.error &&
              <div className="error">{meta.error}</div>
            }
          </div>
        )}
      </Field>

      <div className="ml-3">
        <DeleteComponentButton onClick={props.onRemovePressed} />
      </div>
    </div>
  );
}

export default ComponentProductCell;
