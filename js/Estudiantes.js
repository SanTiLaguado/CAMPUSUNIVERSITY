const cargarFormularioEstudiantes=()=>{
    const EstudiantesForm = document.getElementById('Estudiantes-form');
    EstudiantesForm.innerHTML = `
      <form>
          <label for="nombreEstudiante">Nombre del Estudiante:</label>
          <input type="text" id="nombreEstudiante" required>
          <label for="apellidoEstudiante">Apellido del Estudiante:</label>
          <input type="text" id="apellidoEstudiante" required>
          <label for="nacimientoest">Fecha de Nacimiento:</label>
          <input type="text" id="nacimientoest" required>
          <label for="tipodocumento">Tipo de Documento:</label>
            <select id="tipodocumentoest" required>
                ${cargarrtiposdocs()}
            </select> 
          <label for="numdocumentoest">Numero de documento:</label>
          <input type="number" id="numdocumentoest" required> 
          <label for="ciudadestudiante">Ciudad de Residencia</label>
          <input type="text" id="ciudadestudiante" required>
          <label for="direccionest">Direccion:</label>
          <input type="text" id="direccionest" required>
          <label for="telefonoest">Telefono:</label>
          <input type="number" id="telefonoest" required>
          <button type="button" onclick="crearEstudiante()">Crear Estudiante</button>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>
  `;
  const listadoClientes = document.getElementById('listado-Estudiantes');
  listadoClientes.style.display='none';
}