
import React from "react";
import { ColorMapper } from "./utils/ColorMapper";


export default class ColorTest extends React.Component {
  render(): React.ReactNode {
    const colors = [...Array(2000).keys()].map((cId) => ColorMapper.generateColorFromId(cId, "#dddddd"));
    const pixelGridSize = 35;

    return (
      <div style={{ display: "grid", gridTemplateColumns: `${pixelGridSize}px `.repeat(Math.floor(1800 / pixelGridSize)) }}>
        {colors.map((color): React.ReactNode => {
          return (
            <div
              key={color}
              style={{
                backgroundColor: color,
                width: pixelGridSize,
                height: pixelGridSize,
              }}
            >
              <div style={{ color: ColorMapper.getFontColorByBackgroud(color) }}>Test</div>
            </div>
          );
        })}
      </div >
    );
  }
}