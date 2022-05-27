import { BarDatum, ResponsiveBar } from "@nivo/bar";

import "./styles.css"

interface Props {
  chartData: BarDatum[];
}

function CommitsChart({ chartData }: Props) {
  return (
    <ResponsiveBar
      data={chartData}
      keys={["commits"]}
      indexBy="hour"
      margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
      padding={0.2}
      valueScale={{ type: "linear" }}
      colors={{ scheme: "nivo" }}
      colorBy="indexValue"
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    />
  );
}

export default CommitsChart;
