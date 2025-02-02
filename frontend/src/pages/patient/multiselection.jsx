import { useState } from "react";
import Select from "react-select";
import { Search, CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/shadcn/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/shadcn/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import MultiSelect from '../../static/main/images/multiselect.jpg';

const SymptomSelector = () => {
  const [symptoms, setSymptoms] = useState({ suggested: [], regular: [] });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [query, setQuery] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const navigate = useNavigate();

  const fetchSymptoms = async (input) => {
    try {
      const selectedValues = selectedSymptoms.map((symptom) => symptom.value);
      const response = await fetch(
        `http://127.0.0.1:5000/search_symptoms?q=${input}&selected=${JSON.stringify(selectedValues)}`
      );
      const data = await response.json();

      if (selectedSymptoms.length > 0 && input.length === 0) {
        setSymptoms({ suggested: data.suggested, regular: [] });
      } else {
        setSymptoms(data);
      }
      setMenuIsOpen(input.length > 0);  // Open the menu only if input length > 0
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  const handleInputChange = (input) => {
    setQuery(input);
    if (input.length > 0) {
      fetchSymptoms(input);
    } else {
      setSymptoms({ suggested: [], regular: [] });
      setMenuIsOpen(false);  // Close the menu when input is cleared
    }
  };

  const handleChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions);
    fetchSymptoms("");
    setMenuIsOpen(true);
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setLoading(true);
    setError(null);
    setPredictions([]);

    try {
      const selectedValues = selectedSymptoms.map((symptom) => symptom.value);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedValues }),
      });

      if (!response.ok) throw new Error("Prediction failed");

      const data = await response.json();
      setPredictions(data.prediction);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{
        backgroundImage: `url(${MultiSelect})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header Section */}
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
            className="text-muted-foreground transition-colors hover:text-foreground"
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
            className="text-foreground hover:text-foreground"
            onClick={() => navigate("/patient/multi-select")}
          >
            Remedy
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
              <a href="#" className="text-muted-foreground hover:text-foreground">
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-[10%] p-4 ">
        <div className="relative w-[22rem]">
          <label className="block text-lg font-semibold text-gray-700 text-center mb-1">
            Enter the name of the Symptoms
          </label>
          <Select
            isMulti
            name="symptoms"
            options={
              query.length > 0 || selectedSymptoms.length > 0
                ? [
                    {
                      label: "Co-occurring Symptoms",
                      options: selectedSymptoms.length > 0
                        ? symptoms.suggested.map((symptom) => ({
                            value: symptom,
                            label: symptom,
                          }))
                        : [],
                    },
                    {
                      label: "Symptoms",
                      options: query.length > 0
                        ? symptoms.regular.map((symptom) => ({
                            value: symptom,
                            label: symptom,
                          }))
                        : [],
                    },
                  ]
                : []
            }
            className="basic-multi-select w-[130%] ml-[-15%]"
            classNamePrefix="select"
            value={selectedSymptoms}
            onChange={handleChange}
            onInputChange={handleInputChange}
            noOptionsMessage={() => null}
            menuIsOpen={menuIsOpen}
            isDisabled={isPredicting}
          />
        </div>
        <button
          onClick={handlePredict}
          className="w-[21rem] mt-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          disabled={selectedSymptoms.length === 0 || loading || isPredicting}
        >
          {loading ? "Loading..." : "Predict"}
        </button>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {predictions.length > 0 && (
        <div className="mt-6 w-full max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Disease Prediction and Home Remedies</h1>
            {predictions.map((prediction, index) => (
            <div key={index} className="faq-item bg-white rounded-lg shadow-xl mb-6 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h2 className="font-semibold text-2xl text-indigo-600 mb-3">{prediction.disease}</h2>
                <div className="text-gray-700">
                <h3 className="font-medium text-lg text-gray-800 mb-2">Symptoms:</h3>
                <p className="mb-4">{prediction.symptoms}</p>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Home Remedies:</h3>
                <p>{prediction.remedies}</p>
                </div>
            </div>
            ))}
        </div>
       )}
      </div>
    </div>
  );
};

export default SymptomSelector;
