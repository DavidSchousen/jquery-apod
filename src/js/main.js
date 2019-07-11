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

  // Application Constructor
  init: function() {
      let date = this.randomDate(new Date(1995, 5, 16), new Date());
      //let date = "2013-06-06";
      var url = "https://api.nasa.gov/planetary/apod?api_key=TcfsE4U6nSnrOVtBcto9CSs3g1dvgXeuzNFgC7pj&date=" + date;
      $.ajax({
        url: url
    }).done(function(result){
      
      if(result.media_type === 'video') {
        $("#apodImg").hide();
        $("#apodVideo > iframe").attr("src", result.url).show();
      }else{
        $("#apodVideo").hide();
        $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
      }
      
      $("#apodTitle").text(result.title);
      $("#apodImg").attr("src", result.url);
      $("#apodCopyright").text("Copyright: " + result.copyright);
      $("#apodDate").text("Date: " + date);
      $("#apodDesc").text(result.explanation);
    }).fail(function(data){
      console.log(data);
    });
  },
};

apod.init();