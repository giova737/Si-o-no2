// Letras "B" cayendo
const fallingLetters = [];
function createFallingLetter() {
    const span = document.createElement('div');
    span.classList.add('floating-heart');
    span.innerText = 'B';
    span.style.left = Math.random()*window.innerWidth+'px';
    span.style.top = '-20px';
    span.style.color = Math.random()<0.5?'#555':'#000';
    span.style.opacity = Math.random()*0.6+0.3;
    document.body.appendChild(span);
    fallingLetters.push(span);
}
setInterval(createFallingLetter, 100);

// Animación de caída
function animateFallingLetters() {
    fallingLetters.forEach((l,i)=>{
        l.style.top = (parseFloat(l.style.top)+Math.random()*2+1)+'px';
        l.style.left = (parseFloat(l.style.left)+Math.sin(Date.now()*0.001+i)*0.5)+'px';
        if(parseFloat(l.style.top)>window.innerHeight) {
            l.remove();
            fallingLetters.splice(i,1);
        }
    });
    requestAnimationFrame(animateFallingLetters);
}
animateFallingLetters();

// Crear estrellas de fondo
for(let i=0;i<200;i++){
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random()*window.innerWidth+'px';
    star.style.top = Math.random()*window.innerHeight+'px';
    star.style.width = star.style.height = Math.random()*2+1+'px';
    document.body.appendChild(star);
}