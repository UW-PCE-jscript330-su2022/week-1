# JSCRIPT-330-Wk-2

1. Install the necessary dependencies: `npm install`
2. Start the server: `npm start`

The server will listen on port `5000` by default. This can be changed in
`/index.js` if you prefer to use a different port.

Now you can query the movie database using `curl`! (`man curl`)

## Movies

### Querying Movies

Get **all movies** in the database by querying the `/movies` route:

``` shell
curl http://localhost:5000/movies
```

Movies are *sorted alphabetically in descending order*.

<details>
  <summary>Example response</summary>
  ```
  [{"_id":"573a13cef29313caabd86ecc","title":"!Women Art Revolution"},{"_id":"573a13e6f29313caabdc56c7","title":"#chicagoGirl: The Social Network Takes on a Dictator"},{"_id":"573a1396f29313caabce48c4","title":"$"},{"_id":"573a13b8f29313caabd4bd33","title":"$9.99"},{"_id":"573a13d9f29313caabda9ffb","title":"$ellebrity"},{"_id":"573a13dff29313caabdb9439","title":"'71"},{"_id":"573a1396f29313caabce4485","title":"'Doc'"},{"_id":"573a1398f29313caabce99ac","title":"'Master Harold'... and the Boys"},{"_id":"573a1393f29313caabcdc5dc","title":"'Pimpernel' Smith"},{"_id":"573a13a1f29313caabd07b8a","title":"'R Xmas"}]
  ```
</details>


Get a movie **by _id** by appending the `_id` of your movie to the `/movies` 
route:

``` shell
curl http://localhost:5000/movies/573a13e6f29313caabdc56c7
```

<details>
  <summary>Example response</summary>
  ```
  → {"_id":"573a13e6f29313caabdc56c7","plot":"From her childhood bedroom in the Chicago suburbs, an American teenage girl uses social media to run the revolution in Syria. Armed with Facebook, Twitter, Skype and cameraphones, she helps...","genres":["Documentary","Action","Drama"],"runtime":74,"title":"#chicagoGirl: The Social Network Takes on a Dictator","poster":"https://m.media-amazon.com/images/M/MV5BMTgwODIxMjM3NV5BMl5BanBnXkFtZTgwMzYzODA2NjE@._V1_SY1000_SX677_AL_.jpg","countries":["USA","Syria"],"fullplot":"From her childhood bedroom in the Chicago suburbs, an American teenage girl uses social media to run the revolution in Syria. Armed with Facebook, Twitter, Skype and cameraphones, she helps her social network in Damascus and Homs braves snipers and shelling in the streets and the world the human rights atrocities of one of the most brutal dictators. But as the revolution rages on, everyone in the network must decide what is the most effective way to fight a dictator: social media or AK-47s.","languages":["English"],"released":"2014-05-18T00:00:00.000Z","directors":["Joe Piscatella"],"writers":["Joe Piscatella"],"awards":{"wins":2,"nominations":2,"text":"2 wins & 2 nominations."},"lastupdated":"2015-09-01 00:08:44.710000000","year":2013,"imdb":{"rating":7.1,"votes":77,"id":3060338},"type":"movie","tomatoes":{"viewer":{"rating":4.5,"numReviews":4},"lastUpdated":"2015-09-10T19:14:36.000Z"},"num_mflix_comments":0}
  ```
</details>

Get a movie **by title** by appending the movie's `title` to the `/movies/title` route:

``` shell
curl http://localhost:5000/movies/title/Titanic
```

