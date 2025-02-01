import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar"
import { Badge } from "@/shadcn/components/ui/badge"
import { Button } from "@/shadcn/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu"
import { Input } from "@/shadcn/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom";



const PatientDashboard = () => {
  const {user,signout} = useAuthStore();
  const navigate = useNavigate();
  const handlesignout = () => {
    signout();
    navigate("/signin");
  }
  

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
            onClick={() => {
              navigate("/patient/dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => {
              navigate("/patient/doctor");
            }}
          >
            Doctors
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => {
              navigate("/patient/profile");
            }}
          >
            Profile
          </a>
          <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/patient/support")}
              >
                Support
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/patient/meet")}
              >
                Meet
              </a>                
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </a>
              <a href="#" className="hover:text-foreground">
                Dashboard
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Doctors
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Profile
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Support
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Meet
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search ..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
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
            <DropdownMenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlesignout}>signout</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Total Patients
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,340</div>
              <p className="text-xs text-muted-foreground">
              +500 from last month12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              New Admissions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+120</div>
              <p className="text-xs text-muted-foreground">
              +15% from last week
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Appointments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+320</div>
              <p className="text-xs text-muted-foreground">
              +8% from last week
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Treatments</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+230</div>
              <p className="text-xs text-muted-foreground">
                +20 in the last 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
              <CardTitle>Top-Rated Doctors</CardTitle>
              <CardDescription>
                  Highly recommended doctors based on patient reviews.
              </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
              <a href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
              </a>
              </Button>
          </CardHeader>
          <CardContent>
              <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Experience</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                  <TableCell>
                      <div className="font-medium">Dr. Sophia Carter</div>
                  </TableCell>
                  <TableCell>Cardiology</TableCell>
                  <TableCell>⭐ 4.9</TableCell>
                  <TableCell>Mon-Fri, 10 AM - 4 PM</TableCell>
                  <TableCell>15 years</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <div className="font-medium">Dr. James White</div>
                  </TableCell>
                  <TableCell>Neurology</TableCell>
                  <TableCell>⭐ 4.8</TableCell>
                  <TableCell>Tue-Sat, 11 AM - 5 PM</TableCell>
                  <TableCell>12 years</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <div className="font-medium">Dr. Ava Brown</div>
                  </TableCell>
                  <TableCell>Orthopedics</TableCell>
                  <TableCell>⭐ 4.7</TableCell>
                  <TableCell>Mon-Sat, 9 AM - 3 PM</TableCell>
                  <TableCell>10 years</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <div className="font-medium">Dr. Emma Green</div>
                  </TableCell>
                  <TableCell>Dermatology</TableCell>
                  <TableCell>⭐ 4.6</TableCell>
                  <TableCell>Wed-Sun, 10 AM - 6 PM</TableCell>
                  <TableCell>8 years</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <div className="font-medium">Dr. Liam Davis</div>
                  </TableCell>
                  <TableCell>Pediatrics</TableCell>
                  <TableCell>⭐ 4.5</TableCell>
                  <TableCell>Mon-Fri, 8 AM - 2 PM</TableCell>
                  <TableCell>14 years</TableCell>
                  </TableRow>
              </TableBody>
              </Table>
          </CardContent>
          </Card>


          <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="text-center gap-2">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src="/avatars/patient.png" alt="Patient Profile" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">{user.firstName}{user.lastName}</CardTitle>
            <p className="text-muted-foreground text-base">{user.email}</p>
          </CardHeader>
          <CardContent className="mt-4 grid gap-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-lg">
              <p className="font-semibold">Age:</p>
              <p className="text-muted-foreground">32</p>
              <p className="font-semibold">Gender:</p>
              <p className="text-muted-foreground">Male</p>
              <p className="font-semibold">Blood Type:</p>
              <p className="text-muted-foreground">O+</p>
              <p className="font-semibold">Medical Condition:</p>
              <p className="text-muted-foreground">Hypertension</p>
              <p className="font-semibold">Doctor Assigned:</p>
              <p className="text-muted-foreground">Dr. Emily Johnson</p>
              <p className="font-semibold">Last Visit:</p>
              <p className="text-muted-foreground">Aug 10, 2024</p>
            </div>

            <div className="text-center">
              {/* Add any additional actions or buttons here */}
            </div>
          </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}

export default PatientDashboard