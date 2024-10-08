"use client";
import React, { useState } from "react";
import { NeedsTable, Categories, Content, HeaderPanel } from "../NeedsTable";
import InfoCard from "@components/InfoCard";
import FirstEnterScreen from "./firstEnter";
import AddIcon from "shared/assets/AddIcon";
import { Button } from "@components/shadowCDN/button";

interface NeedsOnboardingProps {
  onComplete: () => void;
}
const NeedsOnboarding: React.FC<NeedsOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return <FirstEnterScreen onClick={() => setStep(2)} />;
  }

  return (
    <>
      <NeedsTable>
        <Categories></Categories>
        <Content>
          <HeaderPanel>
            <h3>Tasks</h3>
          </HeaderPanel>
          <div className="p-8 flex flex-col gap-8">
            <InfoCard step={2} maxWidth={500}>
              <p>
                Get started by selecting categories. Once created, categories
                cannot be deleted or renamed to ensure consistency. We provide
                an initial set of categories and tasks for you to choose from.
              </p>
              <p>
                When adding categories, you will need to specify the name, icon,
                and color.
              </p>

              <div className="w-full flex gap-4 items-center">
                <p>
                  <b className="dark">Use the button</b>
                </p>
                <Button withIcon onClick={onComplete} variant="secondary">
                  <AddIcon />
                  <span className="font-grotesk">Add category</span>
                </Button>
              </div>
            </InfoCard>
            <InfoCard step={3} maxWidth={500}>
              <p>
                Then select from the list or create tasks. Decide which tasks
                will be visible in the app for families to discover.
              </p>
              <p>
                Additionally, based on your experience, you can pick the most
                frequent or important tasks for each new family to help them
                start using the app. Families will be able to edit or delete
                these tasks later if they are not relevant.
              </p>

              <div className="w-full flex gap-4 items-center">
                <p>
                  <b className="dark">Use the button</b>
                </p>
                <Button withIcon onClick={onComplete} variant="secondary">
                  <AddIcon />
                  <span className="font-grotesk">Add Task</span>
                </Button>
              </div>
            </InfoCard>
          </div>
        </Content>
      </NeedsTable>
    </>
  );
};

export default NeedsOnboarding;
