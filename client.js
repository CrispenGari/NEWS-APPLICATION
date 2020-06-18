var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=8ff2d269333b454fa928026b6304a231';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })