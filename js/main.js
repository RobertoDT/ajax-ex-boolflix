$(document).ready(function(){
  // funzione cerca al click sul bottone
  $(".search_button").click(function(){
    ricerca();
  });

  // funzione cerca premendo invio
  $(".search_input").keyup(function(){
    if(event.which == 13){
      ricerca();
    }
  });

});
// /document

//FUNZIONI
//funzione per la ricerca dei film e serieTv
function ricerca(){
  var searchMovie = $(".search_input").val();

  if(searchMovie != ""){
    clear();
    getResults("movie", searchMovie);
    getResults("tv", searchMovie);

    $(".search_input").val("");
  }
}

//funzione che legge i risultati sia di film che delle serie
function getResults(type, cercaFilm){
  var api_key = "e985f53e1e87b07c7fd1095468f025a0";

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/" + type,
      "data": {
        "api_key" : api_key,
        "language": "it-IT",
        "page": "",
        "query": cercaFilm
      },
      "method": "GET",
      "success": function (data, stato) {
        var totalResult = data.total_results;
        if(totalResult > 0){
          stampaResults(type, data);
        } else {
          alert("Non abbiamo trovato il risultato che stai cercando!!!");
          return;
        }
      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );
}

//Printa il risultato della risposta a schermo con i film e le serieTv
function stampaResults(type, data){

  //preparo il template
  var source = $("#global-template").html();
  var template = Handlebars.compile(source);

  //array del risultato
  var results = data.results;
  for(var i = 0; i < results.length; i++){

    var title, original_title;
    if(type == "movie"){
      title = results[i].title;
      original_title = results[i].original_title;
    } else if(type == "tv"){
      title = results[i].name;
      original_title = results[i].original_name;
    }

    //sostituisco le immagini non trovate con un immagine sostitutiva
    var basicPath = "https://image.tmdb.org/t/p/w342";
    var poster = results[i].poster_path;
    if(results[i].poster_path == null){
      basicPath = "https://shop.unicornstore.in/beam/themes/2019/assets/img/image_not_available.jpg";
      poster = "";
    }

    //cambio i valori del context con le nuove chiavi della nuova chiamata API
    var context = {
      "title": title,
      "original_title": original_title,
      "original_language" : results[i].original_language,
      "vote_average": results[i].vote_average,
      "vote_star": convert(results[i].vote_average),
      "poster": poster,
      "type": type,
      "overview": results[i].overview,
      "basic_path": basicPath
    };

    var html = template(context);
    $("#global-list").append(html);
  }
}

//funzione che svuota i contenuti della lista di film e serie quando faccio una nuova ricerca
function clear(){
  $("#global-list").html("");
}

//funzione che converte il numero decimale da 1 a 10 in un intero da 1 a 5 e restituisce il numero di stelle
function convert(vote){
  var newVote = Math.ceil(vote / 2);
  //setto la variabile vuota che andrò a popolare nel ciclo for
  var voteStar = "";

  for(var i = 1; i <= 5; i++){

    if(i < newVote){
      voteStar += "<i class='fas fa-star'></i>";
    } else{
      voteStar += "<i class='far fa-star'></i>";
    }
  }
  //la funzione mi restituirà il numero di stelline in base al voto
  return voteStar;
}
