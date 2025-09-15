import { Card } from "@/components/ui/card";
import { Users, Zap, Shield, Clock } from "lucide-react";

export function ImageSections() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* How it works section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">ClubConnect</span> Works
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Simplifying the recruitment process for both students and club organizers
          </p>
        </div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* For Students */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">For Students</h3>
              <p className="text-lg text-foreground/70 mb-6">
                Create one comprehensive profile and apply to multiple clubs effortlessly. Track your applications, receive updates, and manage your recruitment journey all in one place.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Single profile for all applications
                </li>
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Real-time application tracking
                </li>
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Instant notifications and updates
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <Card className="p-8 bg-gradient-card border border-white/10 shadow-glow">
              <div className="aspect-video bg-gradient-primary/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-primary-glow mx-auto mb-4" />
                  <p className="text-white font-semibold">Student Dashboard Preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative lg:order-1">
            <Card className="p-8 bg-gradient-card border border-white/10 shadow-glow">
              <div className="aspect-video bg-gradient-primary/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-primary-glow mx-auto mb-4" />
                  <p className="text-white font-semibold">Organizer Dashboard Preview</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* For Organizers */}
          <div className="lg:order-2">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">For Club Organizers</h3>
              <p className="text-lg text-foreground/70 mb-6">
                Streamline your recruitment process with powerful tools to manage applications, conduct interviews, and communicate with candidates transparently and efficiently.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Custom application forms
                </li>
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Candidate review and scoring
                </li>
                <li className="flex items-center text-foreground/70">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mr-3"></div>
                  Automated communication tools
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 text-center bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Lightning Fast</h4>
            <p className="text-sm text-foreground/70">Apply to multiple clubs in minutes, not hours</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Secure & Private</h4>
            <p className="text-sm text-foreground/70">Your data is protected with enterprise-grade security</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Real-time Updates</h4>
            <p className="text-sm text-foreground/70">Stay informed with instant notifications</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border border-white/10 shadow-purple hover:shadow-glow transition-all duration-500">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Transparent Process</h4>
            <p className="text-sm text-foreground/70">Clear communication throughout the journey</p>
          </Card>
        </div>
      </div>
    </section>
  );
}