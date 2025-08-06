import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PsychometricSection } from "./sections/PsychometricSection";
import { TechnicalSection } from "./sections/TechnicalSection";
import { WiscarSection } from "./sections/WiscarSection";
import { ResultsSection } from "./sections/ResultsSection";
import { useAssessmentStore } from "@/stores/assessmentStore";

interface AssessmentProps {
  onBack: () => void;
}

export const Assessment = ({ onBack }: AssessmentProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const { answers, updateAnswer, calculateScores } = useAssessmentStore();

  const sections = [
    { 
      title: "Psychometric Assessment", 
      subtitle: "Who Are You as a Thinker and Creator?",
      component: PsychometricSection 
    },
    { 
      title: "Technical & Aptitude", 
      subtitle: "Do You Have the Mind & Basics for It?",
      component: TechnicalSection 
    },
    { 
      title: "WISCAR Framework", 
      subtitle: "How Ready Are You, Really?",
      component: WiscarSection 
    },
    { 
      title: "Your Results", 
      subtitle: "Personalized Career Insights",
      component: ResultsSection 
    }
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;
  const CurrentComponent = sections[currentSection].component;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleAnswer = (questionId: string, value: any) => {
    updateAnswer(questionId, value);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white border-b shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="text-sm text-muted-foreground">
              Section {currentSection + 1} of {sections.length}
            </div>
          </div>
          
          <div className="mb-2">
            <h1 className="text-2xl font-bold">{sections[currentSection].title}</h1>
            <p className="text-muted-foreground">{sections[currentSection].subtitle}</p>
          </div>
          
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <CurrentComponent 
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* Navigation */}
      {currentSection < sections.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-medium">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next Section
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};