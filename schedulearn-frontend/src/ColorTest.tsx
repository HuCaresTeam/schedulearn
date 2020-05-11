
import React from "react";
import { ColorMapper } from "./utils/ColorMapper";

export default class ColorTest extends React.Component {
  render(): React.ReactNode {
    const colors = [...Array(2000).keys()].map((cId) => ({ id: cId, color: ColorMapper.generateColorFromId(cId, "#dddddd") }));
    const pixelGridSize = 60;

    return (
      <div style={{ display: "grid", gridTemplateColumns: `${pixelGridSize}px `.repeat(Math.floor(1800 / pixelGridSize)) }}>
        {colors.map((colorData): React.ReactNode => {
          return (
            <div
              key={colorData.color}
              style={{
                backgroundColor: colorData.color,
                border: `1px solid ${ColorMapper.generateColorFromId(colorData.id, "#222222")}`,
                width: pixelGridSize,
                height: pixelGridSize,
              }}
            >
              <div style={{ color: ColorMapper.getFontColorByBackgroud(colorData.color) }}>Test</div>
            </div>
          );
        })}
      </div >
    );
  }
}