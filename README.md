# @leaflet-custom/map-with-labels

A high-performance Leaflet plugin for rendering priority-based labels on an HTML5 Canvas. This library allows you to display thousands of labels with collision detection, custom styling, and seamless Leaflet integration.

## Features

- 🚀 **Canvas Rendering**: Handles thousands of labels without slowing down the map.
- 🎯 **Collision Detection**: Automatically hides overlapping labels based on priority.
- 🎨 **Dynamic Styling**: Style labels (color, font, size) directly via JavaScript.
- 📦 **Zero CSS Import**: Styles are injected automatically — no extra `.css` file needed.
- 🛠 **Modern Build**: Supports ESM and CommonJS (ES2020 target).

---

## Installation

Since this package is currently in development, you can install it directly from GitHub:

```bash
npm install https://github.com/hegenj/leaflet-custom-map-with-labels.git
```

---

## Quick Start (Vanilla JS)

This is the simplest way to use the library in a plain HTML/JS environment.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="node_modules/@leaflet-custom/map-with-labels/dist/index.js"></script>
    <style>
      #map {
        height: 600px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      // Initialize the specialized map
      const map = L.mapWithLabels("map").setView([47.5, 19.0], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map,
      );

      // Add a GeoJSON layer with labels
      L.geoJson(myData, {
        label: (layer) => layer.feature.properties.name,
        labelPos: "cc",
        labelStyle: {
          fontWeight: "bold",
          whiteSpace: "normal",
          minWidth: "40px",
          textAlign: "center",
          color: "brown",
        },
        priority: (layer) => layer.feature.properties.population,
      }).addTo(map);
    </script>
  </body>
</html>
```

---

## Usage in Angular (Nx / CLI)

After installing the package, you can use it in your Angular components.

```typescript
import { Component, OnInit } from "@angular/core";
// Import the library and Leaflet namespace
import { L, mapWithLabels } from "@leaflet-custom/map-with-labels";

@Component({
  selector: "app-map",
  template: '<div id="map" style="height: 500px;"></div>',
})
export class MapComponent implements OnInit {
  ngOnInit() {
    // Initialize map using the custom factory
    const map = mapWithLabels("map").setView([47, 19], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    // Labels are automatically handled by the Canvas renderer
    L.geoJson(geoData, {
      label: (layer: Label<any>) => layer.feature?.properties.cityName,
      labelStyle: { color: "blue", fontSize: "12px" },
      priority: (layer: any) => layer.feature.properties.rank,
    }).addTo(map);
  }
}
```

---

## API Reference

### `mapWithLabels(id, options)`

A factory method that creates a Leaflet `Map` with the `CanvasWithLabels` renderer pre-configured.

| Parameter | Type         | Description                              |
| --------- | ------------ | ---------------------------------------- |
| `id`      | `string`     | The ID of the HTML container element.    |
| `options` | `MapOptions` | Standard Leaflet map options (optional). |

**Returns:** A Leaflet `Map` instance with Canvas label rendering enabled.

### GeoJSON Layer Options

These options extend the standard Leaflet `GeoJSON` options:

| Option       | Type                | Description                                                                                       |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------- |
| `label`      | `(layer) => string` | Function returning the label text for a given feature.                                            |
| `labelStyle` | `LabelStyle`        | Object defining the visual style of the label.                                                    |
| `priority`   | `(layer) => number` | Function returning a numeric priority — higher values are shown first during collision detection. |

### `LabelStyle` Object

| Property     | Type     | Example     | Description  |
| ------------ | -------- | ----------- | ------------ |
| `color`      | `string` | `'#2c3e50'` | Text color.  |
| `fontSize`   | `string` | `'14px'`    | Font size.   |
| `fontWeight` | `string` | `'bold'`    | Font weight. |

---

## Examples

### 1. Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Installation

Install the dependencies for the library:

```bash
npm install
```

### 3. Build the Library

```bash
npm run build
```

## Vanilla JS Example

```bash
npm run start:exampleJS
```

Once started, open your browser at:
http://localhost:8080/examples/vanilla/index.html

## 🅰️ Angular Example

This example demonstrates how to use @leaflet-custom/map-with-labels within a modern Angular (v17+) environment using standalone components and HttpClient.

## 🛠️ Prerequisites

Before running the Angular app, you must build the main library to generate the necessary type definitions and JavaScript bundles:

A Gemini ezt mondta:
To wrap this up, here is a professional and clear README section specifically for the Angular example. It covers the installation, the necessary build step for the library, and how to use the custom types we just perfected.

🅰️ Angular Integration Example
This example demonstrates how to use @leaflet-custom/map-with-labels within a modern Angular (v17+) environment using standalone components and HttpClient.

🛠️ Prerequisites
Before running the Angular app, you must build the main library to generate the necessary type definitions and JavaScript bundles:

```bash
# From the project root
npm run build
```

🚀 Getting Started
Navigate to the example directory:

```bash
cd examples/angular
Install dependencies:
```

```bash
npm install
Start the development server:
```

```bash
npm start
```

The app will be available at http://localhost:4200.

## 📖 Usage Guide

1. Configuration (tsconfig.json)
   To ensure Angular correctly resolves the library and its types during development, the paths mapping is configured to point to the dist folder:

```json

"compilerOptions": {
  "paths": {
    "@leaflet-custom/map-with-labels": ["../../dist/index.d.ts"]
  }
}

```

```typescript
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  L,
  mapWithLabels,
  MapWithLabelsGeoJSONOptions,
} from "@leaflet-custom/map-with-labels";

@Component({
  selector: "app-root",
  standalone: true,
  template: `<div id="map" style="height: 100vh;"></div>`,
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialize the specialized map
    const map = mapWithLabels("map").setView([47.16, 19.5], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    // Fetch and display GeoJSON with custom labels
    this.http.get("assets/hu_counties.geojson").subscribe((data) => {
      const options: MapWithLabelsGeoJSONOptions = {
        style: { color: "#34495e", weight: 2 },
        label: (layer: Layer<any>) => layer.feature.properties.name,
        labelPos: "cc", // Center-Center
        labelStyle: {
          color: "brown",
          fontWeight: "bold",
          fontSize: "14px",
        },
      };

      L.geoJson(data, options).addTo(map);
    });
  }
}
```

Assets: Place your .geojson files in the src/assets/ folder so they are accessible via fetch or HttpClient at runtime.

Type Safety: Always use the exported L and mapWithLabels from the package instead of the global L to ensure the plugin's internal methods are recognized by the TypeScript compiler.

Re-building: If you modify the core library source code, remember to run **npm run build** in the root directory and restart the Angular dev server to see the changes.

---

## License

MIT

```

```
