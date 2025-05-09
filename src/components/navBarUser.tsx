
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarLogoutButton from "./sideBarLogoutButton";

export default function NavBarUser() {
  return (
    <nav className=" px-4 py-3 shadow-sm flex justify-end items-center me-12">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="rounded-full focus:outline-none">
            <Image
              src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full border"
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          sideOffset={8}
          className="bg-gray-800  border-gray-200 rounded-md shadow-md min-w-[160px] p-1 z-50"
        >
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-100 hover:bg-gray-600 rounded"
            >
              <User size={16} /> Profile
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

          <DropdownMenu.Item asChild>
            <li className="list-none px-1 py-1">
              <SidebarLogoutButton />
            </li>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
}
