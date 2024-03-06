function buscadorProgramas(searchInput, searchResults) {
    const searchInputPROG = document.getElementById(searchInput);
    const searchResultsPROG = document.getElementById(searchResults);

    function displayResultsDOCS(results) {
        searchResultsPROG.innerHTML = '';

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron programas';
            searchResultsPROG.appendChild(li);
            return;
        }

        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.nombre;
            li.addEventListener('click', function () {
                searchInputPROG.value = result.nombre;
                searchResultsPROG.innerHTML = '';
            });
            searchResultsPROG.appendChild(li);
        });
    }

    searchInputPROG.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const filteredPrograms = listaProgramas.filter(programa => programa.nombre.toLowerCase().includes(inputValue));
        displayResultsDOCS(filteredPrograms);
    });
}
function buscadorProfesores(searchInput1, searchResults1){
    const searchInputdptodocnt = document.getElementById('searchInput1');
    const searchResultsdptodocnt = document.getElementById('searchResults1');
    
    function displayResultsDPTODOC(results) {
      searchResultsdptodocnt.innerHTML = '';
    
      if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron departamentos';
        searchResultsdptodocnt.appendChild(li);
        return;
      }
    
      results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.nombre;
        li.addEventListener('click', function() {
          searchInputdptodocnt.value = result.nombre;
          searchResultsdptodocnt.innerHTML = '';
        });
        searchResultsdptodocnt.appendChild(li);
      });
    }
    
    searchInputdptodocnt.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        const filteredDptms = listaDepartamentos.filter(departamento => departamento.nombre.toLowerCase().includes(inputValue));
        displayResultsDPTODOC(filteredDptms);
    });
    function buscadorCursos(searchInput2, searchResults2){
        const searchInputcursoasign = document.getElementById('searchInput2');
        const searchResultscursoasign = document.getElementById('searchResults2');
        
        function displayResultsCursoAsign(results) {
          searchResultscursoasign.innerHTML = '';
      
          if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron Cursos';
            searchResultscursoasign.appendChild(li);
            return;
          }    
          
            results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.nombre;
            li.addEventListener('click', function() {
              searchInputcursoasign.value = result.nombre;
              searchInputcursoasign.innerHTML = '';
            });
            searchInputcursoasign.appendChild(li);
          });
        }  
            searchInputcursoasign.addEventListener('input', function() {
            const inputValue = this.value.toLowerCase();
            const filteredCursos = listaCursos.filter(curso => curso.nombre.toLowerCase().includes(inputValue));
            displayResultsCursoAsign(filteredCursos);
        });
    }
}
