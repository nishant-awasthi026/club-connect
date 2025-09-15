import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building2, Mail, User, Lock, Phone, MapPin, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrganizationSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    organizationType: '',
    university: '',
    description: '',
    establishedYear: '',
    memberCount: '',
    categories: [] as string[],
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Organization signup data:', formData);
    // Navigate to organizer dashboard after successful signup
    navigate('/organizer-dashboard');
  };

  const organizationTypes = [
    'Academic Club', 'Cultural Society', 'Sports Club', 'Professional Society',
    'Community Service', 'Arts & Performance', 'Technology', 'Business',
    'Environmental', 'Political', 'Religious', 'Social', 'Other'
  ];

  const categoryOptions = [
    'Academic', 'Arts & Culture', 'Sports & Recreation', 'Community Service',
    'Professional Development', 'Technology', 'Business & Entrepreneurship',
    'Environmental', 'Media & Communication', 'Music & Performance',
    'Science & Research', 'Social & Networking', 'Volunteer Work'
  ];

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

        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-gradient-primary rounded-xl shadow-purple">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Register Your Organization
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Create your organization profile and start managing club recruitment processes
            </p>
          </div>

          {/* Signup Form */}
          <Card className="bg-gradient-card border border-white/10 shadow-purple backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white">
                Organization Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizationName" className="text-white">Organization Name</Label>
                    <Input
                      id="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      placeholder="Enter your organization name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationType" className="text-white">Organization Type</Label>
                    <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                      <SelectTrigger className="bg-background/50 border-white/20 text-white focus:border-primary">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university" className="text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      University/Institution
                    </Label>
                    <Input
                      id="university"
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      placeholder="Your university or institution"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear" className="text-white flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Established Year
                      </Label>
                      <Input
                        id="establishedYear"
                        type="number"
                        value={formData.establishedYear}
                        onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="2020"
                        min="1900"
                        max="2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberCount" className="text-white flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Current Members
                      </Label>
                      <Input
                        id="memberCount"
                        type="number"
                        value={formData.memberCount}
                        onChange={(e) => handleInputChange('memberCount', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="50"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Organization Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary min-h-[120px]"
                      placeholder="Describe your organization's mission, activities, and what makes it unique..."
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-white">Primary Contact Name</Label>
                    <Input
                      id="contactName"
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                      placeholder="contact@yourorganization.edu"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-white">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="https://yourorganization.edu"
                      />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Organization Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryOptions.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={formData.categories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm text-white cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="terms" className="text-sm text-white cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 font-semibold text-white border-0 rounded-xl"
                  disabled={!formData.agreeToTerms}
                >
                  Register Organization
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-foreground/70">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/signin')}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
