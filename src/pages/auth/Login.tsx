
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LockKeyhole, Mail } from "lucide-react";

// Demo accounts for testing
const demoAccounts = {
  manager: { email: "manager@csrpulse.com", password: "manager123", role: "manager" },
  editor: { email: "editor@csrpulse.com", password: "editor123", role: "editor" },
  me_officer: { email: "me@csrpulse.com", password: "me123", role: "me_officer" },
  recipient: { email: "recipient@csrpulse.com", password: "recipient123", role: "recipient" }
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find matching demo account
    const account = Object.values(demoAccounts).find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      // Store user role in localStorage for demo purposes
      localStorage.setItem("userRole", account.role);
      localStorage.setItem("userEmail", account.email);
      
      toast.success("Login successful!");
      
      // Redirect based on role
      switch (account.role) {
        case "manager":
        case "editor":
        case "me_officer":
          navigate("/dashboard");
          break;
        case "recipient":
          navigate("/projects");
          break;
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">CSR Pulse Connect</CardTitle>
          <p className="text-muted-foreground">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <p>CSR Manager: manager@csrpulse.com / manager123</p>
              <p>Editor: editor@csrpulse.com / editor123</p>
              <p>M&E Officer: me@csrpulse.com / me123</p>
              <p>Recipient: recipient@csrpulse.com / recipient123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
