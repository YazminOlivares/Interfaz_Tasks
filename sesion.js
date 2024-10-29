const IniciarSesion = document.getElementById('iniciarSesion');

const usuarios = ['admin', 'usuario1', 'usuario2'];
const contras = ['admin', 'contra1', 'contra2'];

IniciarSesion.addEventListener('click', () => {
    const tUsuario = document.getElementById('Usuario').value;
    const tContra = document.getElementById('Contra').value;

    let iniciar = false;

    usuarios.forEach((usuario, index) => {
        if (usuario === tUsuario && contras[index] === tContra) {
            console.log('Autenticación exitosa');
            iniciar = true;
            return;
        }
    });

    if (iniciar) {
        localStorage.setItem('usuario', tUsuario); // Cambiar 'sesionIniciada' a 'usuario'
        window.location.href = "index.html"; 
    } else {
        alert('Usuario o contraseña incorrectos');
    }    
});
