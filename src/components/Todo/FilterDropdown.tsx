import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { TFilter, applyFilter } from "@/redux/features/todoSlice";

const FilterDropdown = () => {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary-gradient">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          onValueChange={(e) => dispatch(applyFilter(e as TFilter))}
        >
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
