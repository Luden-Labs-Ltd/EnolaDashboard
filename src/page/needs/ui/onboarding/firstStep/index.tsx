import React from "react";
import InfoCard from "@components/InfoCard";
import AddIcon from "shared/assets/AddIcon";
import { Button } from "@components/shadowCDN/button";

interface FirstStepProps {
  onClick: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onClick }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <InfoCard step={1} maxWidth={500}>
        <p>
          This page allows you to manage the categories and tasks for your
          program. Here, you can discover, edit, and customize the needs for
          your users.
        </p>
        <p>
          To get started, create the initial template of categories for the
          program.
        </p>

        <div className="max-w-80 w-full">
          <Button
            withIcon
            variant="default"
            size="full"
            rounded={"circle"}
            onClick={onClick}
          >
            <AddIcon />
            <span>Create Template</span>
          </Button>
        </div>
      </InfoCard>
    </div>
  );
};
export default FirstStep;
