import type { ComponentType } from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";

export const withStore =
  <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => (
    <Provider store={store}>
      <WrappedComponent {...props} />
    </Provider>
  );
