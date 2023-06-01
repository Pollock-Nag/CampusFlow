import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
function GlobeComponent() {
  const globeEl = useRef();

  useEffect(() => {
    const globe = globeEl.current;
    globe.pointOfView({ lat: 23.7798373, lng: 90.383987 });

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 4;

    globe.controls().minDistance = 350; // Minimum zoom level
    globe.controls().maxDistance = 350; // Maximum zoom level

    // Add clouds sphere
    const CLOUDS_IMG_URL = './clouds.png'; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
  }, []);

  const gData = [
    {
      markerSvg: `<img src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg" class="custom-logo astra-logo-svg" alt="Codeworks" decoding="async" data-opt-lazy-loaded="false"></img>`,
      lat: 52.5075139,
      lng: 13.3778993,
      size: 130,
      color: 'white',
    },
    {
      markerSvg: `<img src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg" class="custom-logo astra-logo-svg" alt="Codeworks" decoding="async" data-opt-lazy-loaded="false"></img>`,
      lat: 51.4949737,
      lng: -0.1274353,
      size: 130,
      color: 'orange',
    },
    {
      markerSvg: `<img src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg" class="custom-logo astra-logo-svg" alt="Codeworks" decoding="async" data-opt-lazy-loaded="false"></img>`,
      lat: 41.3949662,
      lng: 2.1977755,
      size: 130,
      color: 'blue',
    },
    {
      markerSvg: `<img src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg" class="custom-logo astra-logo-svg" alt="Codeworks" decoding="async" data-opt-lazy-loaded="false"></img>`,
      lat: 38.464874,
      lng: -100.967433,
      size: 130,
      color: 'blue',
    },
    {
      markerSvg: `<img src="https://images.squarespace-cdn.com/content/v1/62f276db23ed6539a9115860/53b9e0da-2e26-4ee1-a454-0b5e8d465eaf/PROJECT+CODE.png" class="custom-logo astra-logo-svg" alt="Codeworks" decoding="async" data-opt-lazy-loaded="false"></img>`,
      lat: 23.7798373,
      lng: 90.383987,
      size: 150,
      color: 'purple',
    },
  ];

  return (
    // <div className="bg-purple-900 h-screen w-">
    <Globe
      // pointerEventsFilter={'none'}
      ref={globeEl}
      width={800}
      animateIn={true}
      backgroundColor="#ffffff00"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Use a different Earth texture image without zoom-out effect
      htmlElementsData={gData}
      htmlElement={(d) => {
        const el = document.createElement('div');
        el.innerHTML = d.markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        el.onclick = () => console.info(d);
        return el;
      }}
    />
    // </div>
  );
}

export default GlobeComponent;
