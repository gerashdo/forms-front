import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";


const queryClient = new QueryClient();

const router = createRouter({routeTree});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
