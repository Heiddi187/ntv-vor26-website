import { useEffect, useState } from "react";
import "./App.css";
import type { ProjectType } from "./components/ProjectType";

const App = () => {
   const [projects, setProjects] = useState<ProjectType[]>(() => {
      try {
         const storedProjects = localStorage.getItem("projects");
         return storedProjects ? JSON.parse(storedProjects) : [];
      } catch {
         return [];
      }
   });

   useEffect(() => {
      localStorage.setItem("projects", JSON.stringify(projects));
   }, [projects]);

   const deleteProject = (id: number) => {
      const confirmDelete = window.confirm(
         "Sure you wanna delete this project??",
      );
      if (confirmDelete) {
         setProjects(projects.filter((project) => project.id !== id));
      }
   };

   return (
    <div>
      <h1>Hello</h1>
    </div>
   )
};

export default App;

// ----- projects og tasks -----

// búa til nýtt project
// listi yfir projects
// hvert project getur verið með >1 task
// þegar þú ýtir á project sérðu töskin
// bæta við task
// breyta task
// eyða task
// merkja task done
// leita í tasks ???
// sía eftir stöðu / forgang
// dashboard með completion rate
