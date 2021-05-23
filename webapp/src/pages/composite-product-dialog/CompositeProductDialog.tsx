import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import PlaceholderLoadingMask from "../../components/PlaceholderLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { RootState, store } from "../../redux/store";
import { fetchCompositeById, saveComposite, setupNewComposite } from "./compositeEditReducer";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import ComponentGroupCell from "./components/ComponentGroupCell";
import { fetchCompositeProducts } from "../composite-product-list/compositeListReducer";
import ValidationErrorLabel from "./components/ValidationErrorLabel";
import CompositeProductNameValidator from "../../domain/validation/CompositeProductNameValidator";
import Button, { ButtonSize, ButtonType } from "../../components/Button";

type CompositeProductParams = {
  readonly uuid?: string;
};

const CompositeProductDialog: React.FC = () => {
  const routeParams = useParams<CompositeProductParams>();

  useEffect(() => {
    if (routeParams.uuid) {
      store.dispatch(fetchCompositeById(routeParams.uuid));
    } else {
      store.dispatch(setupNewComposite());
    }
  }, [routeParams.uuid]);

  const modelRequest = useSelector((state: RootState) => state.compositeEdit.model);

  const isSaving = useSelector(
    (state: RootState) => state.compositeEdit.saveRequest.maybeWhen(
      { loading: () => true, orElse: () => false }
    )
  )

  const history = useHistory();

  let triggerFormSubmit: () => void;

  const onSavePressed = isSaving ? undefined : () => {
    if (triggerFormSubmit) {
      triggerFormSubmit();
    }
  }

  const closeDialog = () => {
    history.push('/composite-products');
  }

  return (
    <Dialog >
      <div className="p-6">
        {
          modelRequest.when<ReactElement>({
            uninitialized: () => <div />,
            loading: () => <PlaceholderLoadingMask />,
            success: (model) => (
              <div>
                <Formik
                  initialValues={
                    {
                      name: model.compositeProduct.name,
                      contents: {
                        type: 'GROUP',
                        label: 'Components',
                        components: model.compositeProduct.components
                      }
                    }
                  }
                  onSubmit={(values, { setSubmitting }) => {
                    store.dispatch(
                      saveComposite({
                        ...model.compositeProduct,
                        name: values.name,
                        components: values.contents.components
                      })
                    ).then((it) => {
                      setSubmitting(false);
                      if (it.meta.requestStatus === 'fulfilled') {
                        store.dispatch(fetchCompositeProducts());
                        closeDialog();
                      }
                    });
                  }}>
                  {
                    ({ values, submitForm }) => {
                      triggerFormSubmit = submitForm;
                      return (
                        <Form>
                          <Field name='name' validate={CompositeProductNameValidator.validate}>
                            {({ field, form: { isSubmitting } }: FieldProps) => (
                              <div>
                                <input
                                  type="text"
                                  placeholder="Composite Product"
                                  {...field}
                                  disabled={isSubmitting}
                                  className={`block w-full text-xl font-medium rounded-md border-gray-200 ${isSubmitting ? 'text-gray-500' : 'shadow-sm'}`} />
                              </div>
                            )}
                          </Field>

                          <ErrorMessage
                            name='name'
                            render={message => <ValidationErrorLabel>{message}</ValidationErrorLabel>} />

                          <ComponentGroupCell
                            path='contents'
                            group={{
                              label: values.contents.label,
                              type: 'GROUP',
                              components: values.contents.components
                            }}
                            availableProducts={model.availableProducts}
                            depth={0} />
                        </Form>
                      );
                    }
                  }
                </Formik>
              </div>
            ),
            fail: (error) => (
              <div className="py-4">
                <ErrorState title={error.name} description={error.message} />
              </div>
            )
          })
        }
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <Button
          onClick={onSavePressed}
          type={ButtonType.Success}
          size={ButtonSize.Dynamic}>
          Save
        </Button>

        <div className="h-3 sm:h-0 sm:w-3" />

        <Button
          onClick={closeDialog}
          type={ButtonType.Danger}
          size={ButtonSize.Dynamic}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};

export default CompositeProductDialog;
