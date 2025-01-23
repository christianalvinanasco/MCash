import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Users, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VirtualDemoForm } from "@/components/VirtualDemoForm";
import { MeetingSchedules } from "@/components/MeetingSchedules";
import { VideoUploadForm } from "@/components/VideoUploadForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type UserRole = "main_admin" | "first_division" | "other_division" | "client";

interface User {
  username: string;
  password: string;
  role: UserRole;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate against a backend
    setIsLoggedIn(true);
    toast({
      title: "Welcome back!",
      description: `Logged in successfully as ${role}`,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new user in the backend
    toast({
      title: "Registration successful!",
      description: "You can now log in with your credentials",
    });
    setIsRegistering(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="flex flex-col justify-center space-y-6">
            <img 
              src="/lovable-uploads/04bf138c-8fee-4b16-8631-c3deaf4806c2.png" 
              alt="ML Logo" 
              className="h-24 object-contain mb-8"
            />
            <div className="space-y-6 max-w-md">
              <h2 className="text-xl font-semibold">
                {isRegistering ? "Create an account" : "Please enter your credentials"}
              </h2>
              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {isRegistering && (
                  <select
                    className="w-full p-2 border rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                  >
                    <option value="client">Client (RM)</option>
                    <option value="main_admin">Main Admin</option>
                    <option value="first_division">First Division</option>
                    <option value="other_division">Other Division</option>
                  </select>
                )}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  {isRegistering ? "Register" : "Log-in"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="w-full"
                >
                  {isRegistering ? "Already have an account? Log in" : "Don't have an account? Register"}
                </Button>
              </form>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="/lovable-uploads/b894b7d3-4cad-409d-b076-092346bb35d2.png"
              alt="ML Payroll"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: "Schedule a Virtual Demo",
      icon: Video,
      onClick: () => setShowDemoForm(true),
      color: "bg-blue-500",
    },
    {
      title: "Check Meeting Schedules",
      icon: Calendar,
      onClick: () => setShowMeetings(true),
      color: "bg-green-500",
    },
    {
      title: "ML Payroll PRO Virtual Walkthrough",
      icon: PlayCircle,
      onClick: () => setShowVideoUpload(true),
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-red-600">WELCOME!</h1>
          <p className="text-2xl text-gray-600">
            How can I support you today?
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dashboardCards.map((card) => (
            <Card 
              key={card.title}
              className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={card.onClick}
            >
              <div className="flex flex-col items-center space-y-4">
                <card.icon className={`w-16 h-16 ${card.color} text-white p-3 rounded-full group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule a Virtual Demo</DialogTitle>
            </DialogHeader>
            <VirtualDemoForm onClose={() => {
              setShowDemoForm(false);
              setShowMeetings(true);
            }} />
          </DialogContent>
        </Dialog>

        <Dialog open={showMeetings} onOpenChange={setShowMeetings}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Meeting Schedules</DialogTitle>
            </DialogHeader>
            <MeetingSchedules />
          </DialogContent>
        </Dialog>

        <Dialog open={showVideoUpload} onOpenChange={setShowVideoUpload}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Video Material</DialogTitle>
            </DialogHeader>
            <VideoUploadForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;