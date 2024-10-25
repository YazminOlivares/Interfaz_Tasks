const contenedor = document.getElementById('tareas'); // Selecciona el contenedor donde se agregarán las tareas
const boton = document.getElementById('agregar'); // Selecciona el botón de agregar tarea
boton.addEventListener('click', agregar); // Añade un evento al botón para ejecutar la función agregar() cuando se hace clic

let contador = 1; // Inicializa un contador para asignar un id único a cada tarea
obtener();

function agregar() {
    const info = document.createElement('div'); //Crea un nuevo div para la información
    info.setAttribute('class', 'info'); //Asigna la clase 'info' al div 

    const agregarTarea = document.createElement('div'); // Crea un nuevo div para la tarea
    agregarTarea.setAttribute('class', 'tarea'); // Asigna la clase 'tarea' al div

    const palh3 = document.createElement('div'); // Crea un nuevo div para contener el h3 o el input
    palh3.setAttribute('class', 'palh3'); // Asigna la clase 'palh3' al div

    const desplegar = document.createElement('i'); // Crea el icono/botón desplegar
    desplegar.setAttribute('class', 'fa-solid fa-chevron-down'); //Asigna el icono de FontAwesome
    desplegar.setAttribute('id', 'drop'); // Asigna id 'drop' al botón
    desplegar.style.display = 'none'; //Pa que no se ponga

    const escribir = document.createElement('input'); // Crea un campo de texto para que el usuario escriba la tarea

    escribir.addEventListener('keydown', function(event) { // Añade un evento para detectar cuando el usuario presiona una tecla
        if (event.key === 'Enter') { // Verifica si la tecla presionada es 'Enter'
            
            const texto = escribir.value; // Obtiene el valor del campo de texto (la tarea escrita)

            const tituloTarea = document.createElement('h3'); // Crea un elemento h3 para mostrar el título de la tarea

            const pInvisible = document.createElement('p'); //Crea una etiqueta P
            pInvisible.hidden = true;
            pInvisible.innerText = 'Aqui se pone el id de la tarea.'; //Esta tendría como valor el ID de la tarea generado por la API

            tituloTarea.addEventListener('dblclick', function(e) { // Añade un evento al h3 para que al hacer doble clic permita editar la tarea
                const texto2 = tituloTarea.innerText; // Obtiene el texto del h3 actual
                escribir.value = texto2; // Copia el texto actual en el campo de entrada para permitir su edición
                boton1.innerText = '✔'; // Cambia el texto del botón a '✔' para indicar que la tarea no está marcada
                desplegar.style.display = 'none'; // Oculta el botón de desplegar al editar
                palh3.replaceChild(escribir, tituloTarea); // Reemplaza el h3 por el campo de texto para editar la tarea
            });

            tituloTarea.innerText = texto; // Asigna el texto del campo de entrada al h3
            desplegar.style.display = 'inline'; // Muestra de nuevo el botón desplegar al finalizar la edición
            palh3.replaceChild(tituloTarea, escribir); // Reemplaza el campo de entrada con el h3 (mostrar tarea)
        }
    });

    const boton1 = document.createElement('button'); // Crea el primer botón (para marcar como completada)
    boton1.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton1.setAttribute('id', 'marcar'); // Asigna el id 'marcar' al botón
    boton1.innerText = '✔'; // Establece el texto del botón a '✔'

    boton1.addEventListener('click', function() { // Añade un evento al botón para marcar o desmarcar la tarea
        const tar = palh3.querySelector('h3'); // Selecciona el h3 dentro del div 'palh3'
        if (tar) { // Si existe el h3
            if (tar.style.textDecoration === 'line-through') { // Si el texto tiene un tachado (marcado como completado)
                tar.style.textDecoration = ''; // Elimina el tachado
                tar.style.color = ''; // Restablece el color del texto
                boton1.innerText = '✔'; // Cambia el texto del botón a '✔'

            } else { // Si no está marcado como completado
                tar.style.textDecoration = 'line-through'; // Tacha el texto (marcar como completado)
                tar.style.color = 'gray'; // Cambia el color del texto a gris
                boton1.innerText = '↺'; // Cambia el texto del botón a '↺' (desmarcar)
            }
        }
    });

    const boton2 = document.createElement('button'); // Crea el segundo botón (para editar la tarea)
    boton2.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton2.setAttribute('id', 'editar'); // Asigna el id 'editar' al botón
    boton2.innerText = '✎'; // Establece el texto del botón a '✎' (editar)

    boton2.addEventListener('click', function() { // Añade un evento al botón para editar la tarea
        const editar = palh3.querySelector('h3'); // Selecciona el h3 dentro del div 'palh3'

        if (editar) { // Si existe el h3
            const texto = editar.innerText; // Obtiene el texto actual del h3
            const inputEditar = document.createElement('input'); // Crea un nuevo campo de texto para editar la tarea
            inputEditar.value = texto; // Establece el valor del campo de texto con el texto actual

            inputEditar.addEventListener('keydown', function(event) { // Añade un evento para detectar cuando se presiona una tecla
                if (event.key === 'Enter') { // Verifica si la tecla presionada es 'Enter'
                    const nuevoTexto = inputEditar.value; // Obtiene el valor del campo de texto editado
                    const nuevoEditar = document.createElement('h3'); // Crea un nuevo h3 para mostrar el texto editado
                    nuevoEditar.innerText = nuevoTexto; // Establece el nuevo texto en el h3

                    boton1.innerText = '✔'; // Cambia el texto del botón a '✔'
                    desplegar.style.display = 'inline'; // Muestra el botón desplegar nuevamente
                    palh3.replaceChild(nuevoEditar, inputEditar); // Reemplaza el campo de texto con el nuevo h3
                }
            });
            desplegar.style.display = 'none'; // Oculta el botón desplegar mientras se edita
            palh3.replaceChild(inputEditar, editar); // Reemplaza el h3 con el campo de texto para editar la tarea
        }
    });

    const boton3 = document.createElement('button'); // Crea el tercer botón (para eliminar la tarea)
    boton3.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton3.setAttribute('id', 'eliminar'); // Asigna el id 'eliminar' al botón
    boton3.innerText = '✘'; // Establece el texto del botón a '✘' (eliminar)
    boton3.addEventListener('click', function() { // Añade un evento al botón para eliminar la tarea
        agregarTarea.remove(); // Elimina el div de la tarea del DOM
    });

    const botones = document.createElement('div'); // Crea un div para agrupar los botones de la tarea
    botones.setAttribute('class', 'botones'); // Asigna la clase 'botones' al div

    botones.append(boton1); // Añade el botón de marcar al div de botones
    botones.append(boton2); // Añade el botón de editar al div de botones
    botones.append(boton3); // Añade el botón de eliminar al div de botones

    const detalles = document.createElement('div'); //lksndflkn
    detalles.setAttribute('class', 'detalles');

    /* Ejemplo de como meter los datos en los detalles */
    /* const detalle1 = document.createElement('p');
    detalle1.innerText = 'Detalle1';
    detalles.append(detalle1);
    const detalle2 = document.createElement('p');
    detalle2.innerText = 'Detalle2';
    detalles.append(detalle2); */

    desplegar.addEventListener('click', ()=>{
        let id = agregarTarea.getAttribute('id')
        toggleVisibility(detalles, desplegar);
        console.log(id);
    });

    const toggleVisibility = (detalles, desplegar) => {
        if (detalles.classList.contains("show")) {
            detalles.classList.remove("show");
            desplegar.setAttribute('class', 'fa-solid fa-chevron-down');
        } else {
            detalles.classList.add("show");
            desplegar.setAttribute('class', 'fa-solid fa-chevron-up');
        }
    }; 

    palh3.append(desplegar); // Añade el botón desplegar
    palh3.append(escribir); // Añade el campo de texto para escribir la tarea al div 'palh3'

    agregarTarea.append(palh3); // Añade el div 'palh3' al div de la tarea
    agregarTarea.append(botones); // Añade el div con los botones al div de la tarea

    agregarTarea.setAttribute('id', `Id${contador}`); // Asigna un id único a la tarea, basado en el contador
    info.append(agregarTarea);
    info.append(detalles);
    contenedor.append(info); // Añade la tarea al contenedor de tareas en el DOM
    contador++; // Incrementa el contador para el próximo id de tarea
}

