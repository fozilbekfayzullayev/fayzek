import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./contex/globalContex.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient yaratish
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Window focus bo'lganda qayta yuklamasin
      retry: 1, // Xato bo'lsa 1 marta qayta urinadi
      staleTime: 5 * 60 * 1000, // 5 daqiqa - ma'lumot "eski" hisoblanmasin
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </QueryClientProvider>
);
