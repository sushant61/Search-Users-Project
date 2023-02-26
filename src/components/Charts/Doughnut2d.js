import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);
const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars per language",
        doughnutRadius: "45%",
        decimals: 0,
        theme: "candy",
        showPercentValues: 0,
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
