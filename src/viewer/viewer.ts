// @ts-nocheck

//------------------------------------------------------------------------------------------------------------------
// Import the modules we need for this example
//------------------------------------------------------------------------------------------------------------------

import { Viewer, WebIFCLoaderPlugin } from 'https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk@2.6.67/+esm';
import * as WebIFC from 'https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/web-ifc-api.js';
import { useTableStore } from '../state/tableStore';

//------------------------------------------------------------------------------------------------------------------
// 1. Create a Viewer,
// 2. Arrange the camera,
// 3. Tweak the xray material
//------------------------------------------------------------------------------------------------------------------

export const initScene = () => {
  // 1
  const viewer = new Viewer({
    canvasId: 'myCanvas',
    transparent: true,
  });

  // 2
  // viewer.camera.eye = [-3.933, 2.855, 27.018];
  // viewer.camera.look = [4.4, 3.724, 8.899];
  // viewer.camera.up = [-0.018, 0.999, 0.039];

  viewer.camera.eye = [30.1, 20, -7.7];
  viewer.camera.look = [30.1, 0.0, -7.7];
  viewer.camera.up = [0, 0, -1];

  // 3
  viewer.scene.xrayMaterial.fillColor = [0.8, 0.1, 0.9];
  viewer.scene.xrayMaterial.edgeColor = [0.0, 0.0, 0.0];
  viewer.scene.xrayMaterial.fillAlpha = 0.05;
  viewer.scene.xrayMaterial.edgeAlpha = 0.3;

  useTableStore.setState(() => ({ viewer }));

  //------------------------------------------------------------------------------------------------------------------
  // 1. Create an XKT loader plugin,
  // 2. Load a XKT model
  //------------------------------------------------------------------------------------------------------------------

  // 1
  const IfcAPI = new WebIFC.IfcAPI();

  IfcAPI.SetWasmPath('https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/');

  IfcAPI.Init().then(() => {
    const ifcLoader = new WebIFCLoaderPlugin(viewer, {
      WebIFC,
      IfcAPI,
    });

    // 2
    const sceneModel = ifcLoader.load({
      // Creates a Node representing the model
      id: 'myModel',
      src: 'https://raw.githubusercontent.com/drashevski/aec-flow/refs/heads/main/aec_ifc.ifc',
      excludeTypes: ['IfcSpace'],
      edges: true,
    });

    const t0 = performance.now();

    document.getElementById('time').innerHTML = 'Loading model...';

    sceneModel.on('loaded', () => {
      viewer.cameraFlight.jumpTo(sceneModel);
    });

    sceneModel.on('loaded', function () {
      const t1 = performance.now();
      document.getElementById('time').innerHTML = 'Model loaded in ' + Math.floor(t1 - t0) / 1000.0 + ' seconds<br>Objects: ' + sceneModel.numEntities;

      //--------------------------------------------------------------------------------------------------------------
      // 1. Find metadata on the bottom storey
      // 2. X-ray all the objects except for the bottom storey
      // 3. Fit the bottom storey in view
      //--------------------------------------------------------------------------------------------------------------

      // 1
      const metaModel = viewer.metaScene.metaModels['myModel']; // MetaModel with ID "myModel"

      debugger;
      const metaObject = viewer.metaScene.metaObjects['1xS3BCk291UvhgP2dvNsgp']; // MetaObject with ID "1xS3BCk291UvhgP2dvNsgp"

      const name = metaObject.name; // "01 eerste verdieping"
      const type = metaObject.type; // "IfcBuildingStorey"
      const parent = metaObject.parent; // MetaObject with type "IfcBuilding"
      const children = metaObject.children; // Array of child MetaObjects
      const objectId = metaObject.id; // "1xS3BCk291UvhgP2dvNsgp"
      const objectIds = viewer.metaScene.getObjectIDsInSubtree(objectId); // IDs of leaf sub-objects
      const aabb = viewer.scene.getAABB(objectIds); // Axis-aligned boundary of the leaf sub-objects

      // 2
      viewer.scene.setObjectsXRayed(viewer.scene.objectIds, true);
      viewer.scene.setObjectsXRayed(objectIds, false);

      Object.values(viewer.scene.objects).forEach((o) => ((o as any).colorize = [0.8, 0.1, 0.9]));

      // 3
      viewer.cameraFlight.flyTo(aabb);

      viewer.scene.input.on('mousedown', function (coords: any) {
        var pickResult = viewer.scene.pick({
          canvasPos: coords,
        });

        console.log(pickResult);

        if (pickResult) {
          console.log(pickResult.entity.id);
          pickResult.entity.colorize = [1.0, 0.0, 0.0];
        }
      });
    });
  });
};
