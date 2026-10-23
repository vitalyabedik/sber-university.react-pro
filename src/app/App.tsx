import { AppRoutes } from "./routes";
import { withProviders } from "./providers";
import "./App.css";

const App = withProviders(AppRoutes);

export default App;
