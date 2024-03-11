const conteoAsignaturas = {};

const generarinformeMatr = () => {
    const matriculas = listaMatriculas;

    matriculas.forEach(matricula => {
        matricula.asignaturas_id.forEach(asignatura_id => {
            conteoAsignaturas[asignatura_id] = (conteoAsignaturas[asignatura_id] || 0) + 1;
        });
    });

    let asignaturaMasMatriculadaId = 0;
    let maxNumeroMatriculas = -1;

    Object.keys(conteoAsignaturas).forEach(asignatura_id => {
        if (conteoAsignaturas[asignatura_id] > maxNumeroMatriculas) {
            asignaturaMasMatriculadaId = asignatura_id;
            maxNumeroMatriculas = conteoAsignaturas[asignatura_id];
        }
    });

    const getNameA = (entity, list) => {
        const result = list.find(element => entity == element.id);
        return result ? result.codigo : "Nombre no encontrado o la lista no existe";
    }
      
    const divAsigMasMatr = document.getElementById("AsigMasMatr");
    const codigoAsignMasMatr = getNameA(asignaturaMasMatriculadaId, listaAsignaturas);

    const informeHTML = `
        <p>La asignatura más matriculada es la asignatura ID: ${asignaturaMasMatriculadaId}</p><br>
        Código: ${codigoAsignMasMatr}.
    `;

    divAsigMasMatr.innerHTML = informeHTML;
}


const calcularTotalMatriculasPorPeriodo = () => {
    const totalPorPeriodo = {};
    const matriculas = listaMatriculas;

    matriculas.forEach(matricula => {
        if (!totalPorPeriodo.hasOwnProperty(matricula.periodo)) {
            totalPorPeriodo[matricula.periodo] = {
                cantidad: 0,
                total: 0
            };
        }
        totalPorPeriodo[matricula.periodo].cantidad++;
        totalPorPeriodo[matricula.periodo].total += matricula.precio;
    });

    const divTotalMatr = document.getElementById("TotalMatrPer");
    let informeMatrHTML = "<ul>";
    for (const periodo in totalPorPeriodo) {
        informeMatrHTML += `<li>${periodo}: ${totalPorPeriodo[periodo].cantidad} Matriculas, Total Recaudado: $${totalPorPeriodo[periodo].total}</li>`;
    }
    informeMatrHTML += "</ul>";

    divTotalMatr.innerHTML = informeMatrHTML;

    console.log(totalPorPeriodo);
    return totalPorPeriodo;
};

// GENERACION DE HORARIOS //

