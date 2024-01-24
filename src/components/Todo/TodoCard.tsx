import { TTodo } from "@/redux/features/todoSlice";
import { Button } from "../ui/button";
import EditModal from "./EditModal";
import { useUpdateTodoMutation } from "@/redux/api/api";

const TodoCard: React.FC<{ todo: TTodo }> = ({ todo }) => {
  const { title, description, isCompleted, priority } = todo;
  // const dispatch = useAppDispatch();
  const [updateTodo, { data, isError, isLoading }] = useUpdateTodoMutation();

  return (
    <div className="flex items-center justify-between border px-3 py-[6px] rounded-md shadow-sm text-base">
      <input
        type="checkbox"
        name="complete"
        id="complete"
        defaultChecked={isCompleted}
        onChange={() => updateTodo({ ...todo, isCompleted: !isCompleted })}
        // onChange={() => dispatch(toggleComplete(todo._id))}
      />
      <span>{title}</span>
      <span>{description}</span>
      <span
        className={`text-base font-light text-white rounded-md px-2 w-[80px] text-center ${
          priority === "high"
            ? "bg-red-600"
            : priority === "medium"
            ? "bg-indigo-600"
            : "bg-green-400"
        }`}
      >
        {priority}
      </span>
      <span
        className={`text-base font-light text-white rounded-md px-2 w-[80px] text-center ${
          isCompleted ? "text-green-600" : "text-red-600"
        }`}
      >
        {isCompleted ? "Done" : "Pending"}
      </span>
      <div className="space-x-3">
        <Button
          className="bg-red-500"
          // onClick={() => dispatch(removeTodo(todo._id))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>

        <EditModal todo={todo} />
      </div>
    </div>
  );
};

export default TodoCard;
