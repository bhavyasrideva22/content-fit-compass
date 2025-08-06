import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, Cog, Brain, TrendingUp, Briefcase } from "lucide-react";

interface WiscarSectionProps {
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
}

export const WiscarSection = ({ answers, onAnswer, onNext }: WiscarSectionProps) => {
  const [currentDimension, setCurrentDimension] = useState(0);

  const dimensions = [
    {
      key: "will",
      title: "Will - Passion & Commitment",
      description: "Your long-term motivation and dedication to content strategy",
      icon: Heart,
      color: "text-red-500",
      questions: willQuestions
    },
    {
      key: "interest", 
      title: "Interest - Natural Curiosity",
      description: "Your genuine fascination with content and strategy work",
      icon: Star,
      color: "text-yellow-500",
      questions: interestQuestions
    },
    {
      key: "skill",
      title: "Skill - Core Competencies", 
      description: "Your current abilities in writing, strategy, and communication",
      icon: Cog,
      color: "text-blue-500",
      questions: skillQuestions
    },
    {
      key: "cognitive",
      title: "Cognitive - Thinking Readiness",
      description: "Your ability to think critically and adapt strategically",
      icon: Brain,
      color: "text-purple-500", 
      questions: cognitiveQuestions
    },
    {
      key: "ability",
      title: "Ability - Learning Mindset",
      description: "Your openness to feedback and continuous improvement",
      icon: TrendingUp,
      color: "text-green-500",
      questions: abilityQuestions
    },
    {
      key: "realWorld",
      title: "Real-World - Job Understanding",
      description: "Your grasp of actual content strategy work and challenges",
      icon: Briefcase,
      color: "text-gray-500",
      questions: realWorldQuestions
    }
  ];

  const currentDim = dimensions[currentDimension];
  const isLastDimension = currentDimension === dimensions.length - 1;
  const allQuestionsAnswered = currentDim.questions.every(q => answers[`wiscar_${currentDim.key}_${q.id}`] !== undefined);
  const allDimensionsComplete = dimensions.every(dim => 
    dim.questions.every(q => answers[`wiscar_${dim.key}_${q.id}`] !== undefined)
  );

  const handleNext = () => {
    if (isLastDimension && allDimensionsComplete) {
      onNext();
    } else if (!isLastDimension && allQuestionsAnswered) {
      setCurrentDimension(currentDimension + 1);
    }
  };

  const handlePrevious = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">WISCAR Framework Analysis</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The WISCAR framework provides a comprehensive evaluation of your readiness 
          across six critical dimensions for content strategy success.
        </p>
      </div>

      {/* Dimension Progress */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {dimensions.map((dimension, index) => (
          <div
            key={dimension.key}
            className={`p-3 rounded-lg text-center transition-all ${
              index === currentDimension 
                ? 'bg-primary text-primary-foreground scale-105' 
                : index < currentDimension 
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted'
            }`}
          >
            <dimension.icon className={`w-6 h-6 mx-auto mb-2 ${index === currentDimension ? 'text-white' : dimension.color}`} />
            <div className="text-sm font-medium">{dimension.title.split(' - ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Current Dimension */}
      <Card className="p-8 shadow-medium">
        <div className="text-center mb-8">
          <div className="bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <currentDim.icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{currentDim.title}</h3>
          <p className="text-muted-foreground">{currentDim.description}</p>
        </div>

        <div className="space-y-8">
          {currentDim.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionId={`wiscar_${currentDim.key}_${question.id}`}
              answer={answers[`wiscar_${currentDim.key}_${question.id}`]}
              onAnswer={(value) => onAnswer(`wiscar_${currentDim.key}_${question.id}`, value)}
              index={index}
            />
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentDimension === 0}
        >
          Previous Dimension
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentDim.title.split(' - ')[0]} ({currentDimension + 1} of {dimensions.length})
        </div>

        <Button
          onClick={handleNext}
          disabled={!allQuestionsAnswered}
        >
          {isLastDimension ? 'Complete Assessment' : 'Next Dimension'}
        </Button>
      </div>

      {/* Completion Status */}
      {allDimensionsComplete && (
        <Card className="p-6 bg-gradient-card border-success/20 animate-fade-in">
          <h4 className="font-semibold mb-2 text-success">WISCAR Assessment Complete!</h4>
          <p className="text-sm text-muted-foreground">
            You've completed all six dimensions. Your responses will be analyzed to provide 
            detailed insights about your content strategy readiness.
          </p>
        </Card>
      )}
    </div>
  );
};

const QuestionCard = ({ question, questionId, answer, onAnswer, index }: any) => {
  return (
    <Card className="p-6 border-l-4 border-l-primary/20">
      <div className="flex items-start space-x-3 mb-4">
        <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-sm font-medium text-primary">{index + 1}</span>
        </div>
        <h4 className="font-semibold flex-1">{question.question}</h4>
      </div>
      
      {question.type === 'likert' && (
        <RadioGroup value={answer?.toString() || ""} onValueChange={(value) => onAnswer(parseInt(value))}>
          {likertOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value.toString()} id={`${questionId}_${option.value}`} />
              <Label htmlFor={`${questionId}_${option.value}`} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === 'scenario' && (
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">{question.scenario}</p>
          </div>
          <RadioGroup value={answer || ""} onValueChange={onAnswer}>
            {question.options.map((option: any, optIndex: number) => (
              <div key={optIndex} className="flex items-start space-x-3">
                <RadioGroupItem value={option} id={`${questionId}_${optIndex}`} className="mt-1" />
                <Label htmlFor={`${questionId}_${optIndex}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {question.type === 'text' && (
        <Textarea
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[100px]"
        />
      )}
    </Card>
  );
};

const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

// Question definitions for each WISCAR dimension
const willQuestions = [
  {
    id: "long_term_vision",
    question: "I see myself working in content strategy for years to come",
    type: "likert"
  },
  {
    id: "passion_intensity", 
    question: "I get excited when discussing content, messaging, and audience engagement",
    type: "likert"
  }
];

const interestQuestions = [
  {
    id: "natural_curiosity",
    question: "I find myself naturally analyzing content and messaging I encounter daily",
    type: "likert"
  },
  {
    id: "trend_awareness",
    question: "I actively follow trends in digital marketing, content, and user behavior",
    type: "likert"
  }
];

const skillQuestions = [
  {
    id: "writing_confidence",
    question: "I feel confident in my ability to write clear, engaging content",
    type: "likert"
  },
  {
    id: "strategic_thinking",
    question: "I can easily connect content decisions to broader business objectives",
    type: "likert"
  }
];

const cognitiveQuestions = [
  {
    id: "analytical_approach",
    question: "When faced with a content challenge, what's your typical approach?",
    type: "scenario",
    scenario: "Your company's blog engagement has dropped 30% over the past quarter.",
    options: [
      "Research competitor content and industry trends first",
      "Immediately start creating new content to increase volume",
      "Focus on promoting existing content more aggressively",
      "Wait for management to provide direction"
    ]
  }
];

const abilityQuestions = [
  {
    id: "feedback_openness",
    question: "I actively seek feedback on my work and use it to improve",
    type: "likert"
  },
  {
    id: "learning_motivation",
    question: "I'm excited about continuously learning new tools, strategies, and best practices",
    type: "likert"
  }
];

const realWorldQuestions = [
  {
    id: "job_understanding",
    question: "Describe what you think a typical day looks like for a Content Strategist",
    type: "text"
  },
  {
    id: "challenge_awareness",
    question: "I understand that content strategy involves both creative and analytical work",
    type: "likert"
  }
];