//const cargarFormularioMatriculas=()=>{
//    const MatriculasForm = document.getElementById('Matriculas-form');
//    MatriculasForm.innerHTML = `<h2>Horarios</h2> 
//          <form>
//            <div class="search-container.EstHor">
//              <input type="text" id="search-input-EstHor" placeholder="Buscar Estudiantes...">
//              <ul id="search-results-EstHor"></ul>
//            </div>
//            <div id="infoEstudianteSelec"></div>
//            <div id="HorarioEst">
//
//            </div>
//          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
//      </form>
//  `;
//
//  CargarInformacionparaEst('search-input-EstHor', 'search-results-EstHor', 'infoEstudianteSelec', 'HorarioEst', 'PeriodoMatricula')
//}
//
//function CargarInformacionparaEst(searchInput4, searchResults4, infoEstDIvId, HorarioestDiv, PeriodoSelec) {
//    const searchInputEstudianteM = document.getElementById(searchInput4);
//    const searchResultsEstudianteM = document.getElementById(searchResults4);
//    const InfoEstDIv = document.getElementById(infoEstDIvId);
//    const HorarioDiv = document.getElementById(HorarioestDiv)
//  
//    function displayResultsEstMatrcla(results) {
//        searchResultsEstudianteM.innerHTML = '';
//  
//        if (results.length === 0) {
//            const li = document.createElement('li');
//            li.textContent = 'No se encontraron Estudiantes';
//            searchResultsEstudianteM.appendChild(li);
//            return;
//        }
//  
//        results.forEach(result => {
//          console.log(result)
//            const li = document.createElement('li');
//            li.textContent = `${result.nombre} ${result.apellido}`;
//            li.addEventListener('click', async function () {
//                searchInputEstudianteM.value = `${result.numero_documento}`;
//                searchResultsEstudianteM.innerHTML = '';
//                const ProgramaID = await mostrarInfoEstM(result);
//                const PeriodoSel = document.getElementById(PeriodoSelec)
//                const periodoSelecc = PeriodoSel.value;
//                console.log(periodoSelecc)
//                mostrarAsignDisp(ProgramaID, periodoSelecc);
//            });
//            searchResultsEstudianteM.appendChild(li);
//        });
//    }
//  
//    const getName = (entity, list) => {
//        const result = list.find(element => entity == element.id);
//        return result ? result.nombre : "Nombre no encontrado o la lista no existe";
//      }
//       
//    async function mostrarInfoEstM(student) {
//        const ProgramaID = student.programa_id
//        const ProgramaN =  getName(ProgramaID, listaProgramas)
//        InfoEstDIv.innerHTML = `
//            Estudiante ID: ${student.id}<br>
//            Nombre Completo: ${student.nombre} ${student.apellido}<br>
//            Número de documento: ${student.numero_documento}<br>
//            Programa: ${ProgramaN}<br>
//        `;
//  
//        return ProgramaID;
//    }
//  
//    async function mostrarAsignDisp(program, periodo) {
//      await cargarCursos();
//      ProgramaRel = Number(program);
//      const asignaturasFiltradas = listaAsignaturas.filter(asignatura => asignatura.programa_id == ProgramaRel && asignatura.periodo == periodo);
//  
//      AsignDispDiv.innerHTML = '<h2>Asignaturas Disponibles</h2>';
//  
//      asignaturasFiltradas.forEach(asignatura => {
//          cursoID = Number(asignatura.curso_id)
//          cursoN= getName(cursoID, listaCursos)
//          
//          const asignaturaInfo = document.createElement('li');
//          asignaturaInfo.textContent = `ID: ${asignatura.curso_id}, Curso: ${cursoN}, Periodo: ${asignatura.periodo}, Horario: ${asignatura.horario_clases[0].horario}, Dia: ${asignatura.horario_clases[0].dia}`;
//          const botonAgregar = document.createElement('a');
//          botonAgregar.textContent = 'Añadir';
//          botonAgregar.classList.add('boton-carrito-matriculas'); 
//  
//          botonAgregar.addEventListener('click', async function() {
//              agregarAlCarrito(asignatura);
//              await calculartotales(asignatura);
//          });
//  
//          asignaturaInfo.appendChild(botonAgregar); 
//          AsignDispDiv.appendChild(asignaturaInfo);
//      });
//    
//      return cursoN
//  }
//  
//    searchInputEstudianteM.addEventListener('input', function () {
//        const inputValue = this.value.toLowerCase();
//        const filteredStdntsM = listaEstudiantes.filter(estudiante => 
//            estudiante.nombre.toLowerCase().includes(inputValue) || estudiante.numero_documento.toLowerCase().includes(inputValue)
//        );
//        displayResultsEstMatrcla(filteredStdntsM);
//    });
//  }
//
//
//
//const generarHorarioMatriculas = () => {
//    const matriculas = listaMatriculas;
//    const horario = {};
//
//    matriculas.forEach(matricula => {
//        const { estudianteN, periodo, asignaturas_id } = matricula;
//
//        if (!horario.hasOwnProperty(estudianteN)) {
//            horario[estudianteN] = {};
//        }
//
//        if (!horario[estudianteN].hasOwnProperty(periodo)) {
//            horario[estudianteN][periodo] = [];
//        }
//
//        horario[estudianteN][periodo].push(asignaturas_id);
//    });
//
//    return horario;
//};
//
//
//const horario = generarHorarioMatriculas();
//console.log(horario);
//
//





