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

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

 

const Dashboard = () => {
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
              navigate("/doctor/dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => {
              navigate("/doctor/appointment");
            }}
          >
            Patients
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => {
              navigate("/doctor/profile");
            }}
          >
            Profile
          </a>
          <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("")}
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
                Patients
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
                Chat
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
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231.89</div>
              <p className="text-xs text-muted-foreground">
              +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
               New Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+500</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,230</div>
              <p className="text-xs text-muted-foreground">
              +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+173</div>
              <p className="text-xs text-muted-foreground">
                +30 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                Recent appointments and billing details.
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
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden xl:table-column">Procedure</TableHead>
                  <TableHead className="hidden xl:table-column">Status</TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Sophia Carter</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      sophia.carter@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Cardiac Checkup
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right">₹200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">James White</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      james.white@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Surgery Consultation
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-24
                  </TableCell>
                  <TableCell className="text-right">₹150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Ava Brown</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      ava.brown@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Physiotherapy Session
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-25
                  </TableCell>
                  <TableCell className="text-right">₹120.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Emma Green</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      emma.green@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Routine Checkup
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-26
                  </TableCell>
                  <TableCell className="text-right">₹100.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Liam Davis</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam.davis@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Diagnostic Tests
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-27
                  </TableCell>
                  <TableCell className="text-right">₹300.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

          <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="text-center gap-2">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src="/avatars/doctor.png" alt="Doctor Profile" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">Dr. Emily Johnson</CardTitle>
            <p className="text-muted-foreground text-base">emily.johnson@hospital.com</p>
          </CardHeader>
          <CardContent className="mt-4 grid gap-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-lg">
              <p className="font-semibold">Age:</p>
              <p className="text-muted-foreground">45</p>
              <p className="font-semibold">Specialty:</p>
              <p className="text-muted-foreground">Cardiology</p>
              <p className="font-semibold">Experience:</p>
              <p className="text-muted-foreground">20+ Years</p>
              <p className="font-semibold">Clinic:</p>
              <p className="text-muted-foreground">HeartCare Center</p>
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

export default Dashboard