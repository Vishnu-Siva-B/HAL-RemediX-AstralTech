import { ThemeProvider } from "@/shadcn/components/theme-provider"
import Router from "./router.jsx";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";


function App() {
  const { isCheckingAuth,checkAuth, isAuthenticated,user  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
