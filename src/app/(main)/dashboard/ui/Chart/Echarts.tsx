/* Created by Dhaval Laiya */

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import cx from "classnames";
import { ECBasicOption } from "echarts/types/dist/shared";


interface EchartsProps {
  loading: boolean,
  options: ECBasicOption,
  className?: string,
  style?: any,
  message?: any,
}

const ECharts: React.FC<EchartsProps> = (props) => {
  const { options, style, className, loading, message } = props;
  const [chart, setChart] = useState<echarts.EChartsType | null>(null);
  const chartRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current, null); // echarts theme
    if (!chart) {
      return
    }
    chart.setOption({ ...options, resizeObserver }, true); // second param is for 'noMerge'
    setChart(chart);
    // @ts-ignore
    if (resizeObserver) resizeObserver.observe(chartRef.current);
  }, [options]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (loading) {
      chart.showLoading();
      return;
    }

    chart.hideLoading();
  }, [chart, loading]);

  useEffect(() => {
    if (chart && options && message) {
      chart.clear();
    }
  }, [message]);

  const newStyle = {
    height: 500,
    ...style
  };

  return (
    <div className="echarts-parent position-relative">
      <div
        ref={chartRef}
        style={newStyle}
        className={cx("echarts-react", className)}
      />
      {message ? <div className="no-data">{message}</div> : null}
    </div>
  );
}

const resizeObserver = new ResizeObserver((entries) => {
  entries.map(({ target }) => {
    // @ts-ignore
    const instance = echarts.getInstanceByDom(target);
    if (instance) {
      instance.resize();
    }
  });
});

export default React.memo(ECharts);
