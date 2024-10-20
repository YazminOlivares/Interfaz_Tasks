const contenedor = document.getElementById('tareas');

const boton = document.getElementById('agregar');
boton.addEventListener('click', agregar);

let contador = 1;

function agregar(){
    const agregarTarea = document.createElement('div');
    agregarTarea.setAttribute('class','tarea');

    const escribir = document.createElement('input');
    escribir.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const texto = escribir.value;
            const tituloTarea = document.createElement('h3');
            tituloTarea.addEventListener('dblclick', function(e){
                const texto2 = tituloTarea.innerText;
                escribir.innerText = texto2;
                boton1.innerText = '✔';
                agregarTarea.replaceChild(escribir, tituloTarea);
            })

            tituloTarea.innerText = texto;
            agregarTarea.replaceChild(tituloTarea, escribir);
        }
    });

    const boton1 = document.createElement('button');
    boton1.setAttribute('class', 'botoncito');
    boton1.setAttribute('id', 'marcar');
    boton1.innerText = '✔';
    boton1.addEventListener('click', function() {
        const tar = agregarTarea.querySelector('h3');
        if (tar) {
            if (tar.style.textDecoration === 'line-through') {
                tar.style.textDecoration = '';
                tar.style.color = '';
                boton1.innerText = '✔';
            } else {
                tar.style.textDecoration = 'line-through';
                tar.style.color = 'gray';
                boton1.innerText = '↺';
            }
        }
    });

    const boton2 = document.createElement('button');
    boton2.setAttribute('class', 'botoncito');
    boton2.setAttribute('id', 'editar');
    boton2.innerText = '✎';
    boton2.addEventListener('click', function() {
        const editar = agregarTarea.querySelector('h3');
        if (editar) {
            const texto = editar.innerText;
            const inputEditar = document.createElement('input');
            inputEditar.value = texto;
            inputEditar.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const nuevoTexto = inputEditar.value;
                    const nuevoEditar = document.createElement('h3');
                    boton1.innerText = '✔';
                    nuevoEditar.innerText = nuevoTexto;
                    agregarTarea.replaceChild(nuevoEditar, inputEditar);
                }
            });
            agregarTarea.replaceChild(inputEditar, editar);
        }
    });

    const boton3 = document.createElement('button');
    boton3.setAttribute('class', 'botoncito');
    boton3.setAttribute('id', 'eliminar');
    boton3.innerText = '✘';
    boton3.addEventListener('click', function() {
        agregarTarea.remove();
    });

    const botones = document.createElement('div');
    botones.setAttribute('class', 'botones');

    botones.append(boton1);
    botones.append(boton2);
    botones.append(boton3);

    agregarTarea.append(escribir);
    agregarTarea.append(botones);

    agregarTarea.setAttribute('id', `Id${contador}`);
    contenedor.append(agregarTarea);
    contador++;
}
