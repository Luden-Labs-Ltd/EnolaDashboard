"use client";
import React, { useState } from "react";
import FirstStep from "./firstStep";
import SecondeStep from "./secondeStep";

interface NeedsOnboardingProps {
  onComplete: () => void;
}
const NeedsOnboarding: React.FC<NeedsOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return <FirstStep onClick={() => setStep(2)} />;
  }

  return (
    <>
      <SecondeStep onClick={onComplete} />
    </>
  );
};

export default NeedsOnboarding;
