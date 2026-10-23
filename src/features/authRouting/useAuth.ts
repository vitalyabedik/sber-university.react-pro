import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextModel } from "shared/model/auth";

export const useAuth = (): AuthContextModel => useContext(AuthContext);
