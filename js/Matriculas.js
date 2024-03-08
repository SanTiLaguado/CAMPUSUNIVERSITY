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
            <div class="search-container.EstMatricula">
              <input type="text" id="search-input-EstMatricula" placeholder="Buscar Estudiantes...">
              <ul id="search-results-EstMatricula"></ul>
            </div>
            <div id="infoEstudianteSel"></div>
            <div id="AsignaturasDispEst">

            </div>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>
  `;

  CargarInformacionparaEst('search-input-EstMatricula', 'search-results-EstMatricula', 'infoEstudianteSel', 'AsignaturasDispEst')
}

function CargarInformacionparaEst(searchInput4, searchResults4, infoEstDIvId, asignDispDiv) {
  const searchInputEstudianteM = document.getElementById(searchInput4);
  const searchResultsEstudianteM = document.getElementById(searchResults4);
  const InfoEstDIv = document.getElementById(infoEstDIvId);
  const AsignDispDiv = document.getElementById(asignDispDiv)

  function displayResultsEstMatrcla(results) {
      searchResultsEstudianteM.innerHTML = '';

      if (results.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No se encontraron Estudiantes';
          searchResultsEstudianteM.appendChild(li);
          return;
      }

      results.forEach(result => {
          const li = document.createElement('li');
          li.textContent = `${result.nombre} ${result.apellido}`;
          li.addEventListener('click', async function () {
              searchInputEstudianteM.value = `${result.numero_documento}`;
              searchResultsEstudianteM.innerHTML = '';
              const ProgramaID = await mostrarInfoEstM(result);
              mostrarAsignDisp(ProgramaID);
          });
          searchResultsEstudianteM.appendChild(li);
      });
  }

  const getName = (entity, list) => {
      const result = list.find(element => entity === element.id);
      return result ? result.nombre : "Nombre no encontrado o la lista no existe";
    }
     
  async function mostrarInfoEstM(student) {
      const ProgramaID = student.programa_id
      const ProgramaN =  getName(ProgramaID, listaProgramas)
      InfoEstDIv.innerHTML = `
          Estudiante ID: ${student.id}<br>
          Nombre Completo: ${student.nombre} ${student.apellido}<br>
          Número de documento: ${student.numero_documento}<br>
          Programa: ${ProgramaN}<br>
      `;

      return ProgramaID;
  }

  async function mostrarAsignDisp(program) {
    await cargarCursos();
    ProgramaRel = Number(program);
    const asignaturasFiltradas = listaAsignaturas.filter(asignatura => asignatura.programa_id === ProgramaRel);
    console.log(ProgramaRel)

    AsignDispDiv.innerHTML = '<h2>Asignaturas Disponibles</h2>';

    asignaturasFiltradas.forEach(asignatura => {
        cursoID = asignatura.curso_id
        cursoN= getName(cursoID, listaCursos)
        
        const asignaturaInfo = document.createElement('li');
        asignaturaInfo.textContent = `ID Curso: ${asignatura.curso_id}, Curso: ${cursoN}, Horario: ${asignatura.horario_clases} `;

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Añadir';
        botonAgregar.classList.add('boton-carrito-matriculas'); 

        botonAgregar.addEventListener('click', function() {
            // LOGICA CARRITO
            console.log(`Añadido al carrito: ${asignatura.curso_id}`);
        });

        asignaturaInfo.appendChild(botonAgregar); 
        AsignDispDiv.appendChild(asignaturaInfo);
    });
  }

  searchInputEstudianteM.addEventListener('input', function () {
      const inputValue = this.value.toLowerCase();
      const filteredStdntsM = listaEstudiantes.filter(estudiante => 
          estudiante.nombre.toLowerCase().includes(inputValue) || estudiante.numero_documento.toLowerCase().includes(inputValue)
      );
      displayResultsEstMatrcla(filteredStdntsM);
  });
}

const mostrarListaMatriculas = async () => {
  await cargarMatriculas();
  
  const busquedaMatriculas = document.getElementById('busqueda-Matriculas');  
  
  busquedaMatriculas.innerHTML = `
    <div class="search-container-Matriculas">
      <input type="text" class="input-gestion" id="search-input-Matriculas" placeholder="Buscar Matriculas por Estudiante...">
      <ul class="results-lists" id="search-results-Matriculas"></ul>
    </div>
  `;
  
  const searchInputMatriculas = document.getElementById('search-input-Matriculas');
  const searchResultsMatriculas = document.getElementById('search-results-Matriculas');
  
  function displayResultsMatriculas(results) {
    searchResultsMatriculas.innerHTML = '';
  
    if (results.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No se encontraron Matriculas';
      searchResultsMatriculas.appendChild(li);
      return;
    }
    
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id} `;
      searchResultsMatriculas.appendChild(li);
    });
  }
  
  searchInputMatriculas.addEventListener('input', function() {
    const inputValue = this.value;
    const filteredItems = listaMatriculas.filter(matricula => 
      matricula.estudiante_id.includes(inputValue)
    );
  
    displayResultsMatriculas(filteredItems);
  });
  
  displayResultsMatriculas(listaMatriculas);
};

