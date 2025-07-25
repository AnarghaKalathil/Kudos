import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { loginAPI } from "@/lib/api";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Always clear old tokens before login
      localStorage.removeItem('authToken');
      localStorage.removeItem('accessToken');
      const response = await loginAPI({ email: data.email, password: data.password });
      console.log('Login API (frontend) response:', response);
      if (response && response.data && response.status) {
        // Set the correct token key for your app
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        localStorage.setItem('isSuperuser', response.data.user_data.is_superuser ? 'true' : 'false');
        localStorage.setItem('user', JSON.stringify({
          user_id: response.data.user_id,
          username: response.data.username,
          email: response.data.email,
          ...response.data.user_data
        }));
        toast({
          title: "Login successful!",
          description: response.message || "Welcome back to Kudos",
        });
        if (response.data.user_data.is_superuser) {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Illustration and message */}
    <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-white/80 p-12 text-foreground">
          <div className="w-full flex flex-col items-center justify-center h-full">
            <img
              src="/Frame_1.png"
              alt="Recognize teammates"
              className="max-w-xl w-full h-auto rounded-xl shadow-2xl mx-auto"
            />
          </div>
        </div>

        {/* Right: Login form */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-12 bg-white">
          {/* Logo and Welcome */}
          <div className="flex flex-col items-center mb-6 w-full">
            <img src="/Logoone.png" alt="Kudos Logo" className="h-14 w-14 rounded-xl shadow mb-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">Kudos</h1>
            <p className="text-gray-500 mb-4">Please login to your account</p>
          </div>
          {/* Login Form */}
          <Card className="w-full bg-transparent shadow-none border-none p-0 m-0">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 bg-gray-100 border-none focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-12 bg-gray-100 border-none focus:ring-2 focus:ring-primary pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-lg font-semibold shadow-md hover:scale-105 transition-transform"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Login"}
                  </Button>
                </form>
              </Form>
              <div className="text-center text-sm text-gray-500">
               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;