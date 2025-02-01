
import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Input } from "@/shadcn/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shadcn/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { useNavigate } from "react-router-dom";

const BookedDoctors = () => {
  const navigate = useNavigate();

  // Doctor Data
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", available: ["10:30 AM", "11:00 AM", "11:30 AM"], fee: "₹100", status: null },
    { id: 2, name: "Dr. Johnson", specialty: "Dermatologist", available: ["2:00 PM", "3:00 PM", "4:00 PM"], fee: "₹80", status: null },
    { id: 3, name: "Dr. Williams", specialty: "Neurologist", available: ["9:00 AM", "10:00 AM", "11:00 AM"], fee: "₹150", status: null },
    { id: 4, name: "Dr. Brown", specialty: "Orthopedic", available: ["1:00 PM", "2:30 PM", "4:00 PM"], fee: "₹120", status: null },
    { id: 5, name: "Dr. Davis", specialty: "Pediatrician", available: ["8:30 AM", "9:30 AM", "10:30 AM"], fee: "₹90", status: null },
    { id: 6, name: "Dr. Miller", specialty: "ENT Specialist", available: ["3:00 PM", "4:30 PM", "6:00 PM"], fee: "₹110", status: null },
    { id: 7, name: "Dr. Wilson", specialty: "General Physician", available: ["9:30 AM", "10:30 AM", "11:30 AM"], fee: "₹70", status: null },
    { id: 8, name: "Dr. Moore", specialty: "Psychiatrist", available: ["2:00 PM", "3:30 PM", "5:00 PM"], fee: "₹130", status: null },
    { id: 9, name: "Dr. Taylor", specialty: "Gynecologist", available: ["10:00 AM", "12:00 PM", "2:00 PM"], fee: "₹140", status: null },
    { id: 10, name: "Dr. Anderson", specialty: "Urologist", available: ["11:00 AM", "1:00 PM", "3:00 PM"], fee: "₹160", status: null },
  ]);


  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isPayment, setIsPayment] = useState(false);

  // Causes based on specialty
  const specialtyCauses = {
    Cardiologist: ["Heart Pain", "High Blood Pressure", "Chest Pain"],
    Dermatologist: ["Skin Allergy", "Acne", "Rashes"],
    Neurologist: ["Migraine", "Seizures", "Memory Loss"],
    Orthopedic: ["Back Pain", "Knee Pain", "Fracture"],
    Pediatrician: ["Fever", "Cold", "Cough"],
    "ENT Specialist": ["Ear Infection", "Hearing Loss", "Sinusitis"],
    "General Physician": ["Fever", "Flu", "Weakness"],
    Psychiatrist: ["Anxiety", "Depression", "Insomnia"],
    Gynecologist: ["Menstrual Pain", "Pregnancy Checkup", "PCOS"],
    Urologist: ["Kidney Stones", "Urine Infection", "Bladder Problems"],
  };

  // Handle doctor booking
  const handleBook = (doctor) => {
    setCurrentDoctor(doctor);
    setSelectedCause("");
    setSelectedTime("");
    setIsConfirming(true);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedCause || !selectedTime) return alert("Please select a cause and time slot.");
    setIsConfirming(false);
    setIsPayment(true);
  };

  // Handle payment
  const handlePayment = () => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === currentDoctor.id ? { ...doc, status: "booked" } : doc
      )
    );
    setIsPayment(false);
    setCurrentDoctor(null);
    setSelectedCause("");
    setSelectedTime("");
    alert("Booking confirmed. Payment successful!");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden md:flex md:flex-row md:gap-6">
          <a className="text-muted-foreground" onClick={() => navigate("/patient/dashboard")}>
            Dashboard
          </a>
          <a className="text-foreground" onClick={() => navigate("/patient/doctor")}>
            Doctors
          </a>
          <a className="text-muted-foreground" onClick={() => navigate("/patient/profile")}>
            Profile
          </a>
          <a className="text-muted-foreground" onClick={() => navigate("/patient/support")}>
            Support
          </a>        
        </nav>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Doctors</CardTitle>
            <CardDescription>Select a doctor for consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.fee}</TableCell>
                    <TableCell>
                      {doctor.status === "booked" ? (
                        <span className="text-green-600 font-medium">Booked</span>
                      ) : (
                        <Button
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          size="sm"
                          onClick={() => handleBook(doctor)}
                        >
                          Book Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Booking Dialog */}
        {isConfirming && currentDoctor && (
          <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Booking</DialogTitle>
              </DialogHeader>

              <div className="p-4 space-y-4">
                <p><strong>Doctor Name:</strong> {currentDoctor.name}</p>
                <p><strong>Specialty:</strong> {currentDoctor.specialty}</p>
                <p><strong>Fee:</strong> {currentDoctor.fee}</p>

                {/* Select Cause */}
                <Select onValueChange={setSelectedCause}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cause of Disease" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyCauses[currentDoctor.specialty]?.map((cause, index) => (
                      <SelectItem key={index} value={cause}>{cause}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Select Time Slot */}
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Available Time Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentDoctor.available.map((time, index) => (
                      <SelectItem key={index} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button
                  className="bg-green-500"
                  onClick={handleConfirmBooking}
                  disabled={!selectedCause || !selectedTime}
                >
                  Proceed to Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Payment Dialog */}
        {isPayment && (
          <Dialog open={isPayment} onOpenChange={setIsPayment}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment</DialogTitle>
              </DialogHeader>
              <p>Doctor: {currentDoctor.name}</p>
              <p>Specialty: {currentDoctor.specialty}</p>
              <p>Fee: {currentDoctor.fee}</p>
              <p>Selected Cause: {selectedCause}</p>
              <p>Selected Time Slot: {selectedTime}</p>

              <DialogFooter>
                <Button className="bg-blue-600" onClick={handlePayment}>
                  Confirm Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default BookedDoctors;
