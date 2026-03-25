"use client";
import Image, { StaticImageData } from "next/image";
import React, { PropsWithChildren, useState, useEffect } from "react";
import styles from "./changeProgram.module.scss";
import { Program } from "entities/auth/api/types";
import BurgerIcon from "shared/assets/BurgerIcon";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/shadowCDN/dropdown-menu";
import { Button } from "@components/shadowCDN/button";
import { changeProgram } from "entities/program";
import { ActivateProgram } from "../activate-program";
import { cn } from "@utils";
import { CreateProgram } from "features/create-program";
import AddIcon from "shared/assets/AddIcon";
import { useTranslations } from "next-intl";

interface ChangeProgramProps {
  logo: StaticImageData;
  programs: Program[];
  originCurrentProgram: Program | null;
  isAdmin?: boolean;
}

export const ChangeProgram: React.FC<PropsWithChildren<ChangeProgramProps>> = ({
  logo,
  programs,
  originCurrentProgram,
  isAdmin = false,
}) => {
  const t = useTranslations();
  const [programsState, setProgramsState] = useState<Program[]>(programs);
  const [currentProgram, setCurrentProgram] = useState(
    originCurrentProgram ? originCurrentProgram : programs[0]
  );

  useEffect(() => {
    if (
      currentProgram &&
      !programsState.some((program) => program.id === currentProgram.id)
    ) {
      onCurrentProgramChange(programsState[0]);
    }
  }, [programsState]);

  useEffect(() => {
    setProgramsState(programs);
  }, [programs]);

  const onCurrentProgramChange = (program: Program) => {
    changeProgram(program)
      .then(() => {
        setCurrentProgram(program);
      })
      .catch(() => { });
  };

  if (!currentProgram) {
    return <div>No program found</div>;
  }

  return (
    <form>
      <div className={styles.topLogoWrapper}>
        <Image alt="logo navbar" src={logo} priority />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <BurgerIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            sideOffset={30}
            className={cn(styles.DropdownMenuContent, "border-0")}
          >
            {programsState.map((program, index) => {
              const isActive = program.id === currentProgram.id;
              const isDivider = programsState.length - 1 !== index;
              return (
                <DropdownMenuItem
                  key={program.id}
                  onClick={() => onCurrentProgramChange(program)}
                  className={`
                      ${styles.DropdownMenuItem}
                      ${isActive && styles.activeItem}
                      ${isDivider && styles.Divider}`}
                >
                  {program.name}
                </DropdownMenuItem>
              );
            })}
            {isAdmin && (
              <div className={styles.AddProgramItem}>
                <CreateProgram
                  onCreated={(program) => {
                    setProgramsState((prev) => [...prev, program]);
                    onCurrentProgramChange(program);
                  }}
                  trigger={
                    <Button
                      variant="ghost"
                      size="default"
                      className={styles.AddProgramButton}
                    >
                      <AddIcon />
                      <span>
                        {t("Common.add")} {t("Common.program")}
                      </span>
                    </Button>
                  }
                />
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={styles.programName}>
        {currentProgram.name}
        <div className="flex flex-wrap gap-2">
          <ActivateProgram
            onProgramActivateCallback={(program) =>
              onCurrentProgramChange(program)
            }
            isDisabled={currentProgram.active}
            programId={currentProgram.id}
          />
        </div>
      </div>
    </form>
  );
};
