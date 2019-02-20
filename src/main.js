require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/views/MapView",
  "esri/widgets/Search",
  "axios",
  "beautify",
  "dojo/domReady!"
],
function(Map, SceneView, MapView, Search, axios, beautify) {
  var map = new Map({
    basemap: "hybrid",
    ground: "world-elevation"
  });
  
  var viewOptions = {
    container: "viewDiv",
    map: map
  };

  // 3D:
  var view = new SceneView(viewOptions);
  
  var searchWidget = new Search({
    view: view
  });
  view.ui.add(searchWidget, {
    position: "top-right"
  });
  
  view.ui.add(document.getElementById("cameraDetailsWidget"), {
    position: "bottom-right"
  });
  
  view.when(function() {
    view.watch('camera.heading', updateCamera.bind(this));
    updateCamera();
  }.bind(this));

  document.getElementById("copyCameraJson").addEventListener("click", function() {
    var copyTextarea = document.querySelector('#cameraDetails');
    copyTextarea.focus();
    copyTextarea.select();
    document.execCommand('copy');
  });

  var css = '';
  axios.get('templates/style.css').then(function(fileContents) {
    css = fileContents.data;
  });

  var html = '';
  axios.get('templates/html.html').then(function(fileContents) {
    html = fileContents.data;
  });

  var head = '';
  axios.get('templates/head.html').then(function(fileContents) {
    head = fileContents.data;
  });

  var javaScriptTemplate = '';
  axios.get('templates/js.js').then(function(fileContents) {
    javaScriptTemplate = fileContents.data;
  });

  var updateCamera = function() {
    var code = JSON.stringify(view.camera.toJSON(), null, 2);
    document.getElementById("cameraDetails").value = code;
    createCodepen(code);
  }

  var createCodepen = function(cameraJsCode) {
    var jt = beautify.js_beautify(javaScriptTemplate.replace('[CAMERAHERE]', cameraJsCode), { indent_size: 2, space_in_empty_paren: true });

    var data = {
      editors: "001",
      html: html,
      css: css,
      js: jt,
      head: head,
      js_external: 'https://js.arcgis.com/4.10/dojo/dojo.js',
      css_external: 'https://js.arcgis.com/4.10/esri/css/main.css;https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.0.2/css/calcite-web.min.css',
    };

    var JSONstring = 
      JSON.stringify(data);
        // Quotes will screw up the JSON
        // .replace(/"/g, "&​quot;") // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
        // .replace(/'/g, "&apos;");

    document.getElementById('formDataCodepen').value = JSONstring;
  }
  
});
