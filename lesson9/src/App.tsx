import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "@/components/Layout";
import { IndexPage } from "./pages/IndexPage";


function App() {
   

   return (
      <div>
         <div>
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route index element={<IndexPage />} />
               </Route>
            </Routes>
         </div>
         
      </div>
   );
}

export default App;
