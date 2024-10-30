import React from "react";
import styles from "./card.module.scss";
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import dynamic from "next/dynamic";
import Row from "@components/Row";

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
  const totalSum = dataSet.reduce((prev, current) => prev + current.value, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent padding="20px 0px 0px 0px">
        <div className="flex px-5 mx-50 flex-col gap-2">
          {dataSet.map((item) => {
            return (
              <Row key={item.label} className="justify-between">
                <Row alignItems="center">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ background: item.color }}
                  ></div>
                  <p>{item.label}</p>
                </Row>
                <p>{item.value}</p>
              </Row>
            );
          })}
        </div>
        <Echarts
          style={{
            height: 150,
          }}
          loading={false}
          options={{
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
                label: {
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: 16,
                  fontWidth: 500,
                  position: "center",
                  formatter: () => {
                    return `${totalSum}\nTotal`;
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
      </CardContent>
    </Card>
  );
};

export default ChartCard;
