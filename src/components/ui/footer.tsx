import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import logoImage from "@/assets/clubconnect-logo.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="ClubConnect Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Streamlining university club recruitment with transparency, efficiency, and student-focused design.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#help" className="text-foreground/70 hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-foreground/70 mb-4">
              Get the latest updates on new features and improvements.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              />
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © 2024 ClubConnect. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Terms
            </a>
            <a href="#cookies" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}