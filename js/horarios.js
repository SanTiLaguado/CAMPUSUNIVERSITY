const horarios = [
    { "horario1": '06:00 - 08:00' },
    { "horario1": '08:00 - 10:00' },
    { "horario2": '10:00 - 12:00' },
    { "horario3": '14:00 - 16:00' },
    { "horario4": '16:00 - 18:00' },
    { "horario5": '18:30 - 20:30' },
];

const cargarHorarios = () => {
  let options = '';
  for (let i = 0; i < horarios.length; i++) {
      const horarioObj = horarios[i];
      const horarioKey = Object.keys(horarioObj)[0];
      const horarioValue = horarioObj[horarioKey];
      options += `<option value="${horarioValue}">${horarioValue}</option>`;
  }
  return options;
};



//   const url = 'http://localhost:3000/asignaturas';

// const obtenerAsignaturas = async () => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data && data.asignaturas) {
//       data.asignaturas.forEach(asignatura => {
//         if (asignatura.horario_clases) {
//           asignatura.horario_clases.forEach(horario => {
//             console.log(Asignatura: ${asignatura.codigo}, Día: ${horario.dia}, Hora: ${horario.hora_inicio}-${horario.hora_fin}, Salón: ${horario.salon_id});
//           });
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Error al obtener las asignaturas:', error);
//   }
// };

// obtenerAsignaturas();



//   const asignarHorario = (salon, dia, horario) => {
//     const asignacionExistente = asignaciones.find(asignacion => asignacion.salon === salon && asignacion.dia === dia);

//     if (asignacionExistente) {
//       console.error(Error: El salón ${salon} ya tiene asignado un horario para el día ${dia});
//     } else {
//       asignaciones.push({ salon, dia, horario });
//       console.log(Asignación exitosa: Salon ${salon} tiene el horario ${horario} para el día ${dia});
//     }
//   };

//   asignarHorario('Salon1', 'Lunes', '08:00 - 10:00');
//   asignarHorario('Salon1', 'Lunes', '10:00 - 12:00');