<details>
  <summary>Example response</summary>
  ```
  → [{"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}},{"_id":"573a139af29313caabcefb1d","plot":"The story of the 1912 sinking of the largest luxury liner ever built, the tragedy that befell over two thousand of the rich and famous as well as of the poor and unknown passengers aboard the doomed ship.","genres":["Action","Drama","History"],"runtime":173,"cast":["Peter Gallagher","George C. Scott","Catherine Zeta-Jones","Eva Marie Saint"],"poster":"https://m.media-amazon.com/images/M/MV5BYWM0MDE3OWMtMzlhZC00YzMyLThiNjItNzFhNGVhYzQ1YWM5XkEyXkFqcGdeQXVyMTczNjQwOTY@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"The plot focuses on the romances of two couples upon the doomed ship's maiden voyage. Isabella Paradine (Catherine Zeta-Jones) is a wealthy woman mourning the loss of her aunt, who reignites a romance with former flame Wynn Park (Peter Gallagher). Meanwhile, a charming ne'er-do-well named Jamie Perse (Mike Doyle) steals a ticket for the ship, and falls for a sweet innocent Irish girl on board. But their romance is threatened by the villainous Simon Doonan (Tim Curry), who has discovered about the ticket and makes Jamie his unwilling accomplice, as well as having sinister plans for the girl.","languages":["English"],"released":"1996-11-17T00:00:00.000Z","rated":"PG-13","awards":{"wins":0,"nominations":9,"text":"Won 1 Primetime Emmy. Another 8 nominations."},"lastupdated":"2015-08-30 00:47:02.163000000","year":1996,"imdb":{"rating":5.9,"votes":3435,"id":115392},"countries":["Canada","USA"],"type":"series","tomatoes":{"viewer":{"rating":3.8,"numReviews":30909,"meter":71},"dvd":"1999-09-07T00:00:00.000Z","production":"Hallmark Entertainment","lastUpdated":"2015-08-15T18:12:51.000Z"},"num_mflix_comments":0},{"_id":"573a139af29313caabcf0d74","fullplot":"84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancè, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.","imdb":{"rating":7.7,"votes":716392,"id":120338},"year":1997,"plot":"A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.","genres":["Drama","Romance"],"rated":"PG-13","metacritic":74,"title":"Titanic","lastupdated":"2015-09-13 00:41:42.117000000","languages":["English","French","German","Swedish","Italian","Russian"],"writers":["James Cameron"],"type":"movie","tomatoes":{"website":"http://www.titanicmovie.com/","viewer":{"rating":3.3,"numReviews":35792304,"meter":69},"dvd":"2012-09-10T00:00:00.000Z","critic":{"rating":8,"numReviews":178,"meter":88},"boxOffice":"$57.9M","consensus":"A mostly unqualified triumph for James Cameron, who offers a dizzying blend of spectacular visuals and old-fashioned melodrama.","rotten":21,"production":"Paramount Pictures","lastUpdated":"2015-09-13T17:05:18.000Z","fresh":157},"poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_SX677_AL_.jpg","num_mflix_comments":128,"released":"1997-12-19T00:00:00.000Z","awards":{"wins":127,"nominations":63,"text":"Won 11 Oscars. Another 116 wins & 63 nominations."},"countries":["USA"],"cast":["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates"],"directors":["James Cameron"],"runtime":194}]
  ```
</details>

### Adding Movies

**Add a new movie** to the database by sending a `POST` request including JSON 
data with your movie's properties:

``` shell
curl -X POST -H "Content-Type: application/json" -d '{"title": "My New Movie"}' http://localhost:5000/movies
```

<details>
  <summary>Example response</summary>
  ```
  → {"acknowledged":true,"insertedId":"62d629d74c642efbc8047d8b"}
  ```
</details>

Note the `'{"title": "My New Movie"}'` JSON object we're passing to the
database. You can populate this object with your own additional properties, like
the writer, director, runtime, countries, etc.:

``` shell
curl -X POST -H "Content-Type: application/json" -d '{"title": "Metropolis", "Director": Fritz Lang", "Writer": "Thea von Harbou"}' http://localhost:5000/movies
```

To be added, your movie **must have a title.**

### Updating Movies

**Update an existing movie** by sending a `PUT` request including the JSON data 
you would like to add to the `/movies` route with the `_id` of your movie 
specified at the end of the URI:

``` shell
curl -X PUT -H "Content-Type: application/json" -d '{"field": "updated value"}' http://localhost:5000/movies/62d3359d0599ca59d923940e
```

<details>
  <summary>Example response</summary>
  ```
  {"acknowledged":true,"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1}
  ```
</details>

### Deleting Movies

To **delete a movie**, send a `DELETE` request with the movie's `_id` appended 
to the `/movies` route:

``` shell
curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
```

{::options parse_block_html="true" /}

<details>
  <summary>Example response</summary>
  <p>
  ```
  {"acknowledged":true,"deletedCount":1}
  ```
  </p>
</details>

{::options parse_block_html="false" /}