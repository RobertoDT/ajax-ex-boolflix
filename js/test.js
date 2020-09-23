$(document).ready(function(){

  convert(6.7);

});

function convert(vote){

  var nuovoVote = Math.ceil(vote / 2);
  console.log(nuovoVote);
}
