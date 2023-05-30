//declaracion de constantes
const content_text = document.querySelector(".content_text");
const content_out_empty = document.querySelector(".content_out_empty");
const content_encrypt = document.querySelector(".content_encrypt");
const content_decrypt = document.querySelector(".content_decrypt")
const content_copy = document.querySelector(".content_copy");


// eventos

(() => {
    content_encrypt.addEventListener('click',encrypt);
    content_decrypt.addEventListener('click',descrypt);
})()


document.addEventListener('click', function(event) {
  if (event.target.classList.contains('content_copy')) {
      copy();
  }
});


// content_text.addEventListener("keyup", e =>{
//   content_text.style.height = "auto";
//   let scHeight = e.target.scrollHeight;
//   content_text.style.height = `${scHeight}px`;

//   content_text.style.width = "auto";
//   let scWidth = e.target.scrollWidth;
//   content_text.style.width = `${scWidth}px`;
// });
//funciones

const mediaQuery = window.matchMedia('(max-width: 375px)'); // Adjust the media query as needed
function handleKeyUp(e) {
  content_text.style.height = "auto";
  let scHeight = e.target.scrollHeight;
  content_text.style.height = `${scHeight}px`;

  content_text.style.width = "auto";
  let scWidth = e.target.scrollWidth;
  content_text.style.width = `${scWidth}px`;
}
if (!mediaQuery.matches) {
  content_text.addEventListener("keyup", handleKeyUp);
}



function validation() {
  let text_content = content_text.value;
  if (!/^[a-z\s]+$/.test(text_content)) {
    if (text_content.trim().length === 0) {
      swal("Error", "La respuesta no puede estar vacía!", "warning");
      return true;
    }
    swal("Error", "Solo se permiten letras minúsculas y sin acentos!", "warning");
    return true;
  }
}



function encrypt(){
  const replacements = {
      'a': 'ai',
      'e': 'enter',
      'i': 'imes',
      'o': 'ober',
      'u': 'ufat'
    };
  if(!validation()){
      let encrypted = content_text.value;
      encrypted = encrypted.replace(/[eiaou]/g, (match)=>replacements[match]);
      console.log(encrypted);
      content_text.value="";
      show_content(encrypted);
  }
  
}

function descrypt(){
  const reverseReplacements = {
      'ai': 'a',
      'enter': 'e',
      'imes': 'i',
      'ober': 'o',
      'ufat': 'u'
    };
  if(!validation()){
      let descrypted = content_text.value;
      descrypted = descrypted.replace(/(ai|enter|imes|ober|ufat)/g, (match)=>reverseReplacements[match]);
      console.log(descrypted);
      content_text.value="";
      show_content(descrypted);
  }
}


function show_content(text_content){
  content_out_empty.innerHTML = `
                    <p class="final_content" >${text_content}</p>
                    <button class="content_copy">Copiar</button>
                    `;
  content_out_empty.appendChild(content_copy);
    
}


function copy(){
 
  const textToCopy = content_out_empty.querySelector(".final_content").textContent;
  console.log(textToCopy);
  navigator.clipboard.writeText(textToCopy)
      .then(function () {
          swal("", "¡Contenido copiado!","success");
      })
      .catch(function (error) {
            console.error('Error al copiar el contenido:', error);
      });
   
    content_text.style.height = `81px`;
    content_text.style.width = `343px`;
    content_out_empty.querySelector(".final_content").innerHTML="";

    content_out_empty.innerHTML= `
                      <img src="https://cdn-icons-png.flaticon.com/512/2905/2905544.png" alt="logo">
                      <h3>Ningún mensaje fue encontrado</h3>
                      <p>Ingresa el texto que desees encriptar o desencriptar.</p>
    `;

}



