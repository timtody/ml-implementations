import { Chart } from "frappe-charts";
import { createRef, useEffect } from "react";

const data = {
  labels: [
    "12am-3am",
    "3am-6pm",
    "6am-9am",
    "9am-12am",
    "12pm-3pm",
    "3pm-6pm",
    "6pm-9pm",
    "9am-12am",
  ],
  datasets: [
    {
      name: "Love for bobi",
      chartType: "bar",
      values: [25, 40, 30, 35, 8, 52, 17, 999],
    },
    {
      name: "Another Set",
      chartType: "line",
      values: [25, 50, -10, 15, 18, 32, 27, 14],
    },
  ],
};

export default function SimpleChart() {
  let ref = createRef();
  useEffect(() => {
    new Chart(ref.current, {
      title: "My Awesome bobi Chart",
      data: data,
      type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ["#7cd6fd", "#743ee2"],
    });
  }, []);
  return <div ref={ref} />;
}
