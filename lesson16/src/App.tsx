// import { useState } from "react";
import "./App.css";
import { Layout } from "@/components/Layout";
// import type { AppPage } from "@/navigation";
import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { MemberWelcomePage } from "./pages/MemberWelcomePage";

function App() {
  //  const [page, setPage] = useState<AppPage>("home");

   return (
      <Routes>
         <Route path="/" element={<Layout />} >
            <Route index element={<HomePage/>} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="welcome"
              element={
                <ProtectedRoute>
                  <MemberWelcomePage />
                </ProtectedRoute>
              } 
            />
         </Route>
      </Routes>
   );
}

export default App;
