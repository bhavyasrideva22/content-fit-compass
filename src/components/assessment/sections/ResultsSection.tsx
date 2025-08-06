import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, TrendingUp, BookOpen, Target, Users } from "lucide-react";
import { useAssessmentStore } from "@/stores/assessmentStore";

interface ResultsSectionProps {
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
}

export const ResultsSection = ({ answers, onAnswer, onNext }: ResultsSectionProps) => {
  const { scores, calculateScores, setCompletionTime } = useAssessmentStore();

  useEffect(() => {
    calculateScores();
    setCompletionTime();
  }, [calculateScores, setCompletionTime]);

  if (!scores) {
    return <div>Calculating your results...</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-assessment-high";
    if (score >= 40) return "text-assessment-medium";
    return "text-assessment-low";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-success">Strong Fit</Badge>;
    if (score >= 40) return <Badge className="bg-warning">Moderate Fit</Badge>;
    return <Badge className="bg-destructive">Needs Development</Badge>;
  };

  const getRecommendation = () => {
    if (scores.overall >= 70) return "yes";
    if (scores.overall >= 40) return "maybe";
    return "no";
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Content Strategy Assessment Results</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your responses, here's your personalized analysis and career guidance.
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="p-8 text-center shadow-strong bg-gradient-card">
        <div className="mb-6">
          {recommendation === "yes" && (
            <div className="bg-success rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          )}
          {recommendation === "maybe" && (
            <div className="bg-warning rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          )}
          {recommendation === "no" && (
            <div className="bg-destructive rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-4">
          {recommendation === "yes" && "Content Strategy is a Great Fit!"}
          {recommendation === "maybe" && "Content Strategy Could Work for You"}
          {recommendation === "no" && "Consider Alternative Paths"}
        </h3>

        <p className="text-lg text-muted-foreground mb-6">
          {recommendation === "yes" && "Your assessment shows strong alignment with content strategy. You have the right combination of interests, skills, and mindset to succeed."}
          {recommendation === "maybe" && "You show potential for content strategy, but there are some areas that could benefit from development or further exploration."}
          {recommendation === "no" && "Based on your responses, other career paths might be better aligned with your current interests and strengths."}
        </p>

        <div className="flex items-center justify-center space-x-4">
          <span className="text-3xl font-bold text-primary">{scores.overall}%</span>
          <span className="text-muted-foreground">Overall Match</span>
          <span className="text-2xl font-bold text-accent">{scores.confidence}%</span>
          <span className="text-muted-foreground">Confidence</span>
        </div>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Core Assessments */}
        <Card className="p-6 shadow-medium">
          <h4 className="text-xl font-semibold mb-6">Core Assessment Scores</h4>
          <div className="space-y-4">
            <ScoreItem
              label="Psychometric Fit"
              score={scores.psychometric}
              description="Personality and interest alignment"
            />
            <ScoreItem
              label="Technical Readiness"
              score={scores.technical}
              description="Skills and knowledge foundation"
            />
          </div>
        </Card>

        {/* WISCAR Breakdown */}
        <Card className="p-6 shadow-medium">
          <h4 className="text-xl font-semibold mb-6">WISCAR Framework</h4>
          <div className="space-y-4">
            <ScoreItem label="Will" score={scores.wiscar.will} description="Passion & commitment" />
            <ScoreItem label="Interest" score={scores.wiscar.interest} description="Natural curiosity" />
            <ScoreItem label="Skill" score={scores.wiscar.skill} description="Core competencies" />
            <ScoreItem label="Cognitive" score={scores.wiscar.cognitive} description="Thinking readiness" />
            <ScoreItem label="Ability" score={scores.wiscar.ability} description="Learning mindset" />
            <ScoreItem label="Real-World" score={scores.wiscar.realWorld} description="Job understanding" />
          </div>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-medium">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Your Strengths
          </h4>
          <div className="space-y-3">
            {getStrengths(scores).map((strength, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-medium">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-warning" />
            Development Areas
          </h4>
          <div className="space-y-3">
            {getDevelopmentAreas(scores).map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Career Paths */}
      <Card className="p-6 shadow-medium">
        <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Recommended Career Paths
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getRecommendedCareers(scores).map((career, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h5 className="font-semibold mb-2">{career.title}</h5>
              <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Match:</span>
                <Badge variant={career.match >= 70 ? "default" : career.match >= 40 ? "secondary" : "outline"}>
                  {career.match}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Path */}
      <Card className="p-6 shadow-medium">
        <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Your Personalized Learning Path
        </h4>
        <div className="space-y-4">
          {getLearningPath(scores).map((stage, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold mb-2">{stage.title}</h5>
                <p className="text-sm text-muted-foreground mb-3">{stage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {stage.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 shadow-medium bg-gradient-primary text-white">
        <h4 className="text-xl font-semibold mb-4">Ready to Take the Next Step?</h4>
        <p className="mb-6 opacity-90">
          Your assessment is complete! Based on your results, here are the immediate actions you can take:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" className="flex-1">
            Download Full Report
          </Button>
          <Button variant="outline" className="flex-1 border-white text-white hover:bg-white hover:text-primary">
            Explore Learning Resources
          </Button>
        </div>
      </Card>
    </div>
  );
};

const ScoreItem = ({ label, score, description }: { label: string; score: number; description: string }) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-assessment-high";
    if (score >= 40) return "bg-assessment-medium";
    return "bg-assessment-low";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{label}</span>
        <span className="text-sm font-bold">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const getStrengths = (scores: any) => {
  const strengths = [];
  if (scores.psychometric >= 70) strengths.push("Strong personality fit for content strategy");
  if (scores.technical >= 70) strengths.push("Solid technical foundation and aptitude");
  if (scores.wiscar.will >= 70) strengths.push("High motivation and commitment level");
  if (scores.wiscar.interest >= 70) strengths.push("Genuine interest in content and strategy");
  if (scores.wiscar.skill >= 70) strengths.push("Strong existing skills in relevant areas");
  if (scores.wiscar.cognitive >= 70) strengths.push("Excellent critical thinking abilities");
  if (scores.wiscar.ability >= 70) strengths.push("Growth mindset and learning orientation");
  if (scores.wiscar.realWorld >= 70) strengths.push("Realistic understanding of the role");
  
  return strengths.length > 0 ? strengths : ["Potential for growth in multiple areas"];
};

const getDevelopmentAreas = (scores: any) => {
  const areas = [];
  if (scores.psychometric < 40) areas.push("Consider if content strategy aligns with your interests");
  if (scores.technical < 40) areas.push("Build foundational technical and analytical skills");
  if (scores.wiscar.will < 40) areas.push("Explore your long-term career motivation");
  if (scores.wiscar.interest < 40) areas.push("Investigate content strategy through courses or projects");
  if (scores.wiscar.skill < 40) areas.push("Develop writing, strategy, and communication skills");
  if (scores.wiscar.cognitive < 40) areas.push("Practice analytical and strategic thinking");
  if (scores.wiscar.ability < 40) areas.push("Cultivate a growth mindset and feedback receptivity");
  if (scores.wiscar.realWorld < 40) areas.push("Gain more exposure to actual content strategy work");
  
  return areas.length > 0 ? areas : ["Continue building on your existing strengths"];
};

const getRecommendedCareers = (scores: any) => {
  const careers = [
    {
      title: "Content Strategist",
      description: "Plan and manage content strategy across platforms",
      match: Math.round((scores.psychometric + scores.wiscar.skill + scores.wiscar.cognitive) / 3)
    },
    {
      title: "Content Writer",
      description: "Focus on creating compelling written content",
      match: Math.round((scores.wiscar.skill + scores.wiscar.interest + scores.psychometric) / 3)
    },
    {
      title: "SEO Specialist",
      description: "Optimize content for search visibility",
      match: Math.round((scores.technical + scores.wiscar.cognitive + scores.wiscar.skill) / 3)
    }
  ];
  
  return careers.sort((a, b) => b.match - a.match);
};

const getLearningPath = (scores: any) => {
  const isBeginnerLevel = scores.technical < 50;
  const needsFoundation = scores.wiscar.skill < 50;
  
  if (isBeginnerLevel || needsFoundation) {
    return [
      {
        title: "Foundation Stage",
        description: "Build core understanding of content strategy principles",
        topics: ["Content Strategy Basics", "Writing Fundamentals", "Basic SEO", "Content Planning"]
      },
      {
        title: "Skill Development",
        description: "Develop technical skills and practical experience",
        topics: ["Analytics Tools", "CMS Platforms", "Content Auditing", "Strategy Frameworks"]
      },
      {
        title: "Specialization",
        description: "Choose your focus area and build expertise",
        topics: ["Advanced SEO", "Content Marketing", "UX Writing", "Brand Strategy"]
      }
    ];
  }
  
  return [
    {
      title: "Intermediate Skills",
      description: "Advance your existing knowledge and skills",
      topics: ["Advanced Strategy", "Data Analysis", "Content Governance", "Team Leadership"]
    },
    {
      title: "Professional Development",
      description: "Build portfolio and gain real-world experience",
      topics: ["Portfolio Projects", "Client Work", "Industry Networking", "Thought Leadership"]
    }
  ];
};