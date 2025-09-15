import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  X, 
  Camera, 
  Upload, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar,
  FileText,
  Save,
  Edit3
} from "lucide-react";

interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  year: string;
  bio: string;
  interests: string[];
  profilePicture?: string;
  resumeUrl?: string;
  resumeName?: string;
  joinDate: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updatedProfile: StudentProfile) => void;
}

export function ProfileModal({ isOpen, onClose, profile, onUpdateProfile }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<StudentProfile>(profile);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof StudentProfile, value: string | string[]) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingResume(true);
      // Simulate file upload
      setTimeout(() => {
        handleInputChange('resumeUrl', URL.createObjectURL(file));
        handleInputChange('resumeName', file.name);
        setIsUploadingResume(false);
      }, 1500);
    }
  };

  const handleDownloadResume = () => {
    if (editedProfile.resumeUrl) {
      const link = document.createElement('a');
      link.href = editedProfile.resumeUrl;
      link.download = editedProfile.resumeName || 'resume.pdf';
      link.click();
    }
  };

  const interestOptions = [
    'Technology', 'Arts & Culture', 'Sports', 'Community Service',
    'Business & Entrepreneurship', 'Science & Research', 'Media & Communication',
    'Environmental', 'Music', 'Drama', 'Photography', 'Debate'
  ];

  const handleInterestToggle = (interest: string) => {
    const currentInterests = editedProfile.interests || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    handleInputChange('interests', newInterests);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border border-white/10">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white">
            Student Profile
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Picture and Basic Info */}
          <Card className="bg-background/50 border border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-primary/20">
                      <AvatarImage src={editedProfile.profilePicture} alt="Profile" />
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                        {editedProfile.firstName[0]}{editedProfile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 bg-primary hover:bg-primary/90"
                        onClick={() => document.getElementById('profile-picture-upload')?.click()}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('profile-picture-upload')?.click()}
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {editedProfile.firstName} {editedProfile.lastName}
                      </h2>
                      <p className="text-foreground/70">{editedProfile.major} Student</p>
                      <p className="text-foreground/70">{editedProfile.university}</p>
                    </div>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{editedProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{editedProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{editedProfile.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Joined {new Date(editedProfile.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editable Profile Information */}
          <Card className="bg-background/50 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    value={editedProfile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    value={editedProfile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-white">University</Label>
                  <Input
                    id="university"
                    value={editedProfile.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major" className="text-white">Major</Label>
                  <Input
                    id="major"
                    value={editedProfile.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-white">Academic Year</Label>
                <Select 
                  value={editedProfile.year} 
                  onValueChange={(value) => handleInputChange('year', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-background/50 border-white/20 text-white disabled:opacity-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="bg-background/50 border-white/20 text-white disabled:opacity-50 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="bg-background/50 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Areas of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={interest}
                      checked={editedProfile.interests?.includes(interest) || false}
                      onChange={() => handleInterestToggle(interest)}
                      disabled={!isEditing}
                      className="rounded border-white/20 bg-background/50 text-primary focus:ring-primary disabled:opacity-50"
                    />
                    <Label
                      htmlFor={interest}
                      className="text-sm text-white cursor-pointer disabled:opacity-50"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card className="bg-background/50 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedProfile.resumeUrl ? (
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-white">{editedProfile.resumeName}</p>
                      <p className="text-sm text-foreground/70">Resume uploaded</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadResume}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Replace
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-white/20 rounded-lg">
                  <FileText className="h-12 w-12 text-foreground/50 mx-auto mb-4" />
                  <p className="text-foreground/70 mb-4">No resume uploaded</p>
                  {isEditing && (
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      disabled={isUploadingResume}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploadingResume ? 'Uploading...' : 'Upload Resume'}
                    </Button>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

