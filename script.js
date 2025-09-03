// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Luz
const light = new THREE.PointLight(0xff2a6d, 1.5);
light.position.set(50,50,50);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// Parámetros
let letters = [];
const text = "Bianca";
const totalLetters = 600;

// Función para generar posiciones de corazón
function heartPos(t, scale=1) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t),3);
    const y = 13 * Math.cos(t) - 5*Math.cos(2*t) -2*Math.cos(3*t) - Math.cos(4*t);
    const z = (Math.random()-0.5)*2;
    return new THREE.Vector3(x*scale, y*scale, z*scale);
}

// Crear partículas de letras
function createLetters() {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
        const material = new THREE.MeshBasicMaterial({ color: 0xfff1d6, transparent:true, opacity:0.9 });
        for(let i=0;i<totalLetters;i++){
            const char = text[i % text.length];
            const geometry = new THREE.TextGeometry(char, { font: font, size:1, height:0.1 });
            const mesh = new THREE.Mesh(geometry, material);

            // Posición aleatoria inicial
            mesh.position.x = (Math.random()-0.5)*100;
            mesh.position.y = (Math.random()-0.5)*100;
            mesh.position.z = (Math.random()-0.5)*20;

            scene.add(mesh);
            letters.push({mesh:mesh, target:heartPos(i/totalLetters,2)});
        }
    });
}

// Animación de formación del corazón
let progress = 0;
function animate() {
    requestAnimationFrame(animate);
    letters.forEach(l=>{
        l.mesh.position.x += (l.target.x - l.mesh.position.x)*0.02;
        l.mesh.position.y += (l.target.y - l.mesh.position.y)*0.02;
        l.mesh.position.z += (l.target.z - l.mesh.position.z)*0.02;

        // Brillo sutil
        l.mesh.material.opacity = 0.6 + 0.4*Math.sin(Date.now()*0.002);
    });
    renderer.render(scene, camera);
}
createLetters();
animate();

// Ajuste de pantalla
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});