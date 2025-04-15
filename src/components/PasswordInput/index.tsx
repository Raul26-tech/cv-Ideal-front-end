import { Visibility, VisibilityOff } from "@mui/icons-material";
import { forwardRef, useState } from "react";
import { Input } from "../ui/input";

const PasswordInput = forwardRef<HTMLInputElement>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        placeholder="********"
        type={showPassword ? "text" : "password"}
        className="pr-10"
        ref={ref}
      />
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <VisibilityOff width={10} className="text-gray-400" />
        ) : (
          <Visibility width={10} className="text-gray-400" />
        )}
      </div>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
