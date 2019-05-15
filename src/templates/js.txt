require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/views/MapView",
  "dojo/domReady!"
],
function(Map, SceneView, MapView) {
  var map = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
  });
  
  var viewOptions = {
    container: "viewDiv",
    map: map,
    camera: [CAMERAHERE]
  };

  // 2D:
  // var view = new MapView(viewOptions);

  // 3D:
  var view = new SceneView(viewOptions);
});
