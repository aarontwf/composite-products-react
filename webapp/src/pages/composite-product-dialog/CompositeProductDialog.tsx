import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import ComponentCell from "./components/ComponentCell";
import CompositeDialogLoadingMask from "./components/CompositeDialogLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { RootState, store } from "../../redux/store";
import { fetchCompositeById, saveComposite } from "../../redux/compositeEditReducer";
import { Formik, Form } from "formik";

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
                initialValues={model.compositeProduct.components}
                onSubmit={(values, { setSubmitting }) => {
                  store.dispatch(saveComposite({ ...model.compositeProduct, components: values })).then((it) => {
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
                        {values.map((it, i) => {
                          return <ComponentCell path={`[${i}]`} component={it} key={i} availableProducts={model.availableProducts} />;
                        })}
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
