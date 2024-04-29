import "./App.css";
import { UserCreateComponent } from "./components/users/UserCreateComponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer,
});

function App() {
    return (
        <Provider store={store}>
            <UserCreateComponent />
        </Provider>
    );
}

export default App;
