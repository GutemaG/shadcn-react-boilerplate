import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(username, password, "test");
      setError("Failed to login. Please check your credentials.");
      navigate(-1); // Go back to the previous page
    }
  };
  return (
    <div className="flex justify-center h-screen items-center ">
      <form onSubmit={handleLogin}>
        {error && (
          <div className="bg-red-100 p-4 text-red-600 rounded-md mb-4">
            {error}
          </div>
        )}
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>

          <div className="p-2">
            <Label>Do You have an account?</Label>
            <Button variant={"outline"} className="border-0 underline">
              <NavLink to={"/auth/signup"}>Sign Up</NavLink>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
