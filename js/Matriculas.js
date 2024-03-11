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
            <label for="PeriodoMatricula">Periodo:</label>
              <select id="PeriodoMatricula" required>
                  ${cargarperiodos()}
              </select>
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

  CargarInformacionparaEst('search-input-EstMatricula', 'search-results-EstMatricula', 'infoEstudianteSel', 'AsignaturasDispEst', 'PeriodoMatricula')
}

function CargarInformacionparaEst(searchInput4, searchResults4, infoEstDIvId, asignDispDiv, PeriodoSelec) {
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
        console.log(result)
          const li = document.createElement('li');
          li.textContent = `${result.nombre} ${result.apellido}`;
          li.addEventListener('click', async function () {
              searchInputEstudianteM.value = `${result.numero_documento}`;
              searchResultsEstudianteM.innerHTML = '';
              const ProgramaID = await mostrarInfoEstM(result);
              const PeriodoSel = document.getElementById(PeriodoSelec)
              const periodoSelecc = PeriodoSel.value;
              console.log(periodoSelecc)
              mostrarAsignDisp(ProgramaID, periodoSelecc);
          });
          searchResultsEstudianteM.appendChild(li);
      });
  }

  const getName = (entity, list) => {
      const result = list.find(element => entity == element.id);
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

  async function mostrarAsignDisp(program, periodo) {
    await cargarCursos();
    ProgramaRel = Number(program);
    const asignaturasFiltradas = listaAsignaturas.filter(asignatura => asignatura.programa_id == ProgramaRel && asignatura.periodo == periodo);

    AsignDispDiv.innerHTML = '<h2>Asignaturas Disponibles</h2>';

    asignaturasFiltradas.forEach(asignatura => {
        cursoID = Number(asignatura.curso_id)
        cursoN= getName(cursoID, listaCursos)
        
        const asignaturaInfo = document.createElement('li');
        asignaturaInfo.textContent = `ID: ${asignatura.curso_id}, Curso: ${cursoN}, Periodo: ${asignatura.periodo}, Horario: ${asignatura.horario_clases[0].horario}, Dia: ${asignatura.horario_clases[0].dia}`;
        const botonAgregar = document.createElement('a');
        botonAgregar.textContent = 'Añadir';
        botonAgregar.classList.add('boton-carrito-matriculas'); 

        botonAgregar.addEventListener('click', async function() {
            agregarAlCarrito(asignatura);
            await calculartotales(asignatura);
        });

        asignaturaInfo.appendChild(botonAgregar); 
        AsignDispDiv.appendChild(asignaturaInfo);
    });
  
    return cursoN
}

  searchInputEstudianteM.addEventListener('input', function () {
      const inputValue = this.value.toLowerCase();
      const filteredStdntsM = listaEstudiantes.filter(estudiante => 
          estudiante.nombre.toLowerCase().includes(inputValue) || estudiante.numero_documento.toLowerCase().includes(inputValue)
      );
      displayResultsEstMatrcla(filteredStdntsM);
  });
}

let carritoMatriculas = [];
let totalcarrito= 0;
let listaIDs = [];

function agregarAlCarrito(asignatura) {
    carritoMatriculas.push(asignatura);
    let idsAsCart = Number(asignatura.curso_id);
    listaIDs.push(idsAsCart);
    console.log(listaIDs)
    console.log(`Asignatura añadida al carrito: ${asignatura.curso_id}`);
    mostrarCarrito();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  carritoMatriculas.forEach(asignatura => {
      const li = document.createElement('li');
      li.textContent = `ID: ${asignatura.curso_id}, Horario: ${asignatura.horario_clases[0].horario}, Dia: ${asignatura.horario_clases[0].dia}`;

      listaCarrito.appendChild(li);
  });
}

const botonEnvMatr = document.getElementById("botonenvmatr");
botonEnvMatr.addEventListener('click', async function() {
  crearMatricula();
});

const cuentacarrito = document.getElementById("cuenta-carrito");

const calculartotales = (asignatura) => {
  const cantidadcreditos = asignatura.creditos;
  const ProgramaID = asignatura.programa_id;

  function relacionartarifa() {
    const tarifaEncontrada = listaTarifas.find(tarifa => tarifa.programa_id == ProgramaID);

    if (tarifaEncontrada) {
      const tarifafinal = tarifaEncontrada.costo_credito;
      return tarifafinal;
    } else {
      return "No se encontró una tarifa para el programa especificado";
    }
  };

  const tarifa = relacionartarifa();
  const tarifafinal = tarifa * cantidadcreditos;
  
  console.log("Tarifa:", tarifafinal);
  
  totalcarrito += tarifafinal;

  const textoTotalCarrito = `TOTAL: ${totalcarrito}`;

  if (cuentacarrito.innerHTML.includes("TOTAL:")) {
    cuentacarrito.innerHTML = textoTotalCarrito;
  } else {
    cuentacarrito.innerHTML += textoTotalCarrito;
  }

  console.log("TotalCarrito:", totalcarrito);
}

const crearMatricula = async ()=>{
  await cargarFormularioMatriculas;
  await cargarEstudiantes;

  const CCInput=document.getElementById('search-input-EstMatricula');
  const periodoInput=document.getElementById('PeriodoMatricula');

  const CC=CCInput.value

  const getnombreEst = (CC, listaEstudiantes) => {
    console.log(listaEstudiantes)
    const result = listaEstudiantes.find(estudiante => CC === estudiante.numero_documento);
    const nombrecomp = result.nombre + " " + result.apellido;
    const estID = result.id
    return result ? { nombrecomp: nombrecomp, estID: estID } : "Nombre no encontrado o la lista no existe";
  }

  const infoestF = getnombreEst(CC, listaEstudiantes);
  const nombreCompleto = infoestF.nombrecomp;
  const idEstudiante = infoestF.estID;
  const periodo=periodoInput.value

  const nuevaMatricula={
    id: listaMatriculas.length+1,
    estudianteN: nombreCompleto,
    estudiante_id: idEstudiante,
    asignaturas_id: listaIDs,
    periodo: periodo,
    precio: totalcarrito,
  }

  await guardarMatricula(nuevaMatricula);

  console.log("Matriculado con exito")
  alert("Matriculado con exito")
  return nuevaMatricula;
}

const guardarMatricula= async(nuevaMatricula)=>{
  try{

      const respuesta=await fetch('http://localhost:3000/matriculas',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(nuevaMatricula),
      });

      if(!respuesta.ok){
         throw new Error('Error al crear la Matricula. Estado: ',respuesta.status);
      }
      const Matriculacreada=await respuesta.json();
      
      console.log('Matricula creada:', Matriculacreada);

  }catch(error){
      console.error("Error al cargar Matriculas",error.message);
  }
}

const mostrarListaMatriculas = async () => {
  await cargarMatriculas
  console.log(listaMatriculas)
  const listaElemento = document.getElementById("Listado-Matriculas");

  listaMatriculas.forEach(matricula => {
    const listItem = document.createElement("li");
    listItem.textContent = `ID: ${matricula.id}, Estudiante: ${matricula.estudianteN}, ID Asig. Matriculadas: ${matricula.asignaturas_id}, Periodo: ${matricula.periodo}, Total Pagado: $${matricula.precio} `;
    listaElemento.appendChild(listItem);
  });
}