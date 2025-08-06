import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";

interface LandingPageProps {
  onStartAssessment: () => void;
}

export const LandingPage = ({ onStartAssessment }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Is Content Strategy
              <span className="block text-primary-glow">Right for You?</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover your fit, evaluate your skills, and map your career path in content strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onStartAssessment}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-4 h-auto"
              >
                Start Your Assessment
              </Button>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>20-30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Content Strategy */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">What is Content Strategy?</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Content strategy is the planning, development, governance, and management of content—written, 
              visual, audio, or interactive—used in digital platforms to engage audiences and achieve business goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {careers.map((career, index) => (
              <Card key={career.title} className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <career.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{career.title}</h3>
                <p className="text-muted-foreground">{career.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Comprehensive Career Assessment</h2>
            <p className="text-lg text-muted-foreground">
              Our scientifically-backed assessment evaluates multiple dimensions to give you 
              personalized insights about your content strategy career potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {assessmentSections.map((section, index) => (
              <div key={section.title} className="text-center animate-slide-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <section.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Traits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Traits That Lead to Success</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {successTraits.slice(0, 4).map((trait, index) => (
                  <div key={trait} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-lg">{trait}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {successTraits.slice(4).map((trait, index) => (
                  <div key={trait} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-lg">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Your Content Strategy Potential?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Take our comprehensive assessment and get personalized insights, 
              skill mapping, and career guidance tailored to your unique profile.
            </p>
            <Button 
              onClick={onStartAssessment}
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-4 h-auto"
            >
              Begin Assessment Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const careers = [
  {
    title: "Content Strategist",
    description: "Plans and manages content strategy across digital platforms",
    icon: Target
  },
  {
    title: "SEO Specialist", 
    description: "Optimizes content for search visibility and discoverability",
    icon: TrendingUp
  },
  {
    title: "Content Marketing Manager",
    description: "Leads content campaigns tied to marketing goals and metrics",
    icon: BarChart3
  },
  {
    title: "UX Writer",
    description: "Crafts user-centric content for digital interfaces and experiences",
    icon: Users
  },
  {
    title: "Content Designer",
    description: "Blends design thinking with copy for intuitive user experiences",
    icon: Brain
  },
  {
    title: "Digital Editor",
    description: "Manages editorial processes and content quality across channels",
    icon: CheckCircle
  }
];

const assessmentSections = [
  {
    title: "Psychometric",
    description: "Personality, interests, and thinking style alignment",
    icon: Brain
  },
  {
    title: "Technical Skills",
    description: "Aptitude and prerequisite knowledge evaluation",
    icon: Target
  },
  {
    title: "WISCAR Analysis",
    description: "Will, Interest, Skill, Cognitive readiness assessment",
    icon: BarChart3
  },
  {
    title: "Career Guidance",
    description: "Personalized recommendations and learning paths",
    icon: TrendingUp
  }
];

const successTraits = [
  "Strategic thinking and planning",
  "Creative and analytical balance",
  "Empathy for user experience", 
  "Strong communication skills",
  "Understanding of brand voice",
  "SEO and analytics familiarity",
  "Self-motivation and discipline",
  "Attention to detail and quality"
];