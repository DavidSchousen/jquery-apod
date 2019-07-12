var apod = {
  //Create a random date

  randomDate: function(start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();

    //Change the maonth and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }

    if(d < 10){
      m = '0'+d
    }

    return `${y}-${m}-${d}`;
  },

  //Injects the results of the API call into the DOM
buildDOM: function(result) {
  $("#apodTitle").text(result.title);

  if(result.media_type === 'video') {
    $("#apodImage").hide();
    $("#apodVideo > iframe").attr("src", result.url).show();
  }else{
    $("#apodVideo").hide();
    $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
  }

  $("#apodCopyright").text("Copyright: " + result.copyright);
  $("#apodDate").text("Date: " + result.date);
  $("#apodDesc").text(result.explanation);
},

//Executes an AJAX call to an API.
getRequest: function() {
  //let date = this.randomDate(new Date(1995, 5, 16), new Date());
  //let date = "2013-06-06"; //star comparison video
  let _this = this;
  let date = this.randomDate(new Date(1995, 5, 16), new Date());
  var url = "https://api.nasa.gov/planetary/apod?api_key=TcfsE4U6nSnrOVtBcto9CSs3g1dvgXeuzNFgC7pj&date=" + date;
  
  $.ajax({
      url: url
  }).done(function(result){
      _this.buildDOM(result);
  }).fail(function(result){
    console.log(result);
  });
},

// Initialization method.
  init: function() {
    this.getRequest();
  },
};
//END OF APOD FUNC

apod.init();

/*document.getElementById('changeColor').addEventListener('click', 
function(){
  var randomColor = "";

  //document.getElementById("changeColor").value 
  //  = Math.floor(Math.random()*16777215).toString(16);
  document.getElementById("button").style.background='#000000';
  randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  return randomColor;
});//*/

/* https://learn.jquery.com/using-jquery-core/document-ready/ */
$(function() {
    $('.button').on('click',function(){
      apod.getRequest();
    });
});