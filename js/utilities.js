const cargarperiodos=()=>{
    let options= ''
    for (let i = 0; i < listaPeriodos.length; i++){
        options += `<option value="${listaPeriodos[i].codigo}">${listaPeriodos[i].codigo}</option>`
    }
    return options
}

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

const tiposdedocumento = ["Cedula de Ciudadania", "Cedula de Extrangeria", ]

const cargartiposdocs=()=>{
    let options= ''
    for (let i = 0; i < tiposdedocumento.length; i++){
        options += `<option value="${tiposdedocumento[i]}">${tiposdedocumento[i]}</option>`
    }
    return options
}

const sexos = ["Masculino", "Femenino", "Otro"]
const cargarsexos=()=>{
    let options= ''
    for (let i = 0; i < sexos.length; i++){
        options += `<option value="${sexos[i]}">${sexos[i]}</option>`
    }
    return options
}

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
const cargardias=()=>{
    let options= ''
    for (let i = 0; i < dias.length; i++){
        options += `<option value="${dias[i]}">${dias[i]}</option>`
    }
    return options
}

const selectSalones = () => {
    let options = '';
    for (let i = 0; i < listaSalones.length; i++) {
      const salon = listaSalones[i];
      options += `<option value="${salon.id}">Salón ${salon.numero_identificacion}, ${salon.edificio}, Piso ${salon.piso}</option>`;
    }
    return options;
}

const myPopup = new Popup({
    id: "docentespop",
    title: "Docente",
    content: `
        An example popup.
        Supports multiple lines.`,
});

const popupdocentes=async()=>{
    myPopup.show();
    await sleep(10000);
    myPopup.hide();
}