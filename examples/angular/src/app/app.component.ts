import { Component, inject, OnInit } from "@angular/core";
import { L, mapWithLabels } from "@leaflet-custom/map-with-labels";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  template: `<div id="map" style="height: 100vh;"></div>`,
  styles: [
    `
      #map {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  ngOnInit() {
    const map = mapWithLabels("map").setView([47.16, 19.5], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    this.http
      .get<GeoJSON.FeatureCollection>("assets/hu_counties.geojson")
      .subscribe((data: GeoJSON.FeatureCollection) => {
        L.geoJson(data, {
          style: {
            color: "#3388ff",
            weight: 2,
            fillColor: "transparent",
            fillOpacity: 0.1,
          },
          label: (l) => l.feature?.properties.name || "Name is missing",
          labelPos: "cc",
          labelStyle: {
            fontWeight: "bold",
            whiteSpace: "normal",
            minWidth: "40px",
            textAlign: "center",
            color: "red",
          },
          labelPriority: 5e4,
        }).addTo(map);
      });
  }
}
