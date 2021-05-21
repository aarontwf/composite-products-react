import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ComponentCell from "./components/ComponentCell";
import CompositeDialogLoadingMask from "./components/CompositeDialogLoadingMask";
import Dialog from "../../components/Dialog";
import ErrorState from "../../components/ErrorState";
import { RootState, store } from "../../redux/store";
import { fetchCompositeById } from "../../redux/compositeEditReducer";

type CompositeProductParams = {
  readonly uuid: string;
};

const CompositeProductDialog: React.FC = () => {
  const routeParams = useParams<CompositeProductParams>();

  useEffect(() => {
    store.dispatch(fetchCompositeById(routeParams.uuid));
  }, [routeParams.uuid]);

  const modelRequest = useSelector((state: RootState) => state.compositeEdit.model);

  const dialogTitle = modelRequest.maybeWhen({
    success: (model) => model.compositeProduct.name,
    orElse: () => 'Composite Product'
  });

  return (
    <Dialog title={dialogTitle}>
      {
        modelRequest.when<ReactElement>({
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
