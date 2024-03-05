import { useState, useEffect } from "react";
import { fetchTasks } from "../tasks/TaskAPI";

export const useFetchTasks = (refresh) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchTasks();
      setTasks(resp);
      setLoading(false);
    }

    fetchData();
  }, [refresh])
  return { tasks, setTasks, loading };
};

