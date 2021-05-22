import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import CompositeDialogLoadingMask from "./components/CompositeDialogLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { RootState, store } from "../../redux/store";
import { fetchCompositeById, saveComposite } from "../../redux/compositeEditReducer";
import { Formik, Form } from "formik";
import ComponentGroupCell from "./components/ComponentGroupCell";

type CompositeProductParams = {
  readonly uuid: string;
};

const CompositeProductDialog: React.FC = () => {
  const routeParams = useParams<CompositeProductParams>();

  useEffect(() => {
    store.dispatch(fetchCompositeById(routeParams.uuid));
  }, [routeParams.uuid]);

  const modelRequest = useSelector((state: RootState) => state.compositeEdit.model);
  const history = useHistory();

  const dialogTitle = modelRequest.maybeWhen({
    success: (model) => model.compositeProduct.name,
    orElse: () => 'Composite Product'
  });

  let triggerFormSubmit: () => void;

  const onSavePressed = () => {
    if (triggerFormSubmit) {
      triggerFormSubmit();
    }
  }

  return (
    <Dialog title={dialogTitle} onSavePressed={onSavePressed}>
      {
        modelRequest.when<ReactElement>({
          uninitialized: () => <div>Uninit</div>,
          loading: () => <CompositeDialogLoadingMask />,
          success: (model) => (
            <div>
              <Formik
                initialValues={
                  {
                    type: 'GROUP',
                    label: 'Components',
                    components: model.compositeProduct.components
                  }
                }
                onSubmit={(values, { setSubmitting }) => {
                  store.dispatch(saveComposite({ ...model.compositeProduct, components: values.components })).then((it) => {
                    setSubmitting(false);
                    if (it.meta.requestStatus === 'fulfilled') {
                      history.push('/composite-products');
                    }
                  });
                }}>
                {
                  ({ values, submitForm }) => {
                    triggerFormSubmit = submitForm;
                    return (
                      <Form >
                        <ComponentGroupCell
                          path=''
                          group={{
                            label: values.label,
                            type: 'GROUP',
                            components: values.components
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
