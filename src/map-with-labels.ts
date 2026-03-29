const injectStyles = () => {
  if (typeof document === "undefined") return;

  const styleId = "leaflet-map-with-labels-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .leaflet-label {
        position: absolute;
        white-space: nowrap;
        font-size: 15px;
        line-height: normal;
        padding: 2px;
        text-shadow: -1px -1px #fff, 1px 1px #fff, -1px 1px #fff, 1px -1px #fff, 0 -1px #fff, 0 1px #fff;
        pointer-events: none; /* Biztosítja, hogy a felirat ne zavarja a térkép kattintásait */
    }
  `;
  document.head.appendChild(style);
};

injectStyles();

import * as L_base from "leaflet";

import { initMapWithLabelsPlugin } from "./leaflet-mapwithlabels.js";

// 1. Type definitions (Interface Merging)
declare module "leaflet" {
  /**
   *label CSS styles
   */
  export interface LabelStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string | number;
    fontStyle?: "normal" | "italic" | "oblique";
    opacity?: number; // (0.0 - 1.0)
    textAlign?: "left" | "right" | "center" | "start" | "end";
    textBaseline?:
      | "top"
      | "hanging"
      | "middle"
      | "alphabetic"
      | "ideographic"
      | "bottom";
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    [key: string]: any; // Other custom CSS properties0
  }

  interface Layer<P = any> {
    feature?: {
      type: "Feature";
      geometry: any;
      properties: P;
    };
  }

  interface LayerOptions<P = any> {
    label?: string | ((layer: Layer<P>) => string);
    labelGap?: number;
    labelPos?: "auto" | "r" | "l" | "cc";
    labelStyle?: LabelStyle;
    labelPriority?: number | ((layer: Layer<P>) => number);
    labelRepeatAlongLines?: boolean;
    labelRepeatDistance?: number;
    markerWithLabelOnly?: boolean;
  }

  // interface GeoJSONOptions<
  //   P = any,
  //   G extends import("geojson").Geometry = import("geojson").Geometry,
  // > extends LayerOptions<P> {}

  class MapWithLabels extends Map {
    _updateLabels(): void;
  }

  function mapWithLabels(
    id: string | HTMLElement,
    options?: MapOptions,
  ): MapWithLabels;
}

// plugin init

const plugin = initMapWithLabelsPlugin(L_base);

// 2. Export the original Leaflet
export const L = L_base;

// 3. Export the factory function DIRECTLY from the plugin result
export const mapWithLabels = (
  id: string | HTMLElement,
  options?: L_base.MapOptions,
) => {
  // We use the factory returned by the plugin, not L.mapWithLabels
  return plugin.mapWithLabels(id, options) as L_base.MapWithLabels;
};
