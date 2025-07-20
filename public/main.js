// public/main.js
const form = document.getElementById('formulario');
const respuestaElem = document.getElementById('respuesta');
const historialElem = document.getElementById('historial');
respuestaElem.style.display = 'none';

form.addEventListener('submit', async e => {
    e.preventDefault();

    respuestaElem.style.display = 'none';

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const city = document.getElementById('city').value.trim();

    try {
        const res = await fetch('/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, city })
        });
        const data = await res.json();

        if (res.ok) {
            respuestaElem.innerText = data.message;
            respuestaElem.style.display = 'block';
            form.reset();
            cargarHistorial();
        } else {
            respuestaElem.innerText = data.error || 'Error inesperado.';
            console.error(data.error);
        }
    } catch {
        respuestaElem.innerText = 'No se pudo conectar al servidor.';
        console.error('Error de conexión:', err);

    }
});

async function cargarHistorial() {
    try {
        const res = await fetch('/users/getAll');
        const registros = await res.json();

        // Ordenar por fecha de creación (descendente)
        registros.sort((a, b) =>
            new Date(b.createDate) - new Date(a.createDate)
        );

        // Limpiar historial previo
        historialElem.innerHTML = '';

        // Mostrar registros
        registros.forEach(r => {
            const li = document.createElement('li');
            li.innerText = `${r.name} — ${r.age} años — ${r.city}`;
            historialElem.appendChild(li);
        });
    } catch {
        historialElem.innerHTML = '<li>Error al cargar registros.</li>';
    }
}

window.addEventListener('DOMContentLoaded', cargarHistorial);
