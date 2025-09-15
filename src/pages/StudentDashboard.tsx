import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, ApplicationStatus } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { ProfileModal } from "@/components/ui/profile-modal";
import { ApplicationModal } from "@/components/ui/application-modal";
import { ApplicationSuccess } from "@/components/ui/application-success";
import { Plus, Bell, User, Calendar } from "lucide-react";

// Mock data for demonstration
const applications = [
  {
    id: 1,
    clubName: "Computer Science Society",
    position: "Vice President",
    appliedDate: "2024-01-15",
    status: 'interview' as ApplicationStatus,
    deadline: "2024-01-30",
  },
  {
    id: 2,
    clubName: "Debate Club",
    position: "Secretary",
    appliedDate: "2024-01-12",
    status: 'reviewing' as ApplicationStatus,
    deadline: "2024-01-25",
  },
  {
    id: 3,
    clubName: "Environmental Club",
    position: "Event Coordinator",
    appliedDate: "2024-01-10",
    status: 'accepted' as ApplicationStatus,
    deadline: "2024-01-20",
  },
];

const availableRecruitments = [
  {
    id: 1,
    clubName: "Drama Society",
    position: "Marketing Lead",
    deadline: "2024-02-15",
    applicants: 23,
  },
  {
    id: 2,
    clubName: "Photography Club",
    position: "Workshop Coordinator",
    deadline: "2024-02-10",
    applicants: 15,
  },
];

// Mock club data with dynamic teams and questions
const clubData = {
  "Drama Society": {
    id: "drama-society",
    name: "Drama Society",
    description: "Join our vibrant drama community and showcase your acting talents",
    teams: [
      {
        id: "tech",
        name: "Tech Team",
        description: "Handle lighting, sound, and technical aspects of productions",
        maxMembers: 8,
        currentMembers: 5
      },
      {
        id: "pr",
        name: "PR & Marketing",
        description: "Promote events, manage social media, and handle publicity",
        maxMembers: 6,
        currentMembers: 3
      },
      {
        id: "design",
        name: "Design Team",
        description: "Create sets, costumes, and visual elements for productions",
        maxMembers: 10,
        currentMembers: 7
      },
      {
        id: "management",
        name: "Management",
        description: "Coordinate events, manage logistics, and oversee operations",
        maxMembers: 5,
        currentMembers: 2
      }
    ],
    questions: [
      {
        id: "experience",
        question: "Do you have any previous experience in drama or theater?",
        type: "textarea" as const,
        required: true
      },
      {
        id: "availability",
        question: "What days are you available for rehearsals?",
        type: "checkbox" as const,
        required: true,
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Weekend"]
      },
      {
        id: "commitment",
        question: "How many hours per week can you commit?",
        type: "radio" as const,
        required: true,
        options: ["1-5 hours", "6-10 hours", "11-15 hours", "15+ hours"]
      }
    ],
    whatsappLink: "https://chat.whatsapp.com/drama-society-group",
    applicationDeadline: "2024-02-15",
    interviewDate: "2024-02-20",
    location: "Theater Building, Room 101"
  },
  "Photography Club": {
    id: "photography-club",
    name: "Photography Club",
    description: "Capture moments and develop your photography skills with us",
    teams: [
      {
        id: "tech",
        name: "Tech Team",
        description: "Manage equipment, software, and technical workshops",
        maxMembers: 6,
        currentMembers: 4
      },
      {
        id: "pr",
        name: "PR & Marketing",
        description: "Promote club events and manage social media presence",
        maxMembers: 4,
        currentMembers: 2
      },
      {
        id: "design",
        name: "Design Team",
        description: "Create visual content, posters, and exhibition materials",
        maxMembers: 8,
        currentMembers: 5
      },
      {
        id: "management",
        name: "Management",
        description: "Organize events, workshops, and club activities",
        maxMembers: 5,
        currentMembers: 3
      }
    ],
    questions: [
      {
        id: "experience",
        question: "What type of photography interests you most?",
        type: "checkbox" as const,
        required: true,
        options: ["Portrait", "Landscape", "Street", "Event", "Macro", "Sports", "Other"]
      },
      {
        id: "equipment",
        question: "Do you own a camera? If yes, what type?",
        type: "text" as const,
        required: false
      },
      {
        id: "goals",
        question: "What do you hope to achieve by joining the Photography Club?",
        type: "textarea" as const,
        required: true
      }
    ],
    whatsappLink: "https://chat.whatsapp.com/photography-club-group",
    applicationDeadline: "2024-02-10",
    interviewDate: "2024-02-15",
    location: "Art Building, Studio 3"
  }
};

export default function StudentDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [selectedClub, setSelectedClub] = useState<string>('');
  const [applicationData, setApplicationData] = useState<any>(null);
  
  const [studentProfile, setStudentProfile] = useState({
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    university: 'University of Technology',
    major: 'Computer Science',
    year: 'junior',
    bio: 'Passionate computer science student with a focus on web development and machine learning. I love working on projects that make a positive impact and enjoy collaborating with diverse teams.',
    interests: ['Technology', 'Science & Research', 'Community Service', 'Business & Entrepreneurship'],
    profilePicture: '',
    resumeUrl: '',
    resumeName: '',
    joinDate: '2023-09-01'
  });

  const handleUpdateProfile = (updatedProfile: typeof studentProfile) => {
    setStudentProfile(updatedProfile);
  };

  const handleApplyClick = (clubName: string) => {
    setSelectedClub(clubName);
    setIsApplicationOpen(true);
  };

  const handleApplicationSuccess = (data: any) => {
    setApplicationData(data);
    setIsApplicationOpen(false);
    setShowSuccessPage(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessPage(false);
    setApplicationData(null);
  };

  const handleBackToDashboard = () => {
    setShowSuccessPage(false);
    setApplicationData(null);
  };

  // Show success page if application was submitted
  if (showSuccessPage && applicationData) {
    return (
      <ApplicationSuccess
        applicationData={applicationData}
        onClose={handleCloseSuccess}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {studentProfile.firstName}!</h1>
            <p className="text-muted-foreground">Track your applications and discover new opportunities</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsProfileOpen(true)}
              className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">1</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Applications */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{app.clubName}</h3>
                      <p className="text-muted-foreground">{app.position}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Applied: {app.appliedDate}</span>
                    <span>Deadline: {app.deadline}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Recruitments */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Available Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableRecruitments.map((recruitment) => (
                <div key={recruitment.id} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{recruitment.clubName}</h3>
                      <p className="text-muted-foreground">{recruitment.position}</p>
                    </div>
                    <Badge variant="secondary">{recruitment.applicants} applicants</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Deadline: {recruitment.deadline}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleApplyClick(recruitment.clubName)}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={studentProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Application Modal */}
      {selectedClub && clubData[selectedClub as keyof typeof clubData] && (
        <ApplicationModal
          isOpen={isApplicationOpen}
          onClose={() => setIsApplicationOpen(false)}
          onSuccess={handleApplicationSuccess}
          clubData={clubData[selectedClub as keyof typeof clubData]}
        />
      )}
    </div>
  );
}