let listaAsignaturas = [];
let listaCursos = [];

const cargarAsignaturas = async () => {

  try {
    listaAsignaturas.length = 0;
    const respuesta = await fetch('http://localhost:3000/asignaturas');

    if (!respuesta.ok) {
      throw new Error('Error al cargar Asignaturas. Estado: ', respuesta.status);
    }
    const Asignaturas = await respuesta.json();
    listaAsignaturas.push(...Asignaturas);

  } catch (error) {
    console.error("Error al cargar Asignaturas", error.message);
  }

  console.log(listaAsignaturas)
}

const cargarCursos = async () => {

  try {
    listaCursos.length = 0;
    const respuesta = await fetch('http://localhost:3000/cursos');

    if (!respuesta.ok) {
      throw new Error('Error al cargar Cursos. Estado: ', respuesta.status);
    }
    const Cursos = await respuesta.json();
    listaCursos.push(...Cursos);

  } catch (error) {
    console.error("Error al cargar Cursos", error.message);
  }

  console.log(listaCursos)
}

const cargarFormularioAsignaturas = async () => {
  await cargarCursos();
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
            <input type="text" id="search-input-DocenteAsign" placeholder="Buscar Docentes...">
            <ul id="search-results-DocenteAsign"></ul>
          </div>
          <label for="cuposAsign">Max de Cupos Disponibles:</label>
          <input type="number" id="cuposAsign" required> 
          <label for="ProgramaAsign">Seleccione un Programa:</label>
          <div class="search-container.ProgramaAsign">
            <input type="text" id="search-input-ProgramaAsign" placeholder="Buscar Programas...">
            <ul id="search-results-ProgramaAsign"></ul>
          </div>
          <label for="HorarioAsign">Seleccione un Horario:</label>
            <div id="horarios">
              <label for="dia-1">Día:</label>
              <select class="HorarioDia" required>
                ${cargardias()}
              </select>
              <label for="hora-1">Horario:</label>
              <select class="HorarioHoras" required>
                ${cargarHorarios()}
              </select>
              <label for="salon-1">Salón:</label>
              <select class="HorarioSalon" required>
                ${selectSalones()}
              </select>
            </div>
            <button type="button" id="agregarHorario">Agregar otro horario</button>

          <button type="button" onclick="crearAsignatura()">Crear Asignatura</button>
      </form>  
  `;

  const horariosContainer = document.getElementById('horarios');
  const agregarHorarioBtn = document.getElementById('agregarHorario');
  let horarioCount = 1;

  agregarHorarioBtn.addEventListener('click', function () {
    horarioCount++;

    const nuevoHorario = document.createElement('div');
    nuevoHorario.classList.add('horario');
    nuevoHorario.innerHTML = `
          <label for="dia-${horarioCount}">Día:</label>
          <select name="dia[]" id="dia-${horarioCount}" required>
          ${cargardias()}
          </select>
          <label for="hora-${horarioCount}">Horario:</label>
          <select name="hora[]" id="hora-${horarioCount}" required>
          ${cargarHorarios()}
          </select>
          <label for="salon-${horarioCount}">Salón:</label>
          <select name="salon[]" id="salon-${horarioCount}" required>
          ${selectSalones()}
          </select>
      `;

    horariosContainer.appendChild(nuevoHorario);
  });

  buscadorDocentes('search-input-DocenteAsign', 'search-results-DocenteAsign')
  buscadorCursos('search-input-cursoasign', 'search-results-cursoasign')
  buscadorProgramas('search-input-ProgramaAsign', 'search-results-ProgramaAsign')
}

const crearAsignatura = async () => {

  const cursoInput = document.getElementById('search-input-cursoasign');
  const codigoInput = document.getElementById('codigoASIGN');
  const creditosInput = document.getElementById('cantcreditosasign');
  const DocenteInput = document.getElementById('search-input-DocenteAsign');
  const cuposInput = document.getElementById('cuposAsign');
  const ProgramaAInput = document.getElementById('search-input-ProgramaAsign');

  const cursoAs = cursoInput.value;
  const codigoAs = codigoInput.value;
  const creditosAs = creditosInput.value;
  const DocenteAs = DocenteInput.value;
  const cuposAs = cuposInput.value;
  const programaAs = ProgramaAInput.value;

  const horariosAsArray = [];
  const horariosContainer = document.getElementById('horarios');
  const horarioElements = horariosContainer.querySelectorAll('.horario');

  horarioElements.forEach((horarioElement, index) => {
    const dia = horarioElement.querySelector(`#dia-${index + 1}`).value;
    const hora = horarioElement.querySelector(`#hora-${index + 1}`).value;
    const salon = horarioElement.querySelector(`#salon-${index + 1}`).value;

    horariosAsArray.push({
      dia,
      horario: hora,
      salon_id: salon
    });
  });

  async function relacionaridcurso(cursoAs) {
    const cursoselAs = listaCursos.find(curso => curso.nombre === cursoAs);

    if (cursoselAs) {
      const CursoASID = cursoselAs.id;
      console.log('ID del programa seleccionado:', CursoASID);
      return CursoASID;
    } else {
      console.log('Programa no encontrado en el JSON de programas');
      return null;
    }
  }

  async function relacionaridocente(DocenteAs) {
    const cleanDocenteAs = DocenteAs.trim().toLowerCase(); 

    const putas = listaDocentes.find(docente => docente.nombre.trim().toLowerCase() === cleanDocenteAs);

    if (putas) {
      const DocenteASID = putas.id;
      console.log('ID del docente seleccionado:', DocenteASID);
      return DocenteASID;
    } else {
      console.log('Docente no encontrado en la lista de docentes');
      return null;
    }
  }


  async function relacionaridprograma(programaAs) {
    const programaselAs = listaProgramas.find(programa => programa.nombre === programaAs);

    if (programaselAs) {
      const ProgramaASID = programaselAs.id;
      console.log('ID del programa seleccionado:', ProgramaASID);
      return ProgramaASID;
    } else {
      console.log('Programa no encontrado en el JSON de programas');
      return null;
    }
  }

  const nuevoidAsign = (listaAsignaturas.length + 1).toString();
  const CursoIDAS = await relacionaridcurso(cursoAs);
  const DocenteIDAS = await relacionaridocente(DocenteAs);
  const ProgramaIDAS = await relacionaridprograma(programaAs);

  const nuevaAsignatura = {
    id: nuevoidAsign,
    curso_id: CursoIDAS,
    codigo: codigoAs,
    creditos: creditosAs,
    profesor_id: DocenteIDAS,
    cupos_disponibles: cuposAs,
    programa_id: ProgramaIDAS,
    horario_clases: horariosAsArray
  }

  await cargarAsignaturas();
  await guardarAsignatura(nuevaAsignatura);
  await cargarCursos();

  alert('Asignatura creada con éxito!');

  return nuevaAsignatura;
}

const guardarAsignatura = async (nuevaAsignatura) => {
  try {

    const respuesta = await fetch('http://localhost:3000/asignaturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaAsignatura),
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la Asignatura. Estado: ', respuesta.status);
    }

    const AsignaturaCreada = await respuesta.json();

    console.log('Asignatura creada:', AsignaturaCreada);

  } catch (error) {
    console.error("Error al cargar Asignaturas", error.message);
  }
}