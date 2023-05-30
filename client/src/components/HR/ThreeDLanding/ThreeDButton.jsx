import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const Button3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let container;
    let camera, scene, renderer;
    let geometry, material, mesh;

    const init = () => {
      container = containerRef.current;

      // Create a scene
      scene = new THREE.Scene();

      // Create a camera
      camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Create a geometry for the button
      geometry = new THREE.BoxGeometry(1, 0.5, 0.1);

      // Create a material for the button
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      // Create a mesh using the geometry and material
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Create a renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Render the scene
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the button
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    };

    // Call the initialization function when the component mounts
    init();

    // Clean up Three.js resources when the component unmounts
    return () => {
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Link to="/your-link">
        {' '}
        {/* Replace "/your-link" with your desired URL */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Link>
    </div>
  );
};

export default Button3D;
