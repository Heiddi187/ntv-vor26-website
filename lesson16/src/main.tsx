import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { AuthProvider } from "./auth/AuthProvider.tsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
         <AuthProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </AuthProvider>
      </ClerkProvider>
   </StrictMode>,
);
