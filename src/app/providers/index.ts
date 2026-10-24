import { compose } from "shared/lib/compose";
import { withAuthContext } from "./auth/withAuthContext";
import { withToastify } from "./toastify/withToastify";
import { withStore } from "./store/withStore";

export const withProviders = compose(withStore, withAuthContext, withToastify);
