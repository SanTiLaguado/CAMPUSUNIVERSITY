let listaMatriculas=[];

const cargarMatriculas= async()=>{
   
  try{
      listaEstudiantes.length=0;
      const respuesta=await fetch('http://localhost:3000/matriculas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Matriculas. Estado: ',respuesta.status);
      }
      const Matriculas=await respuesta.json();
      listaMatriculas.push(...Matriculas);

  }catch(error){
      console.error("Error al cargar Matriculas",error.message);
  }

  console.log(listaMatriculas)
}


const cargarFormularioMatriculas=()=>{
    const MatriculasForm = document.getElementById('Matriculas-form');
    MatriculasForm.innerHTML = `<h2>Crear Matriculas</h2>
      <form>
          <label for="nombreEstudiante">Nombre del Estudiante:</label>
          <input type="text" id="nombreEstudiante" required>
          <label for="apellidoEstudiante">Apellido del Estudiante:</label>
          <input type="text" id="apellidoEstudiante" required>
          <label for="sexoest">Sexo:</label>
            <select id="sexoest" required>
                ${cargarsexos()}
            </select> 
          <label for="nacimientoest">Fecha de Nacimiento:</label>
          <input type="text" id="nacimientoest" required>
          <label for="search-input-docs">Tipo de Documento:</label>
            <select id="tipodocumentoest" required>
                ${cargartiposdocs()}
            </select> 
          <label for="numdocumentoest">Numero de documento:</label>
          <input type="number" id="numdocumentoest" required> 
          <label for="ciudadestudiante">Ciudad de Residencia</label>
          <input type="text" id="ciudadestudiante" required>
          <label for="direccionest">Direccion:</label>
          <input type="text" id="direccionest" required>
          <label for="telefonoest">Telefono:</label>
          <input type="number" id="telefonoest" required>
          <label for="programaest">Programa:</label>
          <div class="search-container.prog">
            <input type="text" id="search-input-docs" placeholder="Buscar Programas...">
            <ul id="search-results-docs"></ul>
          </div>
          <button type="button" onclick="crearEstudiante()">Crear Estudiante</button>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>
  `;}