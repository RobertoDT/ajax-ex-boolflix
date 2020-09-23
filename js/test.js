$(document).ready(function(){

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

$(document).on("click", ".numero_pagine", function(){
  //seleziono con il this cioè quel quadratino che vado a selezionare
  var numeroPagina = $(this).attr("data-page");
  getMovies(lastSearch, numeroPagina);
  clear();
});
