import 'aframe';
import 'types-aframe-react';

const AframeScene = () => {
  return (
    <a-scene
      vr-mode-ui="enabled: true"
      shadow="type: pcfsoft"
      renderer="antialias: false"
      embedded="true"
    >
      <a-light type="ambient"></a-light>
      <a-light type="directional" position="10 10 10"></a-light>

      {/* https://stackoverflow.com/questions/70281029/corepropertytypeswarn-bot-asset-not-found-aframe-master-js
      <a-assets>
        <a-asset-item id="soda-can" src="/soda-can.gltf"></a-asset-item>
      </a-assets> */}
      <a-entity
        gltf-model="url(soda-can.gltf)"
        position="0 0.1 0"
        rotation="-90 0 0"
        scale="0.01 0.01 0.01"
      ></a-entity>
    </a-scene>
  );
};

export default function Aframe() {
  return (
    <div>
      <h1>Welcome to My A-Frame React App</h1>
      <AframeScene />
    </div>
  );
}
