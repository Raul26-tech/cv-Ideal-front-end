import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 p-10 flex justify-end items-center fixed shadow drop-shadow-border bg-white">
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Button variant="outline" className="flex">
            <span className="min-w-20 text-gray-500">
              {user?.name.split(" ")[0]}
            </span>
            {open ? (
              <ExpandLessIcon color="action" />
            ) : (
              <ExpandMoreIcon color="action" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="w-full">
            <Button
              variant="link"
              className="flex justify-around"
              onClick={signOut}
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
