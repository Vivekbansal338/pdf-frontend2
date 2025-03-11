import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomePage2 from "./pages/HomePage2";
import Protect from "./pages/Protect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <GlobalStyles />
            <Routes>
              <Route path="/" element={<Protect />}>
                <Route index element={<HomePage2 />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools buttonPosition="top-left" />
        </QueryClientProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PersistGate>
    </Provider>
  );
}
