// import { Button } from "../ui/button";
import AddModal from "./AddModal";
import TodoCard from "./TodoCard";
import { TTodo } from "@/redux/features/todoSlice";
import FilterDropdown from "./FilterDropdown";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
  const [filterPriority, setFilterPriority] = useState("");
  // local state
  // const { filteredTodos } = useAppSelector((state) => state.todo);

  // server state
  const { isLoading, isError, data: todos } = useGetTodosQuery(filterPriority);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <AddModal />

        <FilterDropdown
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
        />
      </div>
      <div className="bg-primary-gradient p-[6px] rounded-xl my-5">
        <div className="bg-white p-4 rounded-xl space-y-3">
          {
            // todos.length > 0 ? (
            todos?.map((todo: TTodo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))
            // ) : (
            //   <div>
            //     <h4 className="text-center text-2xl">There is no task</h4>
            //   </div>
            // )
          }
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
