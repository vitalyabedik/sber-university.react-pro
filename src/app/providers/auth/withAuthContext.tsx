import type { ComponentType } from "react";
import { AuthProvider } from "features/authRouting";

export const withAuthContext =
  <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => (
    <AuthProvider>
      <WrappedComponent {...props} />
    </AuthProvider>
  );
