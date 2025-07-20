document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const respuesta = await fetch('/datos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });
    const datos = await respuesta.json();
    document.getElementById('respuesta').innerText =
        datos.mensaje;
});