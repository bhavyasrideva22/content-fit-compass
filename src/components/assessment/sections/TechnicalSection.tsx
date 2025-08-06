import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Code, Search, FileText, BarChart3, Timer } from "lucide-react";

interface TechnicalSectionProps {
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
}

export const TechnicalSection = ({ answers, onAnswer, onNext }: TechnicalSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const subsections = [
    {
      title: "General Aptitude",
      description: "Logical reasoning and pattern recognition",
      icon: Code,
      timed: true,
      questions: aptitudeQuestions
    },
    {
      title: "Prerequisite Knowledge", 
      description: "Basic marketing and writing fundamentals",
      icon: FileText,
      timed: false,
      questions: prerequisiteQuestions
    },
    {
      title: "Domain-Specific Quiz",
      description: "Content strategy concepts and tools",
      icon: Search,
      timed: false,
      questions: domainQuestions
    }
  ];

  const currentSubsectionData = subsections[currentSubsection];
  const allSubsectionsComplete = subsections.every(section => 
    section.questions.every(q => answers[q.id] !== undefined)
  );

  const handleNext = () => {
    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else if (allSubsectionsComplete) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentSubsection > 0) {
      setCurrentSubsection(currentSubsection - 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Technical & Aptitude Assessment</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This section evaluates your analytical thinking, prerequisite knowledge, 
          and familiarity with content strategy concepts.
        </p>
      </div>

      {/* Subsection Navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        {subsections.map((section, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              index === currentSubsection 
                ? 'bg-primary text-primary-foreground' 
                : index < currentSubsection 
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted'
            }`}
          >
            <section.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{section.title}</span>
          </div>
        ))}
      </div>

      {/* Timer for timed sections */}
      {currentSubsectionData.timed && (
        <Card className="p-4 border-warning bg-warning/5">
          <div className="flex items-center justify-center space-x-2">
            <Timer className="w-5 h-5 text-warning" />
            <span className="font-medium">Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </Card>
      )}

      {/* Current Subsection */}
      <Card className="p-8 shadow-medium">
        <div className="text-center mb-8">
          <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <currentSubsectionData.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{currentSubsectionData.title}</h3>
          <p className="text-muted-foreground">{currentSubsectionData.description}</p>
        </div>

        <div className="space-y-6">
          {currentSubsectionData.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id]}
              onAnswer={(value) => onAnswer(question.id, value)}
            />
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSubsection === 0}
        >
          Previous Section
        </Button>

        <div className="text-sm text-muted-foreground">
          Section {currentSubsection + 1} of {subsections.length}
        </div>

        <Button
          onClick={handleNext}
          disabled={!currentSubsectionData.questions.every(q => answers[q.id] !== undefined)}
        >
          {currentSubsection === subsections.length - 1 ? 'Complete Section' : 'Next Section'}
        </Button>
      </div>
    </div>
  );
};

const QuestionCard = ({ question, answer, onAnswer }: any) => {
  return (
    <Card className="p-6 border-l-4 border-l-primary/20">
      <h4 className="font-semibold mb-4">{question.question}</h4>
      
      {question.type === 'multiple-choice' && (
        <RadioGroup value={answer || ""} onValueChange={onAnswer}>
          {question.options.map((option: any, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`${question.id}_${index}`} />
              <Label htmlFor={`${question.id}_${index}`} className="cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === 'multiple-select' && (
        <div className="space-y-3">
          {question.options.map((option: any, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox
                id={`${question.id}_${index}`}
                checked={answer?.includes(option) || false}
                onCheckedChange={(checked) => {
                  const currentAnswers = answer || [];
                  if (checked) {
                    onAnswer([...currentAnswers, option]);
                  } else {
                    onAnswer(currentAnswers.filter((a: any) => a !== option));
                  }
                }}
              />
              <Label htmlFor={`${question.id}_${index}`} className="cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const aptitudeQuestions = [
  {
    id: "tech_pattern_1",
    question: "What comes next in this sequence: Content Plan → Content Creation → Content Publishing → ?",
    type: "multiple-choice",
    options: ["Content Archiving", "Content Analysis", "Content Strategy", "Content Deletion"],
    correct: "Content Analysis"
  },
  {
    id: "tech_logical_1", 
    question: "If all content strategists use analytics, and Sarah uses analytics, what can we conclude?",
    type: "multiple-choice",
    options: ["Sarah is a content strategist", "Sarah might be a content strategist", "Sarah is not a content strategist", "Nothing definitive"],
    correct: "Nothing definitive"
  }
];

const prerequisiteQuestions = [
  {
    id: "tech_marketing_basics",
    question: "Which of these are fundamental marketing concepts? (Select all that apply)",
    type: "multiple-select", 
    options: ["Target Audience", "Brand Voice", "Call to Action", "Color Theory", "User Journey"],
    correct: ["Target Audience", "Brand Voice", "Call to Action", "User Journey"]
  },
  {
    id: "tech_writing_experience",
    question: "How would you rate your writing and editing experience?",
    type: "multiple-choice",
    options: ["No formal experience", "Some writing experience", "Regular writing practice", "Professional writing background"],
    correct: null
  }
];

const domainQuestions = [
  {
    id: "tech_content_audit",
    question: "What is a content audit?",
    type: "multiple-choice", 
    options: [
      "A financial review of content costs",
      "A systematic review of existing content performance and quality",
      "A legal compliance check for content",
      "A spelling and grammar check"
    ],
    correct: "A systematic review of existing content performance and quality"
  },
  {
    id: "tech_seo_impact",
    question: "How does SEO impact content strategy?",
    type: "multiple-choice",
    options: [
      "It only affects technical website setup",
      "It influences keyword research, content topics, and user search intent",
      "It's only important for blog posts",
      "It doesn't significantly impact content strategy"
    ],
    correct: "It influences keyword research, content topics, and user search intent"
  }
];