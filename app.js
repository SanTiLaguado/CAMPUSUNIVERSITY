document.addEventListener('DOMContentLoaded',async ()=>{
await cargarProgramas();
cargarFormularioEstudiantes();
await cargarEstudiantes();
})


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navigation a');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // Llama a la función handleNavigation con el texto del enlace como argumento
            handleNavigation(link.textContent);
        });
    });
});

function handleNavigation(linkText) {
    // Aquí puedes escribir el código que deseas ejecutar cuando se hace clic en un enlace
    console.log('Hiciste clic en:', linkText);
    // Dependiendo del texto del enlace, puedes realizar diferentes acciones
    switch (linkText) {
        case 'Inicio':
            console.log("home")
            break;
    // Informes
        case 'Informe Matriculas':
            console.log("Informe Matriculas")
            break;
        case 'Inicio':
            console.log("nforme Asignaturas")
            break;
        case 'Informe Matriculas':
            console.log("Informe Asignaturas")
            break;
        case 'Generar Horarios':
            console.log("Generar Horarios")
            break;
    // Datos Existentes
        case 'Programas':
            console.log("Programas")
            break;
        case 'Periodos':
            console.log("Periodos")
            break;
        case 'Tarifas':
            console.log("Tarifas")
            break;
        case 'Departamentos':
            console.log("Departamentos")
            break;
        case 'Salones':
            console.log("Salones")
            break;
    // Gestion
         case 'Estudiantes':
            console.log("Estudiantes")
            break;
        case 'Docentes':
            console.log("Docentes")
            break;
        case 'Asignaturas':
            console.log("Asignaturas")
            break;
    // Matriculas
         case 'Nueva Matricula':
            console.log("Nueva Matricula")
            break;
        case 'Lista de Matriculas':
            console.log("Lista de Matriculas")
            break;

        default:
            // Código de Home
            break;
    }
}