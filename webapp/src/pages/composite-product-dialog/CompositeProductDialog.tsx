import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { useParams } from "react-router";
import ComponentCell from "./components/ComponentCell";
import CompositeDialogLoadingMask from "./components/CompositeDialogLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { AsyncState, Success } from "../../presentation/AsyncState";
import { CompositeProductDialogModel, CompositeProductDialogState, compositeProductDialogStore, fetchCompositeById } from "./compositeProductDialogStore";

type CompositeProductParams = {
  readonly uuid: string;
};

const CompositeProductDialog: React.FC = () => {
  return (
    <Provider store={compositeProductDialogStore}>
      <CompositeProductDialogContent />
    </Provider>
  );
};

const CompositeProductDialogContent: React.FC = () => {
  const routeParams = useParams<CompositeProductParams>();

  useEffect(() => {
    compositeProductDialogStore.dispatch(fetchCompositeById(routeParams.uuid));
  }, [routeParams.uuid]);

  const modelRequest = useSelector<CompositeProductDialogState, AsyncState<CompositeProductDialogModel>>(
    state => state.model
  );

  return (
    <Dialog title={modelRequest instanceof Success ? modelRequest.data.compositeProduct.name : 'Composite Product'}>
      <div></div>
      {modelRequest.when({
        uninitialized: () => <div>Uninit</div>,
        loading: () => <CompositeDialogLoadingMask />,
        success: (model) => (
          <div>
            {model.compositeProduct.components.map((it, i) => {
              return <ComponentCell component={it} key={i} availableProducts={model.availableProducts} />;
            })}
          </div>
        ),
        fail: (error) => (
          <ErrorState name={error.name} message={error.message} />
        )
      })}
    </Dialog>
  );
};

export default CompositeProductDialog;
