"use client";

import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Program } from "entities/auth/api/types";
import { createQueryStringFromObject } from "@lib/url";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProgramFilterProps {
  programs: Program[];
}

const searchProgramFormScheme = z.object({
  program_id: z.string().optional(),
});

type SearchProgramFormValues = z.infer<typeof searchProgramFormScheme>;

export const ProgramFilter: React.FC<ProgramFilterProps> = ({ programs }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<SearchProgramFormValues>({
    resolver: zodResolver(searchProgramFormScheme),
    defaultValues: {
      program_id: searchParams.get("program_id") ?? "",
    },
  });

  const updateUrl = (data: Record<string, any>) => {
    const newSearchParams = createQueryStringFromObject(data, searchParams);
    router.push(pathname + "?" + newSearchParams);
  };

  const programOptions = programs.map((program) => ({
    value: program.id,
    name: program.name,
  }));

  const editFormFields: FormRenderField<SearchProgramFormValues>[] = [
    {
      name: "program_id",
      type: "select",
      id: "program_id",
      label: t("Common.program"),
      placeholder: t("Common.selectProgram"),
      options: programOptions,
    },
  ];

  function onSubmit(values: SearchProgramFormValues) {
    updateUrl(values);
  }

  const onClearHandler = () => {
    const originData: SearchProgramFormValues = {
      program_id: "",
    };
    form.reset(originData);
    updateUrl(originData);
  };

  return (
    <div>
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        className="flex flex-row items-center max-w-[55%] justify-between"
        fieldsClassName="flex flex-row items-center gap-[20px]"
        fields={editFormFields}
      >
        <div>
          <div className="flex gap-6">
            <Button
              variant={"secondary"}
              onClick={onClearHandler}
              type="button"
              size={"lg"}
            >
              {t("Common.clear")}
            </Button>
            <Button type="submit" size={"lg"}>
              {t("Common.filter")}
            </Button>
          </div>
        </div>
      </FormRender>
    </div>
  );
};