async function obtener() {
    try {
        const response = await fetch('http://localhost:3000/tasks');

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        console.log(data.length)

        data.map((tarea) => {
            llenar(tarea);
        });

    } catch (error) {
        
        console.error('Error:', error);
    }
}

function llenar(tarea) {
    
    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const agregarTarea = document.createElement('div'); 
    agregarTarea.setAttribute('class', 'tarea');

    const palh3 = document.createElement('div'); 
    palh3.setAttribute('class', 'palh3');

    const desplegar = document.createElement('i'); 
    desplegar.setAttribute('class', 'fa-solid fa-chevron-down'); 
    desplegar.setAttribute('id', 'drop'); 

    const escribir = document.createElement('h3'); // Crea un campo de texto para que el usuario escriba la tarea
    escribir.innerText = tarea.title;

    escribir.addEventListener('dblclick', function(e) { // Añade un evento al h3 para que al hacer doble clic permita editar la tarea
        console.log("entra");
        const texto2 = escribir.innerText; // Obtiene el texto del h3 actual
        const escribir2 = document.createElement('input');
        escribir2.value = texto2; // Copia el texto actual en el campo de entrada para permitir su edición
        boton1.innerText = '✔'; // Cambia el texto del botón a '✔' para indicar que la tarea no está marcada
        desplegar.style.display = 'none'; // Oculta el botón de desplegar al editar
        palh3.replaceChild(escribir2, escribir); // Reemplaza el h3 por el campo de texto para editar la tarea

        escribir2.addEventListener('keydown', function(event) { // Añade un evento para detectar cuando el usuario presiona una tecla
            if (event.key === 'Enter') { // Verifica si la tecla presionada es 'Enter'
                
                const texto = escribir2.value; // Obtiene el valor del campo de texto (la tarea escrita)
    
                
    
                const pInvisible = document.createElement('p'); //Crea una etiqueta P
                pInvisible.hidden = true;
                pInvisible.innerText = 'Aqui se pone el id de la tarea.'; //Esta tendría como valor el ID de la tarea generado por la API
    
                escribir.addEventListener('dblclick', function(e) { // Añade un evento al h3 para que al hacer doble clic permita editar la tarea
                    const texto2 = escribir.innerText; // Obtiene el texto del h3 actual
                    escribir2.value = texto2; // Copia el texto actual en el campo de entrada para permitir su edición
                    boton1.innerText = '✔'; // Cambia el texto del botón a '✔' para indicar que la tarea no está marcada
                    desplegar.style.display = 'none'; // Oculta el botón de desplegar al editar
                    palh3.replaceChild(escribir2, escribir); // Reemplaza el h3 por el campo de texto para editar la tarea
                });
    
                escribir.innerText = texto; // Asigna el texto del campo de entrada al h3
                desplegar.style.display = 'inline'; // Muestra de nuevo el botón desplegar al finalizar la edición
                palh3.replaceChild(escribir, escribir2); // Reemplaza el campo de entrada con el h3 (mostrar tarea)
    
            }
        });
    });

    const boton1 = document.createElement('button'); // Crea el primer botón (para marcar como completada)
    boton1.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton1.setAttribute('id', 'marcar'); // Asigna el id 'marcar' al botón
    boton1.innerText = '✔'; // Establece el texto del botón a '✔'

    boton1.addEventListener('click', function() { // Añade un evento al botón para marcar o desmarcar la tarea
        const tar = palh3.querySelector('h3'); // Selecciona el h3 dentro del div 'palh3'
        if (tar) { // Si existe el h3
            if (tar.style.textDecoration === 'line-through') { // Si el texto tiene un tachado (marcado como completado)
                tar.style.textDecoration = ''; // Elimina el tachado
                tar.style.color = ''; // Restablece el color del texto
                boton1.innerText = '✔'; // Cambia el texto del botón a '✔'

            } else { // Si no está marcado como completado
                tar.style.textDecoration = 'line-through'; // Tacha el texto (marcar como completado)
                tar.style.color = 'gray'; // Cambia el color del texto a gris
                boton1.innerText = '↺'; // Cambia el texto del botón a '↺' (desmarcar)
            }
        }
    });

    const boton2 = document.createElement('button'); // Crea el segundo botón (para editar la tarea)
    boton2.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton2.setAttribute('id', 'editar'); // Asigna el id 'editar' al botón
    boton2.innerText = '✎'; // Establece el texto del botón a '✎' (editar)

    boton2.addEventListener('click', function() { // Añade un evento al botón para editar la tarea
        const editar = palh3.querySelector('h3'); // Selecciona el h3 dentro del div 'palh3'

        if (editar) { // Si existe el h3
            const texto = editar.innerText; // Obtiene el texto actual del h3
            const inputEditar = document.createElement('input'); // Crea un nuevo campo de texto para editar la tarea
            inputEditar.value = texto; // Establece el valor del campo de texto con el texto actual

            inputEditar.addEventListener('keydown', function(event) { // Añade un evento para detectar cuando se presiona una tecla
                if (event.key === 'Enter') { // Verifica si la tecla presionada es 'Enter'
                    const nuevoTexto = inputEditar.value; // Obtiene el valor del campo de texto editado
                    const nuevoEditar = document.createElement('h3'); // Crea un nuevo h3 para mostrar el texto editado
                    nuevoEditar.innerText = nuevoTexto; // Establece el nuevo texto en el h3

                    boton1.innerText = '✔'; // Cambia el texto del botón a '✔'
                    desplegar.style.display = 'inline'; // Muestra el botón desplegar nuevamente
                    palh3.replaceChild(nuevoEditar, inputEditar); // Reemplaza el campo de texto con el nuevo h3
                }
            });
            desplegar.style.display = 'none'; // Oculta el botón desplegar mientras se edita
            palh3.replaceChild(inputEditar, editar); // Reemplaza el h3 con el campo de texto para editar la tarea
        }
    });

    const boton3 = document.createElement('button'); // Crea el tercer botón (para eliminar la tarea)
    boton3.setAttribute('class', 'botoncito'); // Asigna la clase 'botoncito' al botón
    boton3.setAttribute('id', 'eliminar'); // Asigna el id 'eliminar' al botón
    boton3.innerText = '✘'; // Establece el texto del botón a '✘' (eliminar)
    boton3.addEventListener('click', function() { // Añade un evento al botón para eliminar la tarea
        agregarTarea.remove(); // Elimina el div de la tarea del DOM
    });

    const botones = document.createElement('div'); // Crea un div para agrupar los botones de la tarea
    botones.setAttribute('class', 'botones'); // Asigna la clase 'botones' al div

    botones.append(boton1); // Añade el botón de marcar al div de botones
    botones.append(boton2); // Añade el botón de editar al div de botones
    botones.append(boton3); // Añade el botón de eliminar al div de botones

    const detalles = document.createElement('div'); //lksndflkn
    detalles.setAttribute('class', 'detalles');

    const detalle1 = document.createElement('p');
    detalle1.innerText = tarea.description;
    detalles.append(detalle1);
    /*const detalle2 = document.createElement('p');
    detalle2.innerText = 'Detalle2';
    detalles.append(detalle2); */

    desplegar.addEventListener('click', ()=>{
        let id = agregarTarea.getAttribute('id')
        toggleVisibility(detalles, desplegar);
        console.log(id);
    });

    const toggleVisibility = (detalles, desplegar) => {
        if (detalles.classList.contains("show")) {
            detalles.classList.remove("show");
            desplegar.setAttribute('class', 'fa-solid fa-chevron-down');
        } else {
            detalles.classList.add("show");
            desplegar.setAttribute('class', 'fa-solid fa-chevron-up');
        }
    }; 

    palh3.append(desplegar); // Añade el botón desplegar
    palh3.append(escribir); // Añade el campo de texto para escribir la tarea al div 'palh3'

    agregarTarea.append(palh3); // Añade el div 'palh3' al div de la tarea
    agregarTarea.append(botones); // Añade el div con los botones al div de la tarea

    agregarTarea.setAttribute('id', `Id${contador}`); // Asigna un id único a la tarea, basado en el contador
    info.append(agregarTarea);
    info.append(detalles);
    contenedor.append(info); // Añade la tarea al contenedor de tareas en el DOM
    contador++; // Incrementa el contador para el próximo id de tarea
}
