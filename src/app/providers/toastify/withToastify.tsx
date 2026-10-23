import type { ComponentType } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const withToastify =
  <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => (
    <>
      <WrappedComponent {...props} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
