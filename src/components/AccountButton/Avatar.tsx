import { useUser } from "../../hooks/useUser";
import { User2Icon } from "lucide-react";

function trim(name: string) {
  const ps = name.split(" ");

  if (ps.length > 1) {
    const f_name = ps[0] as string;
    const l_name = ps[1] as string;
    return (f_name[0] || "") + (l_name[0] || "");
  }

  const f_letter = name[0];
  const l_letter = name[-1];
  return (f_letter || "") + (l_letter || "");
}

export default function Avatar() {
  const { user } = useUser();

  if (!user)
    return (
      <div id="user-icon-holder">
        <User2Icon />
      </div>
    );

  return (
    <div id="user-icon-holder">
      <span>{trim(user.name)}</span>
    </div>
  );
}
