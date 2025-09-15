import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock,
  ExternalLink,
  ArrowLeft,
  Users,
  FileText
} from "lucide-react";

interface ApplicationSuccessProps {
  applicationData: {
    clubId: string;
    clubName: string;
    selectedTeam: string;
    answers: Record<string, string | string[]>;
    submittedAt: string;
    whatsappLink: string;
  };
  onClose: () => void;
  onBackToDashboard: () => void;
}

export function ApplicationSuccess({ applicationData, onClose, onBackToDashboard }: ApplicationSuccessProps) {
  const handleJoinWhatsApp = () => {
    window.open(applicationData.whatsappLink, '_blank');
  };

  const handleBackToDashboard = () => {
    onClose();
    onBackToDashboard();
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
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-6 bg-gradient-primary rounded-full shadow-purple animate-pulse">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Application Submitted!
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Your application to <span className="text-primary font-semibold">{applicationData.clubName}</span> has been successfully submitted.
            </p>
          </div>

          {/* Application Details */}
          <Card className="bg-gradient-card border border-white/10 shadow-purple backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Club</p>
                    <p className="text-white font-semibold">{applicationData.clubName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Selected Team</p>
                    <p className="text-white font-semibold">{applicationData.selectedTeam}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Submitted</p>
                    <p className="text-white font-semibold">
                      {new Date(applicationData.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Time</p>
                    <p className="text-white font-semibold">
                      {new Date(applicationData.submittedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-card border border-white/10 shadow-purple backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Review Process</p>
                    <p className="text-foreground/70 text-sm">
                      Your application will be reviewed by the club's selection committee within 3-5 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Interview Notification</p>
                    <p className="text-foreground/70 text-sm">
                      If selected, you'll receive an email with interview details and scheduling information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Final Decision</p>
                    <p className="text-foreground/70 text-sm">
                      You'll be notified of the final decision via email within 1-2 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Group */}
          <Card className="bg-gradient-card border border-white/10 shadow-purple backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Join Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-foreground/70">
                Stay connected with the {applicationData.clubName} community and get updates about your application status.
              </p>
              <Button
                onClick={handleJoinWhatsApp}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 px-8 font-semibold text-white border-0 rounded-xl"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join WhatsApp Group
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-foreground/50 text-sm">
                Click to join our WhatsApp group for announcements and updates
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBackToDashboard}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6 px-8 font-semibold text-white border-0 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-lg py-6 px-8 font-semibold rounded-xl backdrop-blur-sm"
            >
              Apply to Another Club
            </Button>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-8">
            <p className="text-foreground/70 text-sm">
              Questions about your application? Contact us at{' '}
              <a href="mailto:support@clubconnect.edu" className="text-primary hover:underline">
                support@clubconnect.edu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

