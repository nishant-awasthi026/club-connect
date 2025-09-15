import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/ui/hero-section';
import { ImageSections } from '@/components/ui/image-sections';
import { Footer } from '@/components/ui/footer';

const Index = () => {
  const handleGetStarted = (userType: 'student' | 'organizer') => {
    // This function is kept for compatibility but navigation is now handled by the components themselves
  };

  const handleLoginClick = (userType: 'student' | 'organizer') => {
    // This function is kept for compatibility but navigation is now handled by the components themselves
  };

  return (
    <div className="min-h-screen">
      <Navigation onLoginClick={handleLoginClick} />
      <HeroSection onGetStarted={handleGetStarted} />
      <ImageSections />
      <Footer />
    </div>
  );
};

export default Index;
