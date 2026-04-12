import { useMemo } from "react";
import type { TaskType } from "../components/TaskType";

type Filters = {
   search: string;
   priority: "all" | "low" | "medium" | "high";
   status: "all" | "completed" | "active";
};

export const useTaskFilters = (tasks: TaskType[], Filters: Filters) => {
   return useMemo(() => {
      return tasks.filter((task) => {
         const matchesSearch = task.title
            .toLowerCase()
            .includes(Filters.search.toLowerCase());

         const matchesPriority =
            Filters.priority === "all" || task.priority === Filters.priority;

         const matchesStatus =
            Filters.status === "all" ||
            (Filters.status === "completed" && task.completed) ||
            (Filters.status === "active" && !task.completed);

         return matchesSearch && matchesPriority && matchesStatus;
      });
   }, [tasks, Filters]);
};
