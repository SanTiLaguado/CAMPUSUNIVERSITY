const tiposdedocumento = ["Cedula de Ciudadania", "Cedula de Extrangeria", "Tarjeta de Identidad"]
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