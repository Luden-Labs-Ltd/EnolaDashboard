"use client"
import React from "react";
import InfoCard from "../ui/InfoCard";
import { Button } from "@mui/material";
import withTheme from "shared/hoc/withTheme";
import AddIcon from "./assets/AddIcon";
import '@styles/pages/needs.scss'

function NeedsContent() {
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
          fullWidth
          type="button"
          className="roundedBtn font-rubik"
          color="primary"
          variant="contained"
          data-testid="sendOtp"
          startIcon={<AddIcon />}
          size="medium"
        >
          Create Template
        </Button>
        </div>
      </InfoCard>
    </div>
  );
}

export default withTheme(NeedsContent);