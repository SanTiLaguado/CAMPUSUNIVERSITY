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
