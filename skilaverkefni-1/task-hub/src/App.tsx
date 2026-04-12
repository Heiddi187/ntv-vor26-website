// import { useEffect, useState } from "react";
import "./App.css";
// import type { ProjectType } from "./components/ProjectType";
import ProjectForm from "./components/ProjectForm";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import type { TaskType } from "./components/TaskType";
import ProjectList from "./components/ProjectList";
import { useProjectStore } from "./store/useProjectStore";

const App = () => {
   // Projects //

   // const [projects, setProjects] = useState<ProjectType[]>(() => {
   //    try {
   //       const storedProjects = localStorage.getItem("projects");
   //       return storedProjects ? JSON.parse(storedProjects) : [];
   //    } catch {
   //       return [];
   //    }
   // });

   // useEffect(() => {
   //    localStorage.setItem("projects", JSON.stringify(projects));
   // }, [projects]);

   // const deleteProject = (id: number) => {
   //    const confirmDelete = window.confirm(
   //       "Sure you wanna delete this project??",
   //    );
   //    if (confirmDelete) {
   //       setProjects(projects.filter((project) => project.id !== id));
   //    }
   // };

   // Zustand //

   //const projects = useProjectStore((state) => state.projects)

   return (
    <div className="max-w-lg mx-auto mt-14 p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* <ProjectForm setProjects={setProjects}></ProjectForm> */}
      <ProjectForm />
      {/* <ProjectList projects={projects} deleteProject={deleteProject} setProjects={setProjects}></ProjectList> */}
      <ProjectList />
      {/* <TaskList tasks={tasks} deleteTask={deleteTask}></TaskList>
      <TaskForm addTask={addTask}></TaskForm> */}
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
