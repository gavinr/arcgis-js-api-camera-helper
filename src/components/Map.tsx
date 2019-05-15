import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

interface MapProps {
  onCameraChange: (args: object) => void;
}

export default function Map({ onCameraChange }: MapProps) {
  let mapEl = useRef<HTMLElement>(null);
  // const [view, setView] = useState(null);

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/SceneView", "esri/widgets/Search"], {
      css: true
    }).then(([Map, SceneView, Search]) => {
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
        // setView(view);
        var searchWidget = new Search({
          view: view
        });
        view.ui.add(searchWidget, {
          position: "top-right"
        });

        view.watch("camera", onCameraChange);
        onCameraChange(view.camera); // call once!
      });
    });

    return () => {
      // mapEl = null;
    };
  }, []); // eslint-disable-line

  // https://github.com/react-bootstrap/react-bootstrap/issues/3568#issuecomment-487276679
  return <div className="map" ref={mapEl as React.RefObject<any>} />;
}
