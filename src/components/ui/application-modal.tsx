import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Send, 
  Users, 
  MessageCircle, 
  Calendar,
  MapPin,
  Clock,
  FileText,
  CheckCircle
} from "lucide-react";

interface ClubTeam {
  id: string;
  name: string;
  description: string;
  maxMembers?: number;
  currentMembers?: number;
}

interface ClubQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  required: boolean;
  options?: string[];
}

interface ClubData {
  id: string;
  name: string;
  description: string;
  logo?: string;
  teams: ClubTeam[];
  questions: ClubQuestion[];
  whatsappLink: string;
  applicationDeadline: string;
  interviewDate?: string;
  location?: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (applicationData: any) => void;
  clubData: ClubData;
}

export function ApplicationModal({ isOpen, onClose, onSuccess, clubData }: ApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedTeam: '',
    answers: {} as Record<string, string | string[]>,
    agreeToTerms: false,
    agreeToWhatsApp: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const applicationData = {
        clubId: clubData.id,
        clubName: clubData.name,
        selectedTeam: formData.selectedTeam,
        answers: formData.answers,
        submittedAt: new Date().toISOString(),
        whatsappLink: clubData.whatsappLink
      };
      
      setIsSubmitting(false);
      onSuccess(applicationData);
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedTeam !== '';
      case 2:
        return clubData.questions.every(q => 
          !q.required || (formData.answers[q.id] && formData.answers[q.id] !== '')
        );
      case 3:
        return formData.agreeToTerms && formData.agreeToWhatsApp;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-gradient-primary rounded-xl shadow-purple">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Team</h2>
        <p className="text-foreground/70">Select the team you'd like to join in {clubData.name}</p>
      </div>

      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">Available Teams</Label>
        <RadioGroup
          value={formData.selectedTeam}
          onValueChange={(value) => handleInputChange('selectedTeam', value)}
          className="space-y-3"
        >
          {clubData.teams.map((team) => (
            <div key={team.id} className="flex items-center space-x-3 p-4 bg-background/50 rounded-lg border border-white/20 hover:border-primary/50 transition-all duration-300">
              <RadioGroupItem value={team.id} id={team.id} className="text-primary" />
              <div className="flex-1">
                <Label htmlFor={team.id} className="text-white font-semibold cursor-pointer">
                  {team.name}
                </Label>
                <p className="text-foreground/70 text-sm mt-1">{team.description}</p>
                {team.maxMembers && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {team.currentMembers || 0}/{team.maxMembers} members
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-gradient-primary rounded-xl shadow-purple">
            <FileText className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Application Questions</h2>
        <p className="text-foreground/70">Please answer the following questions</p>
      </div>

      <div className="space-y-6">
        {clubData.questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <Label className="text-white font-semibold">
              {question.question}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            
            {question.type === 'text' && (
              <Input
                value={formData.answers[question.id] as string || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                placeholder="Your answer..."
              />
            )}
            
            {question.type === 'textarea' && (
              <Textarea
                value={formData.answers[question.id] as string || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="bg-background/50 border-white/20 text-white placeholder:text-white/50 focus:border-primary min-h-[100px]"
                placeholder="Your detailed answer..."
              />
            )}
            
            {question.type === 'radio' && question.options && (
              <RadioGroup
                value={formData.answers[question.id] as string || ''}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="space-y-2"
              >
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${question.id}-${option}`} className="text-primary" />
                    <Label htmlFor={`${question.id}-${option}`} className="text-white cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {question.type === 'checkbox' && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={(formData.answers[question.id] as string[] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentAnswers = formData.answers[question.id] as string[] || [];
                        const newAnswers = checked
                          ? [...currentAnswers, option]
                          : currentAnswers.filter(a => a !== option);
                        handleAnswerChange(question.id, newAnswers);
                      }}
                      className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor={`${question.id}-${option}`} className="text-white cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-gradient-primary rounded-xl shadow-purple">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Join Our Community</h2>
        <p className="text-foreground/70">Stay connected with the {clubData.name} community</p>
      </div>

      <div className="space-y-6">
        {/* Application Summary */}
        <Card className="bg-background/50 border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Application Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground/70">Club:</span>
              <span className="text-white font-semibold">{clubData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Selected Team:</span>
              <span className="text-white font-semibold">
                {clubData.teams.find(t => t.id === formData.selectedTeam)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Application Deadline:</span>
              <span className="text-white font-semibold">
                {new Date(clubData.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
            {clubData.interviewDate && (
              <div className="flex justify-between">
                <span className="text-foreground/70">Interview Date:</span>
                <span className="text-white font-semibold">
                  {new Date(clubData.interviewDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* WhatsApp Group */}
        <Card className="bg-background/50 border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Group
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/70">
              Join our WhatsApp group to stay updated with announcements, events, and connect with other members.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whatsapp-agree"
                checked={formData.agreeToWhatsApp}
                onCheckedChange={(checked) => handleInputChange('agreeToWhatsApp', checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="whatsapp-agree" className="text-white cursor-pointer">
                I agree to join the {clubData.name} WhatsApp group
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms-agree"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="terms-agree" className="text-white cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card border border-white/10">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white">
            Apply to {clubData.name}
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

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-background/50 text-foreground/50'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary' : 'bg-background/50'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-white/20">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

