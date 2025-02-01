import React, { useState } from "react";
import {
  Activity,
  CircleUser,
  Package2,
  Search,
  Menu,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

import {Button} from "@/shadcn/components/ui/button"
import {
    
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
  } from "@/shadcn/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Input } from "@/shadcn/components/ui/input";
import { useNavigate } from "react-router-dom";

const BookedPatients = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Hemakumar", problem: "Fever and Cold", time: "10:30 AM, Jan 28", status: null },
    { id: 2, name: "Vishnu", problem: "Back Pain", time: "11:00 AM, Jan 28", status: null },
    { id: 3, name: "Dhanush", problem: "Back Pain", time: "11:00 AM, Jan 28", status: null },
    { id: 4, name: "Jeffry", problem: "Back Pain", time: "11:00 AM, Jan 28", status: null },
    { id: 5, name: "Yogesh", problem: "Back Pain", time: "11:00 AM, Jan 28", status: null },
  ]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleActionClick = (appointment, type) => {
    setCurrentAppointment(appointment);
    setActionType(type);
    setIsAlertOpen(true);
  };

  const handleConfirm = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === currentAppointment.id
          ? { ...appt, status: actionType }
          : appt
      )
    );
    setIsAlertOpen(false);
    setCurrentAppointment(null);
    setActionType(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground"  onClick={() => {
              navigate("/doctor/dashboard");
            }}>Dashboard</a>
          <a href="#" className="text-foreground transition-colors hover:text-foreground">Patients</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/doctor/profile")}>
            Profile
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("")}>Meet</a>
        </nav>
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
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Appointments</CardTitle>
              <CardDescription>Review and manage pending appointments for doctors.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Appointment Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.problem}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell className="flex gap-2">
                        {appointment.status ? (
                          <span className={`text-sm font-medium ${appointment.status === "accepted" ? "text-green-600" : "text-red-600"}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        ) : (
                          <>
                            <Button
                                className="bg-green-500 hover:bg-green-600 text-white"
                                size="sm"
                                onClick={() => handleActionClick(appointment, "accepted")}
                                >
                                Accept
                                </Button>
                                <Button
                                className="bg-red-500 hover:bg-red-600 text-white"
                                size="sm"
                                onClick={() => handleActionClick(appointment, "rejected")}
                                >
                                Reject
                                </Button>

                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      {isAlertOpen && currentAppointment && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{`Confirm ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}?`}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {actionType} the appointment for <strong>{currentAppointment.name}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button variant={actionType === "accepted" ? "success" : "destructive"} onClick={handleConfirm}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BookedPatients;
