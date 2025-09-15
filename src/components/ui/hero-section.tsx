import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onGetStarted: (userType: 'student' | 'organizer') => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-dark overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-purple-glow opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary rounded-full blur-3xl opacity-10" />
      
      {/* Floating elements */}
      <div className="absolute top-32 right-20 w-3 h-3 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-primary-glow rounded-full animate-pulse" />
      <div className="absolute top-40 left-1/3 w-4 h-4 bg-accent rounded-full animate-pulse opacity-60" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            <span className="block bg-gradient-primary bg-clip-text text-transparent" style={{fontFamily: 'system-ui, -apple-system, sans-serif', fontStyle: 'italic', fontWeight: 900}}>
              Streamline your
            </span>
            <span className="block text-white font-bold mt-2">
              club recruitment
            </span>
            <span className="block text-white font-bold">
              in seconds ⚡
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            One platform for students to apply to multiple clubs and for organizers to manage transparent, efficient recruitment processes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-10 py-7 font-semibold text-white border-0 rounded-xl"
              onClick={() => navigate('/student-signup')}
            >
              Apply as Student <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-lg px-10 py-7 font-semibold rounded-xl backdrop-blur-sm"
              onClick={() => navigate('/organization-signup')}
            >
              I'm a Club Organizer
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500 backdrop-blur-sm hover:scale-105">
            <div className="flex items-start mb-6">
              <div className="p-4 bg-gradient-primary rounded-xl mr-6 shadow-purple">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">One Profile, Multiple Clubs</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Create a single profile and apply to multiple university clubs seamlessly.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500 backdrop-blur-sm hover:scale-105">
            <div className="flex items-start mb-6">
              <div className="p-4 bg-gradient-primary rounded-xl mr-6 shadow-purple">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Real-time Updates</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Get instant notifications about interviews, decisions, and important deadlines.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500 backdrop-blur-sm hover:scale-105">
            <div className="flex items-start mb-6">
              <div className="p-4 bg-gradient-primary rounded-xl mr-6 shadow-purple">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Transparent Process</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Track your application status with clear timelines and transparent communication.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}