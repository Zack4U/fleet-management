import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./slices/store";
import { Provider } from "react-redux";
import App from "./App";
import { UserProvider } from "./utils/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <UserProvider>
            <App />
        </UserProvider>
    </Provider>
);
