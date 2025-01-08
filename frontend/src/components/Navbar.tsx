import NavItems from "./ui/navitems";
import { ModeToggle } from "./toggle";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
      <div className="p-2 flex gap-2 items-center">
        <span className="md:hidden ml-2"></span>
        <NavItems />
        <div className="ml-auto flex items-center"></div>
        <div
          onClick={() => {
            navigate("/chat");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-message-square"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
