let listaProgramas=[];

const cargarProgramas= async()=>{
   
  try{
      listaProgramas.length=0;
      const respuesta=await fetch('http://localhost:3000/programas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Programas. Estado: ',respuesta.status);
      }
      const Programas=await respuesta.json();
      listaProgramas.push(...Programas);

  }catch(error){
      console.error("Error al cargar Programas",error.message);
  }

  console.log(listaProgramas)
}
