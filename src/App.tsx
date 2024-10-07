import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { routeTree } from './routeTree.gen';
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
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
