import * as L from "leaflet";

export function initMapWithLabelsPlugin(leaflet: typeof L): {
  MapWithLabels: any;
  mapWithLabels: (id: string | HTMLElement, options?: L.MapOptions) => any;
};
