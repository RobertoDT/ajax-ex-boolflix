$(document).ready(function(){

  //variabile globale settata a vuota che andrò a riempire con il valore del campo input (mi servirà se utilizzerò il numero di pagine)
  // var lastSearch = "";


  //clono la variabile searchmovie
  // lastSearch = $(".search_input").val();


  convert(6.7);

});

function convert(vote){

  var nuovoVote = Math.ceil(vote / 2);
  console.log(nuovoVote);
}


stampaPagine(data);

//stampo il numero di pagine della chiamata
function stampaPagine(data){
  var pageNumber = data.total_pages;
  //preparo il template
  var source = $("#pages-template").html();
  var template = Handlebars.compile(source);

  //ciclo i numeri delle pagine prodotte dal risutato della query e compilo il context
  for(var i = 1; i <= pageNumber; i++){
    var context = {
      "page": i
    }

    var html = template(context);
    //stampo nel DOM
    $(".movies-page-list").append(html);
  }
}

      // $(".serie:nth-child("+(i+1)+") .star-list").append(voto);


  //click sul quadratino prende il valore di data-page e passiamo il valore alla funzione stampaFilm
$(document).on("click", ".numero_pagine", function(){
  //seleziono con il this cioè quel quadratino che vado a selezionare
  var numeroPagina = $(this).attr("data-page");
  getMovies(lastSearch, numeroPagina);
  clear();
});


//pagina==null
// if(pagina == ""){
//   var pagina = 1;
// }


//PARTE DEL CODICE html

// <!-- footer con numero di pagine -->
// <!-- <footer id="movies-page">
//   <ul class="movies-page-list">
//
//   </ul>
// </footer> -->
// <!-- /footer con numero di pagine -->


// <!-- template pagine -->
// <!-- <script id="pages-template" type="text/x-handlebars-template">
//   <li class="numero_pagine" data-page="{{page}}">
//     <span>{{page}}</span>
//   </li>
// </script> -->
// <!-- /template pagine -->
