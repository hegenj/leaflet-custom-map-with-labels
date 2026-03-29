# @leaflet-custom/map-with-labels

A high-performance Leaflet plugin for rendering priority-based labels on an HTML5 Canvas. This library allows you to display thousands of labels with collision detection, custom styling, and seamless Leaflet integration.

📜 Acknowledgments & Credits

This library is a TypeScript-ready wrapper built upon the core labeling logic developed by [@samanbey](https://github.com/samanbey).

- Core Engine: The high-performance Canvas labeling and collision detection logic is based on the [leaflet-mapwithlabels](https://github.com/samanbey/leaflet-mapwithlabels) repository.

💡This version adds:

- Full TypeScript support (Type definitions).

- Modern ESM bundling with Vite.

- Framework-agnostic wrapper factory.

- Ready-to-use examples for Angular, React, and Vue.js.

---

### 🌐 Framework Agnostic by Design

The core engine is written in pure TypeScript, making it 100% framework agnostic. Whether you are building a simple static site or a complex enterprise application, this plugin integrates effortlessly into any modern JavaScript ecosystem.

To get you started quickly, we provide production-ready implementation examples for the four most popular environments:

- 🖼️ Vanilla JS – For lightweight, zero-dependency projects.

- 🅰️ Angular – Using standalone components and HttpClient integration.

- ⚛️ React – Managed via useRef and useEffect with React 18+ support.

- 🟢 Vue.js 3 – Optimized with shallowRef for high-performance reactivity.

### 📂 Repository Structure

```plaintext
.
├── src/                # Core library source (TypeScript)
├── dist/               # Compiled bundles and type definitions
└── examples/           # Framework-specific implementations
    ├── vanilla/        # Pure JS / HTML example
    ├── angular/        # Angular (v17+) example
    ├── react/          # React + Vite example
    └── vue/            # Vue 3 + Vite example

```

---

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

📂 Repository Overview

| Framework         | Folder             | Entry Point                |
| :---------------- | :----------------- | :------------------------- |
| 🍦 **Vanilla JS** | `examples/vanilla` | `index.html`               |
| 🅰️ **Angular**    | `examples/angular` | `src/app/map.component.ts` |
| ⚛️ **React**      | `examples/react`   | `src/App.tsx`              |
| 🟢 **Vue.js 3**   | `examples/vue`     | `src/App.vue`              |

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

---

## 🖼️ Vanilla JS Example

```bash
npm run start:exampleJS
```

Once started, open your browser at:
http://localhost:8080/examples/vanilla/index.html

---

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
```

Start the development server:

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

## ⚛️ React Integration

React manages the DOM differently than Leaflet, so we use useRef to maintain the map instance and useEffect for initialization.

### 🛠️ Prerequisites

Ensure the main library is built before running the React app:

```bash
npm run build
```

### 📖 Usage Guide

1. Vite Configuration (vite.config.ts)
   Since the library is not yet published to NPM, tell Vite where to find the source files using an alias:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@leaflet-custom/map-with-labels": path.resolve(
        __dirname,
        "../../dist/index.js",
      ),
    },
  },
});
```

2. Main Implementation (App.tsx)

```typescript

import { useEffect, useRef } from 'react';
import { L, mapWithLabels } from '@leaflet-custom/map-with-labels';
import 'leaflet/dist/leaflet.css';

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    // Prevent double initialization in React 18 Strict Mode
    if (!mapRef.current || mapInstance.current) return;

    // Initialize using the custom factory
    const map = mapWithLabels(mapRef.current).setView([47.16, 19.50], 7);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Example: Loading GeoJSON with automatic labels
    fetch('/hu_counties.geojson')
      .then(res => res.json())
      .then(data => {
        if (mapInstance.current) {
          L.geoJson(data, {
            label: (layer: any) => layer.feature.properties.name,
            labelPos: 'cc',
            labelStyle: {
              color: '#2c3e50',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }).addTo(mapInstance.current);
        }
      });

    // Cleanup when component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
```

Start the development server:

```bash
npm run dev
```

### ⚠️ Common React Pitfalls

Map Container Height: The div containing the map must have a defined height (e.g., height: 100vh or 500px), otherwise the map will have 0px height and won't be visible.

Ref Type Safety: Always use useRef<L.Map | null>(null) to ensure TypeScript correctly handles Leaflet methods and prevents "null pointer" errors during asynchronous data loading (like fetch).

CSS Import: Ensure leaflet/dist/leaflet.css is imported in your App.tsx or main.tsx to prevent tile misalignment.

---

## 🟢 Vue.js 3 Integration

Vue 3 works seamlessly with the library using the Composition API. To ensure optimal performance, we use shallowRef for the map instance to prevent Vue from making the entire Leaflet object tree reactive.

### 🛠️ Prerequisites

Ensure the main library is built:

```bash
npm run build
```

### 📖 Usage Guide

1. Vite Configuration (vite.config.ts)
   Since we are using a local build, add an alias to your Vite config:

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@leaflet-custom/map-with-labels": path.resolve(
        __dirname,
        "../../dist/index.js",
      ),
    },
  },
});
```

2. Component Implementation (App.vue)

```typescript
<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, shallowRef } from 'vue';
import { L, mapWithLabels } from '@leaflet-custom/map-with-labels';
import 'leaflet/dist/leaflet.css';

// Get a reference to the DOM element
const mapContainer = useTemplateRef<HTMLDivElement>('mapContainer');

// Use shallowRef for third-party objects like Leaflet maps
const leafletMap = shallowRef<L.Map | null>(null);

onMounted(() => {
  if (!mapContainer.value) return;

  // Initialize the map with our custom factory
  const map = mapWithLabels(mapContainer.value).setView([47.16, 19.50], 7);
  leafletMap.value = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Example: GeoJSON with auto-labels
  fetch('/hu_counties.geojson')
    .then(res => res.json())
    .then(data => {
      if (leafletMap.value) {
        L.geoJson(data, {
          label: (layer: any) => layer.feature.properties.name,
          labelPos: 'cc',
          labelStyle: {
            color: '#27ae60',
            fontSize: '13px',
            fontWeight: '600'
          }
        }).addTo(leafletMap.value);
      }
    });
});

// Cleanup to prevent memory leaks
onUnmounted(() => {
  if (leafletMap.value) {
    leafletMap.value.remove();
    leafletMap.value = null;
  }
});
</script>

<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
}
</style>

```

Start the development server:

```bash
npm run dev
```

⚠️ Vue-Specific Tips

shallowRef vs ref: Never put a Leaflet map instance into a standard ref(). Vue's deep reactivity will attempt to proxy thousands of internal Leaflet properties, leading to massive performance degradation.

Lifecycle Hooks: Always initialize Leaflet in onMounted. The DOM element is not available before this stage.

Memory Management: Always call map.remove() in onUnmounted to ensure all Canvas event listeners and intervals are cleared, especially in Single Page Applications (SPA).

---

## License

MIT
