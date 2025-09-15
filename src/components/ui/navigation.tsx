import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/clubconnect-logo.png";

interface NavigationProps {
  onLoginClick: (userType: 'student' | 'organizer') => void;
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={logoImage} 
            alt="ClubConnect Logo" 
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/signin')}
              className="text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-300 border-0"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/student-signup')}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold px-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}