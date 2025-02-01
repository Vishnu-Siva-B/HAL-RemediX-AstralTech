import React, { useState } from "react";
import { Package2, Menu, Search, CircleUser } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/shadcn/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/shadcn/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../components/chatbot/chatbot";



function Support() {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar Header */}
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/dashboard")}>
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/doctor")}>
            Doctors
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/profile")}>
            Profile
          </a>
          <a href="#" className="text-foreground hover:text-foreground" onClick={() => navigate("/patient/support")}>
            Support
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/patient/meet")}>
            Meet
          </a>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </a>
              <a href="#" className="hover:text-foreground">Dashboard</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Doctor</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Profile</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Chat</a>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search ..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <Chatbot/>
    </div>

  );
}

export default Support;
