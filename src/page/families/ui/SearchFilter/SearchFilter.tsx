"use client";

import FormRender, { FormRenderField } from "@components/FormRender";
import { Button } from "@components/shadowCDN/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQueryString, createQueryStringFromObject } from "@lib/url";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFamilyFormScheme = z.object({
  family_id: z.string().optional(),
  is_archived: z.boolean(),
  is_my_families: z.boolean(),
});

type SearchFamilyFormValues = z.infer<typeof searchFamilyFormScheme>;

export const SearchFilter = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<SearchFamilyFormValues>({
    resolver: zodResolver(searchFamilyFormScheme),
    defaultValues: {
      family_id: searchParams.get("family_id") ?? "",
      is_archived: searchParams.get("is_archived") === "true",
      is_my_families: searchParams.get("is_my_families") === "true",
    },
  });

  const updateUrl = (data: Record<string, any>) => {
    const newSearchParams = createQueryStringFromObject(data, searchParams);
    router.push(pathname + "?" + newSearchParams);
  };

  const editFormFields: FormRenderField<SearchFamilyFormValues>[] = [
    {
      name: "family_id",
      type: "input",
      id: "filter",
      label: t("Common.familyId"),
      placeholder: "",
    },
    {
      name: "is_archived",
      type: "checkbox",
      id: "is_archived",
      label: t("Common.isArchived"),
      placeholder: "",
    },
    {
      name: "is_my_families",
      type: "checkbox",
      id: "is_my_families",
      label: t("Common.family"),
      placeholder: "",
    },
  ];

  function onSubmit(values: SearchFamilyFormValues) {
    updateUrl(values);
  }

  const onClearHandler = () => {
    const originData: SearchFamilyFormValues = {
      family_id: "",
      is_archived: false,
      is_my_families: false,
    };
    form.reset(originData);
    updateUrl(originData);
  };

  return (
    <div>
      <FormRender
        formObject={form}
        onSubmitHandler={onSubmit}
        className="flex flex-row items-center max-w-[60%] justify-between"
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
