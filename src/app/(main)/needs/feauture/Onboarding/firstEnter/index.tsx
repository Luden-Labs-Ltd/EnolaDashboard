import React from 'react'
import InfoCard from '@components/InfoCard';
import AddIcon from 'shared/assets/AddIcon';


interface FirstEnterScreenProps {
  onClick: () => void;
}

const  FirstEnterScreen: React.FC<FirstEnterScreenProps> = ({onClick}) => {
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
        <button
          type="button"
          className="roundedBtn font-rubik"
          color="primary"
          onClick={onClick}
          data-testid="sendOtp"
          // startIcon={<AddIcon />}
        >
          Create Template
        </button>
        </div>
      </InfoCard>
    </div>
  )
}
export default FirstEnterScreen