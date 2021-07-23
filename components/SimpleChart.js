import { Chart } from "frappe-charts";
import { createRef, useEffect } from "react";

export default function SimpleChart({ data }) {
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
