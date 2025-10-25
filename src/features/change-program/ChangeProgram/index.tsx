"use client";
import Image, { StaticImageData } from "next/image";
import React, { PropsWithChildren, useState } from "react";
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

interface ChangeProgramProps {
  logo: StaticImageData;
  programs: Program[];
  originCurrentProgram: Program | null;
}

export const ChangeProgram: React.FC<PropsWithChildren<ChangeProgramProps>> = ({
  logo,
  programs,
  originCurrentProgram,
}) => {
  const [currentProgram, setCurrentProgram] = useState(
    originCurrentProgram ? originCurrentProgram : programs[0]
  );

  const onCurrentProgramChange = (program: Program) => {
    changeProgram(program)
      .then(() => {
        setCurrentProgram(program);
      })
      .catch(() => { });
  };

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
            {programs.map((program, index) => {
              const isActive = program.id === currentProgram.id;
              const isDivider = programs.length - 1 !== index;
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={styles.programName}>
        {currentProgram.name}
        <ActivateProgram
          onProgramActivateCallback={(program) =>
            onCurrentProgramChange(program)
          }
          isDisabled={currentProgram.active}
          programId={currentProgram.id}
        />
      </div>
    </form>
  );
};
