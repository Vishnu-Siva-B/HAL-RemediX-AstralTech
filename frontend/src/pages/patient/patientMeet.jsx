import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package2, Menu, CircleUser } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/shadcn/components/ui/sheet";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/shadcn/components/ui/dropdown-menu";

const VideoMeeting = () => {
  const jitsiContainer = useRef(null);
  const [jitsi, setJitsi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI && !jitsi) {
        initializeJitsi();
      } else if (!window.JitsiMeetExternalAPI) {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => initializeJitsi();
        document.body.appendChild(script);
      }
    };

    const initializeJitsi = () => {
      if (!jitsiContainer.current || jitsi) return;
      
      const domain = "meet.jit.si";
      const options = {
        roomName: "YourCustomRoomName",
        width: "100%",
        height: "100%",
        parentNode: jitsiContainer.current,
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsi(api);
    };

    loadJitsiScript();

    return () => {
      if (jitsi) {
        jitsi.dispose();
        setJitsi(null);
      }
    };
  }, [jitsi]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/dashboard")}>Dashboard</a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/doctors")}>Doctors</a>
          <a className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/profile")}>Profile</a>
          <a className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/patient/support")}>Support</a>
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
              <a className="hover:text-foreground">Dashboard</a>
              <a className="text-muted-foreground hover:text-foreground">Doctors</a>
              <a className="text-muted-foreground hover:text-foreground">Profile</a>
              <a className="text-muted-foreground hover:text-foreground">Chat</a>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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

      <div
        ref={jitsiContainer}
        className="flex-1 bg-black w-full"
        style={{ height: "calc(100vh - 64px)", overflowY: "hidden" }}
      ></div>
    </div>
  );
};

export default VideoMeeting;
