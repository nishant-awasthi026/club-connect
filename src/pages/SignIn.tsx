import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GraduationCap, Building2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [studentForm, setStudentForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [organizationForm, setOrganizationForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleStudentInputChange = (field: string, value: string | boolean) => {
    setStudentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleOrganizationInputChange = (field: string, value: string | boolean) => {
    setOrganizationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle student sign in here
    console.log('Student sign in:', studentForm);
    // Navigate to student dashboard after successful sign in
    navigate('/student-dashboard');
  };

  const handleOrganizationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle organization sign in here
    console.log('Organization sign in:', organizationForm);
    // Navigate to organizer dashboard after successful sign in
    navigate('/organizer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-purple-glow opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" />
      
      {/* Floating elements */}
      <div className="absolute top-32 right-20 w-3 h-3 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary-glow rounded-full animate-pulse" />
      <div className="absolute top-40 left-1/3 w-4 h-4 bg-accent rounded-full animate-pulse opacity-60" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Sign in to your account to continue
            </p>
          </div>

          {/* Sign In Form */}
          <Card className="bg-gradient-card border border-white/10 shadow-purple backdrop-blur-sm">
            <CardContent className="p-8">
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-white/20 mb-6">
                  <TabsTrigger 
                    value="student" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-foreground/70"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger 
                    value="organization" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-foreground/70"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Organization
                  </TabsTrigger>
                </TabsList>

                {/* Student Sign In */}
                <TabsContent value="student" className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-gradient-primary rounded-xl shadow-purple">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Student Sign In</h2>
                    <p className="text-foreground/70 mt-2">Access your student dashboard</p>
                  </div>

                  <form onSubmit={handleStudentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email" className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="student-email"
                        type="email"
                        value={studentForm.email}
                        onChange={(e) => handleStudentInputChange('email', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="your.email@university.edu"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-password" className="text-white flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          value={studentForm.password}
                          onChange={(e) => handleStudentInputChange('password', e.target.value)}
                          className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-white/50" />
                          ) : (
                            <Eye className="h-4 w-4 text-white/50" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="student-remember"
                          checked={studentForm.rememberMe}
                          onChange={(e) => handleStudentInputChange('rememberMe', e.target.checked)}
                          className="rounded border-white/20 bg-background/50 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="student-remember" className="text-sm text-white cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold text-white border-0 rounded-xl"
                    >
                      Sign In as Student
                    </Button>
                  </form>
                </TabsContent>

                {/* Organization Sign In */}
                <TabsContent value="organization" className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-gradient-primary rounded-xl shadow-purple">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Organization Sign In</h2>
                    <p className="text-foreground/70 mt-2">Access your organization dashboard</p>
                  </div>

                  <form onSubmit={handleOrganizationSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-email" className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="org-email"
                        type="email"
                        value={organizationForm.email}
                        onChange={(e) => handleOrganizationInputChange('email', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="contact@yourorganization.edu"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-password" className="text-white flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="org-password"
                          type={showPassword ? "text" : "password"}
                          value={organizationForm.password}
                          onChange={(e) => handleOrganizationInputChange('password', e.target.value)}
                          className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary pr-10"
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-white/50" />
                          ) : (
                            <Eye className="h-4 w-4 text-white/50" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="org-remember"
                          checked={organizationForm.rememberMe}
                          onChange={(e) => handleOrganizationInputChange('rememberMe', e.target.checked)}
                          className="rounded border-white/20 bg-background/50 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="org-remember" className="text-sm text-white cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold text-white border-0 rounded-xl"
                    >
                      Sign In as Organization
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sign Up Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-foreground/70">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/student-signup')}
                className="text-primary hover:underline font-medium"
              >
                Sign up as Student
              </button>
            </p>
            <p className="text-foreground/70">
              Or{' '}
              <button
                onClick={() => navigate('/organization-signup')}
                className="text-primary hover:underline font-medium"
              >
                Register your Organization
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

