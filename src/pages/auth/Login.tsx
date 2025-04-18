
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, userRole } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      console.log("Login successful, redirecting to app...");
      navigate("/app"); // Redirect to the index page which will handle role-based routing
    } catch (error) {
      console.error("Login error:", error);
      // Error toast is already shown in the login function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Clareo Non Profit</CardTitle>
          <p className="text-muted-foreground">Developed by Regtech Foundation</p>
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
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">Demo Instructions:</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Create a user in Supabase Authentication</p>
              <p>2. Go to the profiles table and update the user's role</p>
              <p>3. Valid roles: manager, csr_manager, editor, me_officer, recipient</p>
              <p>4. Default role for new users: public</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
