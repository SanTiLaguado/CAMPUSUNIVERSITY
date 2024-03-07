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