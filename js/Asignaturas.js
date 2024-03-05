let listaAsignaturas=[];
let listaCursos=[];

const cargarAsignaturas= async()=>{
   
  try{
      listaAsignaturas.length=0;
      const respuesta=await fetch('http://localhost:3000/asignaturas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Asignaturas. Estado: ',respuesta.status);
      }
      const Asignaturas=await respuesta.json();
      listaAsignaturas.push(...Asignaturas);

  }catch(error){
      console.error("Error al cargar Asignaturas",error.message);
  }

  console.log(listaAsignaturas)
}

const cargarCursos= async()=>{

    try{
        listaCursos.length=0;
        const respuesta=await fetch('http://localhost:3000/cursos');
  
        if(!respuesta.ok){
           throw new Error('Error al cargar Cursos. Estado: ',respuesta.status);
        }
        const Cursos=await respuesta.json();
        listaCursos.push(...Cursos);
  
    }catch(error){
        console.error("Error al cargar Cursos",error.message);
    }
  
    console.log(listaCursos)
}

const cargarFormularioAsignaturas=()=>{
    const AsignaturasForm = document.getElementById('Asignaturas-form');
    AsignaturasForm.innerHTML = `<h2>Crear Asignaturas</h2>
      <form>
          <label for="CursoAsignatura">Seleccione el Curso:</label>
          <div class="search-container.cursoasign">
            <input type="text" id="search-input-cursoasign" placeholder="Buscar Cursos...">
            <ul id="search-results-cursoasign"></ul>
          </div>
          <label for="codigoASIGN">Codigo de Asignatura:</label>
          <input type="text" id="codigoASIGN" required>
          <label for="cantcreditosasign">Ingrese cantidad de Creditos:</label>
          <input type="number" id="cantcreditosasign" required>
          <label for="DocenteAsign">Seleccione Al Docente Encargado:</label>
          <div class="search-container.DocenteAsign">
            <input type="text" id="search-input-cursoasign" placeholder="Buscar Docentes...">
            <ul id="search-results-DocenteAsign"></ul>
          </div>
          <label for="cuposAsign">Max de Cupos Disponibles:</label>
          <input type="number" id="cuposAsign" required> 
          <label for="ProgramaAsign">Seleccione un Programa:</label>
          <div class="search-container.ProgramaAsign">
            <input type="text" id="search-input-ProgramaAsign" placeholder="Buscar Programas...">
            <ul id="search-results-ProgramaAsign"></ul>
          </div>
          <button type="button" onclick="crearAsignatura()">Crear Docente</button>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>
  `;

  const searchInputcursoasign = document.getElementById('search-input-cursoasign"');
  const searchResultscursoasign = document.getElementById('search-results-cursoasign');
  
  function displayResultsDPTODOC(results) {
    searchResultscursoasign.innerHTML = '';
  
    if (results.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No se encontraron Cursos';
      searchInputcursoasign.appendChild(li);
      return;
    }
  
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = result.nombre;
      li.addEventListener('click', function() {
        searchInputdptodocnt.value = result.nombre;
        searchInputcursoasign.innerHTML = '';
      });
      searchInputcursoasign.appendChild(li);
    });
  }
  
  searchInputdptodocnt.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();
      const filteredDptms = listaDepartamentos.filter(departamento => departamento.nombre.toLowerCase().includes(inputValue));
      displayResultsDPTODOC(filteredDptms);
  });
}