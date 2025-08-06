import { useState } from "react";
import { Assessment } from "@/components/assessment/Assessment";
import { LandingPage } from "@/components/landing/LandingPage";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <Assessment onBack={() => setShowAssessment(false)} />;
  }

  return <LandingPage onStartAssessment={() => setShowAssessment(true)} />;
};

export default Index;