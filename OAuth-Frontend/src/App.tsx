import { Provider } from "react-redux";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { store } from "./redux/store";
import SnackBarComponent from "./components/common/SnackBarComponent";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <SnackBarComponent />
    </Provider>
  );
}

export default App;
