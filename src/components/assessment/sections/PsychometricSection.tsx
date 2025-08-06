import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Users, Target } from "lucide-react";

interface PsychometricSectionProps {
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
}

export const PsychometricSection = ({ answers, onAnswer, onNext }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: "psych_research_interest",
      category: "Interest Scale",
      question: "I enjoy researching and explaining complex ideas in simple terms",
      icon: Brain,
      type: "likert"
    },
    {
      id: "psych_team_collaboration", 
      category: "Work Preferences",
      question: "I prefer working in teams to develop creative ideas",
      icon: Users,
      type: "likert"
    },
    {
      id: "psych_content_purpose",
      category: "Motivation",
      question: "I see content as a way to influence, educate, or solve problems",
      icon: Target,
      type: "likert"
    },
    {
      id: "psych_detail_orientation",
      category: "Personality",
      question: "I naturally pay attention to grammar, tone, and consistency in writing",
      icon: Heart,
      type: "likert"
    },
    {
      id: "psych_audience_empathy",
      category: "User Focus",
      question: "I often think about how different audiences might interpret information",
      icon: Users,
      type: "likert"
    }
  ];

  const likertOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (isLastQuestion && allQuestionsAnswered) {
      onNext();
    } else if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Psychometric Assessment</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This section evaluates your personality, interests, and thinking style to determine 
          how well content strategy aligns with your natural preferences and strengths.
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center space-x-2 mb-8">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentQuestion 
                ? 'bg-primary scale-125' 
                : answers[questions[index].id] !== undefined 
                  ? 'bg-success' 
                  : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <Card className="p-8 shadow-medium animate-scale-in">
        <div className="text-center mb-8">
          <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <currentQ.icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-sm text-primary font-medium mb-2">{currentQ.category}</div>
          <h3 className="text-xl font-semibold">{currentQ.question}</h3>
        </div>

        <RadioGroup
          value={answers[currentQ.id]?.toString() || ""}
          onValueChange={(value) => onAnswer(currentQ.id, parseInt(value))}
          className="space-y-4"
        >
          {likertOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value.toString()} id={`${currentQ.id}_${option.value}`} />
              <Label 
                htmlFor={`${currentQ.id}_${option.value}`}
                className="text-lg cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <Button
          onClick={handleNext}
          disabled={answers[currentQ.id] === undefined}
        >
          {isLastQuestion ? 'Complete Section' : 'Next'}
        </Button>
      </div>

      {/* Section Summary */}
      {allQuestionsAnswered && (
        <Card className="p-6 bg-gradient-card border-primary/20 animate-fade-in">
          <h4 className="font-semibold mb-2">Section Complete!</h4>
          <p className="text-sm text-muted-foreground">
            You've answered all psychometric questions. Your responses will help us understand 
            your natural fit for content strategy roles.
          </p>
        </Card>
      )}
    </div>
  );
};