import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import CompositeDialogLoadingMask from "./components/CompositeDialogLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { RootState, store } from "../../redux/store";
import { fetchCompositeById, saveComposite, setupNewComposite } from "./compositeEditReducer";
import { Formik, Form, Field, FieldProps } from "formik";
import ComponentGroupCell from "./components/ComponentGroupCell";
import { fetchCompositeProducts } from "../composite-product-list/compositeListReducer";

type CompositeProductParams = {
  readonly uuid?: string;
};

function validateName(compositeName: string): string | null {
  return compositeName ? null : 'Please specify a name';
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
  const history = useHistory();

  let triggerFormSubmit: () => void;

  const onSavePressed = () => {
    if (triggerFormSubmit) {
      triggerFormSubmit();
    }
  }

  return (
    <Dialog onSavePressed={onSavePressed}>
      {
        modelRequest.when<ReactElement>({
          uninitialized: () => <div />,
          loading: () => <CompositeDialogLoadingMask />,
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
                      history.push('/composite-products');
                    }
                  });
                }}>
                {
                  ({ values, submitForm }) => {
                    triggerFormSubmit = submitForm;
                    return (
                      <Form >
                        <Field name='name' validate={validateName}>
                          {({ field, form: { isSubmitting }, meta, }: FieldProps) => (
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
    </Dialog>
  );
};

export default CompositeProductDialog;
