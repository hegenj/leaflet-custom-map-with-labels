import { useEffect, useRef } from 'react';
import { L, mapWithLabels} from '@leaflet-custom/map-with-labels';
import 'leaflet/dist/leaflet.css';
import type { GeoJSONOptions, Layer } from 'leaflet';

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = mapWithLabels(mapRef.current).setView([47.16, 19.50], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance.current);

    fetch('/hu_counties.geojson') // in the public folder
      .then(res => res.json())
      .then(data => {
        const options: GeoJSONOptions = {
          style: { color: '#2c3e50', weight: 1, fillOpacity: 0.1 },
          label: (layer: Layer) => layer?.feature?.properties.name,
          labelPos: 'cc',
          labelStyle: {
            color: '#2980b9',
            fontSize: '14px',
            fontWeight: 'bold',
            textShadow: '1px 1px white'
          }
        };
        if (mapInstance.current) {
          L.geoJson(data, options).addTo(mapInstance.current);
        }
      });

    // Cleanup: React 18 Strict Mode
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

export default App;