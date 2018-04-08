var express = require("express");
var serveStatic = require("serve-static");
var port = process.env.PORT || 3000;
var fs = require("fs");
var axios = require('axios')
var apiKey = "3b5smpz2w4ke8n27bmnbeugk";
var url = `http://api.walmartlabs.com/v1/search?apiKey=${apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=`;
var url2 = 'http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod&categoryId=3944&sort=bestseller&responseGroup=full'
function readJSONFile(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

app = express();
app.get("/getWord", (req, res) => {
  var array = []
  // var url = "https://www.walmart.com/search/?query=" + req.params.searchTerm;
  console.log("param is this",req.query.searchTerm);
  axios
    //   // .get(url + req.params.searchTerm)
    .get(`http://api.walmartlabs.com/v1/search?apiKey=3b5smpz2w4ke8n27bmnbeugk&lsPublisherId={Your LinkShare Publisher Id}&numItems=25&sort=relevance&sort=bestseller&responseGroup=full&query=${req.query.searchTerm}`)
    .then(value => {
      // console.log("I saw value", value.data, typeof value);
      // console.log("I saw keys", Object.keys(value.data.items[0]));
      // console.log("I saw keys", Object.keys(value.status));
      // console.log("I saw keys statustext", value.data.items);
      // console.log("I saw keys data ", Object.keys(value.data));
      // console.log("I saw keys request", Object.keys(value.request.res));
      for (const key in value.data.items) {
        if (value.data.items.hasOwnProperty(key)) {
          const name = value.data.items[key].name;
          const img = value.data.items[key].largeImage;
          array.push({ name: name, image: img });
        }
      }

      console.log("hey its an", typeof array);

      console.log(value.data.items[0]);

      res.send(value.data.items[0]);
    })
    .catch(err => {
      console.log(err, " I saw errrors");
    });

  //  axios.get(url { params: { searchTerm: this.searchTerm } })

  //  ;
  // readJSONFile("dictionary.json", function(err, json) {
  //   if (err) {
  //     throw err;
  //   }
  //   res.send(json[req.query.searchTerm]);
  // });

  // fetch("http://api.walmartlabs.com/v1/search?apiKey=3b5smpz2w4ke8n27bmnbeugk&lsPublisherId={Your LinkShare Publisher Id}&query=ipod").then(
  //   data => console.log(data)
  // );
});

app.use(serveStatic(__dirname + "/"));

app.listen(port);
