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
import { TTodo } from "@/redux/features/todoSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddTodoMutation } from "@/redux/api/api";

type TPriority = "high" | "medium" | "low";

const AddModal = () => {
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TPriority>("high");

  /* For Local State Management */
  // const dispatch = useAppDispatch();

  /* For Server */
  const [addTodo, { data, isError, isLoading, isSuccess }] =
    useAddTodoMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodo: TTodo = {
      title: todo,
      description,
      priority: priority,
      isCompleted: false,
    };
    // dispatch(addTodo(newTodo)); //for local
    // for server
    addTodo(newTodo);

    setTodo("");
    setDescription("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient">Add todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Create task, you need to finish</DialogDescription>
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
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="Description"
                className="col-span-3"
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

export default AddModal;
