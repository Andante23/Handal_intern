import { useQuery } from "@tanstack/react-query";

import { Todo } from "../types/types";
function useTodoQuery(){


    const fetchTodos = async ():Promise<Todo[]> =>{
        const response = await fetch(`${import.meta.env.VITE_JSON_PLACEHOLDER_URL}`);
  
        if(!response.ok){
          throw new Error('network response was not ok');
        }
        return response.json();
  }
  
  



    const { data, error, isLoading } = useQuery<Todo[], Error>({
        queryKey: [  `${import.meta.env.VITE_TANSTACK_QUERY_KEY}`],
        queryFn: fetchTodos,
      });


      return {data, error,isLoading}

}


export default useTodoQuery;