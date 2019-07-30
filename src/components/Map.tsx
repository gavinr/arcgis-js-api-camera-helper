import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import Camera from "esri/Camera";

interface MapProps {
  onCameraChange: (args: object) => void;
}



export default function Map({ onCameraChange }: MapProps) {
  let mapEl = useRef<HTMLElement>(null);
  // const [view, setView] = useState(null);

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/SceneView", "esri/widgets/Search", "esri/geometry/support/webMercatorUtils"], {
      css: true
    }).then(([Map, SceneView, Search, webMercatorUtils]) => {

      function cameraToWgs84(camera: Camera): Camera {
        const cameraClone = camera.clone();
        const wgs84Position = webMercatorUtils.webMercatorToGeographic(camera.position);
        cameraClone.position = wgs84Position;
        return cameraClone;
      }

      if (!mapEl) {
        // component or app was likely destroyed
        return;
      }
      // create the Map
      const webmap = new Map({
        basemap: "hybrid",
        ground: "world-elevation"
      });
      // show the map at the element
      let view = new SceneView({
        map: webmap,
        container: mapEl.current
      });

      view.when(() => {
        var searchWidget = new Search({
          view: view
        });
        view.ui.add(searchWidget, {
          position: "top-right"
        });

        view.watch("camera", (camera: Camera) => {
          onCameraChange(cameraToWgs84(camera));
        });
        onCameraChange(cameraToWgs84(view.camera)); // call once!
      });
    });

    return () => {
      // mapEl = null;
    };
  }, []); // eslint-disable-line

  // https://github.com/react-bootstrap/react-bootstrap/issues/3568#issuecomment-487276679
  return <div className="map" ref={mapEl as React.RefObject<any>} />;
}
