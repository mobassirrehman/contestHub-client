import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthProvider.jsx";

// Optimized QueryClient configuration for better UX
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests up to 2 times with exponential backoff
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Keep data fresh for 5 minutes (won't refetch if data is less than 5min old)
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes (keeps unused data for quick access)
      gcTime: 10 * 60 * 1000,
      // Don't refetch on window focus (reduces unnecessary requests)
      refetchOnWindowFocus: false,
      // Don't refetch when component mounts if data exists and is fresh
      refetchOnMount: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
