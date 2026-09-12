const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 18);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
dirLight1.position.set(5, 10, 7);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffeedd, 0.5);
dirLight2.position.set(-5, 0, -5);
scene.add(dirLight2);

const pointLight = new THREE.PointLight(0x4466ff, 0.3, 30);
pointLight.position.set(2, 5, 5);
scene.add(pointLight);

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0xff4d4d, roughness: 0.3, metalness: 0.1 })
);
box.position.set(-5, 0.5, 0);
scene.add(box);

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 2.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x4dffff, roughness: 0.4, metalness: 0.2 })
);
cone.position.set(5, 0.5, 0);
scene.add(cone);

const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 2.2, 32),
    new THREE.MeshStandardMaterial({ color: 0x66dd88, roughness: 0.3, metalness: 0.3 })
);
cylinder.position.set(0, 0.2, -4);
scene.add(cylinder);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffaa33, roughness: 0.2, metalness: 0.6 })
);
sphere.position.set(-2.5, 0.5, 4);
scene.add(sphere);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.4, 20, 40),
    new THREE.MeshStandardMaterial({ color: 0xaa66ff, roughness: 0.3, metalness: 0.4 })
);
torus.position.set(2.5, 2.5, -1);
scene.add(torus);

function animate() {
    const elapsedTime = performance.now() / 1000;

    box.rotation.y += 0.01;
    box.rotation.x += 0.005;

    cone.rotation.y += 0.015;
    cone.position.y = 0.8 + Math.sin(elapsedTime * 2) * 0.8;

    cylinder.rotation.x += 0.008;
    cylinder.rotation.z += 0.008;
    const scale = 1 + Math.sin(elapsedTime * 3) * 0.05;
    cylinder.scale.set(scale, 1, scale);

    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.007;
    sphere.position.y = 0.8 + Math.abs(Math.sin(elapsedTime * 2.5)) * 1.0;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.012;
    torus.rotation.z += 0.008;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});