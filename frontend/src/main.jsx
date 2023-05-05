import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "react-datepicker/dist/react-datepicker.css"; // css for datepicker
import UserProvider from "./providers/UserProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
