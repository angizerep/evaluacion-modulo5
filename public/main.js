// public/main.js
const form = document.getElementById('formulario');
const respuestaElem = document.getElementById('respuesta');
const historialElem = document.getElementById('historial');

form.addEventListener('submit', async e => {
    e.preventDefault();

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
            form.reset();
            cargarHistorial();
        } else {
            respuestaElem.innerText = data.error || 'Error inesperado.';
        }
    } catch {
        respuestaElem.innerText = 'No se pudo conectar al servidor.';
    }
});

async function cargarHistorial() {
    try {
        const res = await fetch('/users/getAll');
        const registros = await res.json();
        historialElem.innerHTML = '';
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
