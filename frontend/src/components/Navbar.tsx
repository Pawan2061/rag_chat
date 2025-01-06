// import MobileNavbarDrawer from "./mobile-nav";
import { buttonVariants } from "./ui/button";
import { BookIcon, UserIcon } from "lucide-react";
import NavItems from "./ui/navitems";
import { ModeToggle } from "./toggle";
// import { NavItems } from "./nav-icons";
// import { Logo } from "./logo";

export default function NavBar() {
  //   const user = await currentUser();

  //   if (!user) {
  //     return (
  //       <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
  //         <div className="p-2 flex gap-2 items-center">
  //           <link href="/">
  //             <Logo />
  //           </link>
  //           <div className="ml-auto items-center">
  //             <div className={buttonVariants({})}>hi</div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
      <div className="p-2 flex gap-2 items-center">
        <span className="md:hidden ml-2">{/* <MobileNavbarDrawer /> */}</span>
        {/* <link href="/">hi</link> */}
        <NavItems />
        <div className="ml-auto flex items-center"></div>
        <span>
          <UserIcon />
        </span>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
