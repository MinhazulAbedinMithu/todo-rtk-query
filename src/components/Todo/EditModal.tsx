import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { TTodo, updateTodo } from "@/redux/features/todoSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUpdateTodoMutation } from "@/redux/api/api";

type TPriority = "high" | "medium" | "low";

const EditModal: React.FC<{ todo: TTodo }> = ({ todo }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [priority, setPriority] = useState<TPriority>(todo.priority);
  // const dispatch = useAppDispatch();
  const [updateTodo, { isError, isLoading, data }] = useUpdateTodoMutation();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const editedTodo: TTodo = {
      // id: todo.id,
      title,
      description,
      priority,
      isCompleted: todo.isCompleted,
    };
    // dispatch(updateTodo(editedTodo));
    updateTodo({ id: todo._id, data: editedTodo });
    setTitle("");
    setDescription("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Edit task, you need to finish</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Todo" className="text-right">
                Todo
              </Label>
              <Input
                id="Todo"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="Description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="Priority" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(e: TPriority) => setPriority(e)}
                defaultValue="high"
                value={priority}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-center">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
