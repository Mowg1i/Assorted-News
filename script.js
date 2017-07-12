$(document).ready(function() {
  var template =
    '<div class="feed"><div class="feedheader"></div><a target="_blank" href ="" class="sourcelink"><img class="feedimg"></img><div class="feedheadline"></div><div class="feedbody"></div><br><i>Read More...</i></a></div>';

  var numOfSources = 18;

  for (var s = 0; s < numOfSources; s++) {
    $(".allfeeds").append(template);
  }

  var sourcesLink = "https://newsapi.org/v1/sources?language=en";
  var sourceLink = document.getElementsByClassName("sourcelink");
  var feedHeader = document.getElementsByClassName("feedheader");
  var feedHeadline = document.getElementsByClassName("feedheadline");
  var feedBody = document.getElementsByClassName("feedbody");
  var feedImg = document.getElementsByClassName("feedimg");

  var getArticle = function(articleLink, num) {
    jQuery.getJSON(articleLink, function(data) {
      sourceLink[num].href = data.articles[0].url;

      feedHeadline[num].innerHTML = data.articles[0].title;

      feedBody[num].innerHTML = data.articles[0].description;

      feedImg[num].src = data.articles[0].urlToImage;
    });
  };

  var getNews = function() {
    jQuery.getJSON(sourcesLink, function(data) {
      var randomArray = [];

      for (var j = 0; j < data.sources.length; j++) {
        var num = Math.floor(Math.random() * data.sources.length);
        if ($.inArray(num, randomArray) == -1) {
          randomArray.push(num);
        } else {
          j--;
        }
      }

      var k = 0;
      for (var i = 0; k < numOfSources; i++) {
        if (
          data.sources[randomArray[i]].hasOwnProperty("name") &&
          data.sources[randomArray[i]].category == "general"
        ) {
          feedHeader[k].innerHTML = data.sources[randomArray[i]].name;

          getArticle(
            "https://newsapi.org/v1/articles?source=" +
              data.sources[randomArray[i]].id +
              "&sortBy=top&apiKey=8bc565f985194462a16368169177e93d",
            k
          );

          k++;
        }
      }
    });
  };

  getNews();

  $("#getnews").click(getNews);
});
