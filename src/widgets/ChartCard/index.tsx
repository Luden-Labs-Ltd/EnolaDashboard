import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@utils";

type DataSet = {
  value: number;
  label: string;
  color: string;
};

interface ChartCardProps {
  title: string;
  dataSet: DataSet[];
}

const Echarts = dynamic(() => import("@components/Chart/Echarts"), {
  ssr: false,
  loading: () => {
    return <div>loading</div>;
  },
});

const ChartCard: React.FC<ChartCardProps> = ({ title, dataSet }) => {
  const t = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "he";
  const totalSum = dataSet.reduce((prev, current) => prev + current.value, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent padding="20px 0px 0px 0px">
        <div className="flex px-5 flex-col gap-2" dir={isRtl ? "rtl" : "ltr"}>
          {dataSet.map((item) => {
            return (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between gap-4",
                  isRtl ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex min-w-0 items-center gap-3",
                    isRtl ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ background: item.color }}
                  />
                  <p className={cn("min-w-0 text-sm leading-5", isRtl ? "text-right" : "text-left")}>
                    {item.label}
                  </p>
                </div>
                <p className={cn("shrink-0 text-sm", isRtl ? "text-left" : "text-right")}>
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-2 w-full">
          <Echarts
            className="w-full"
            style={{
              width: "100%",
              height: 150,
            }}
            loading={false}
            options={{
              animation: false,
              tooltip: {
                trigger: "item",
              },
              legend: {
                show: false,
                height: 0,
                itemHeight: 0,
                padding: 0,
              },
              series: [
                {
                  name: title,
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  animation: false,
                  label: {
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: 16,
                    fontWidth: 500,
                    position: "center",
                    formatter: () => {
                      return `${totalSum}\n${t("total")}`;
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  color: dataSet.map((item) => {
                    return item.color;
                  }),
                  data: dataSet.map((item) => {
                    return {
                      value: item.value,
                      name: item.label,
                    };
                  }),
                },
              ],
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
