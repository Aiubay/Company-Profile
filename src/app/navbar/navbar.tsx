import { BorderBeam } from "@/components/magicui/border-beam";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./darkmode";

export default function Navbar() {
  return (
    <nav className="relative shadow-md">
      <BorderBeam size={550} duration={12} />
      <div className="flex justify-between items-center w-full px-4 py-2">
        <Link href="/" className="text-xl font-bold">
          My Website
        </Link>
        <NavigationMenu>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <ModeToggle />
          </NavigationMenuLink>

        </NavigationMenu>
      </div>
    </nav>
  );
}
