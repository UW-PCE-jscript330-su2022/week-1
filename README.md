# Week 2 Assignment

Week-2 assignment focuses on MongoDB and how to use JavaScript with Express API to get, insert, update, delete data from/to MongoDB. The sample data is movies from "sample_mflix" in MongoDB Atlas.

## There are some new features in this exercise:

1. Adding sort functionality to the "getAll" function in "movies.js" in folder "dataInterface". It sorts by "title" from A to Z. 
  Code review: movies.js ("dataInterface" folder) line 46

2. Adding a “getByTitle” endpoint that returns all movies with the given title.
  Code review: 
    * "getByTitle" function in "movies.js" ("dataInterface" folder) - from line 27 to line 38
    * "router.get('/titles/:title',...)" function in "movies.js" ("routes" folder) - from line 37 to 58 

3. Adding an "errorHandler" function for error checking to all movie endpoints (route handlers and data interface methods). 
  This function is "errorHandler.js" in "middleware" folder.

4. Adding a movie search endpoint that accepts query params for "title" and "year", and returns all movies that match.
  Code review:
    - "getByTitleAndYear" function in "movies.js" ("dataInterface" folder) - from line 13 to 24
    - "router.get("/:title/:year",...)" function in "movies.js" ("routes" folder) - from line 62 to 83

## Caution: please replace "<your mongo URI>" with your own URI in "movies.js" (in "dataInterface" folder) line #4
const uri = "<your mongo URI>";

## then run the command below:
npm start


## Test commands and results:
1. Get all movies from "movies" collection in "sample_mflix" database (just show the movie's id & title and limited 10 records):
$ curl http://localhost:5000/movies

** Result:

[{"_id":"62d479f63da4de787dc512bd","title":null},{"_id":"62d48d3daaf6ff79ab0b0523","title":""},{"_id":"62d47a3e3da4de787dc512be","title":""},{"_id":"62d4746c26ceb2ad495ade6d","title":""},{"_id":"62d47ffbc3d35ac62b2dced6","title":""},{"_id":"573a13cef29313caabd86ecc","title":"!Women Art Revolution"},{"_id":"573a13e6f29313caabdc56c7","title":"#chicagoGirl: The Social Network Takes on a Dictator"},{"_id":"573a1396f29313caabce48c4","title":"$"},{"_id":"573a13b8f29313caabd4bd33","title":"$9.99"},{"_id":"573a13d9f29313caabda9ffb","title":"$ellebrity"}]

2.1 Get a certain movie by id, e.g: "573a1390f29313caabcd4135":
$ curl http://localhost:5000/movies/573a1390f29313caabcd4135

** Result:

{"_id":"573a1390f29313caabcd4135","plot":"Three men hammer on an anvil and pass a bottle of beer around.","genres":["Short"],"runtime":1,"cast":["Charles Kayser","John Ott"],"num_mflix_comments":0,"title":"Blacksmith Scene","fullplot":"A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.","countries":["USA"],"released":"1893-05-09T00:00:00.000Z","directors":["William K.L. Dickson"],"rated":"UNRATED","awards":{"wins":1,"nominations":0,"text":"1 win."},"lastupdated":"2015-08-26 00:03:50.133000000","year":1893,"imdb":{"rating":6.2,"votes":1189,"id":5},"type":"movie","tomatoes":{"viewer":{"rating":3,"numReviews":184,"meter":32},"lastUpdated":"2015-06-28T18:34:09.000Z"}}

2.2 Get a certain movie by id, e.g: "testid":
$ curl http://localhost:5000/movies/testid

** Result:

{"Msg":"No movie found with id: testid"}

3.1 Get movies by title "Titanic":
$ curl http://localhost:5000/movies/titles/Titanic

** Result:

[{"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}},{"_id":"573a139af29313caabcefb1d","plot":"The story of the 1912 sinking of 
the largest luxury liner ever built, the tragedy that befell over two thousand of the rich and famous as well as of the poor and unknown passengers aboard the doomed ship.","genres":["Action","Drama","History"],"runtime":173,"cast":["Peter Gallagher","George C. Scott","Catherine Zeta-Jones","Eva Marie Saint"],"poster":"https://m.media-amazon.com/images/M/MV5BYWM0MDE3OWMtMzlhZC00YzMyLThiNjItNzFhNGVhYzQ1YWM5XkEyXkFqcGdeQXVyMTczNjQwOTY@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"The plot focuses on the romances of two couples upon the doomed ship's maiden voyage. Isabella Paradine (Catherine Zeta-Jones) is a wealthy woman mourning the loss of her aunt, who reignites a romance with former flame Wynn Park (Peter Gallagher). Meanwhile, a 
charming ne'er-do-well named Jamie Perse (Mike Doyle) steals a ticket for the ship, and falls for a sweet innocent Irish girl on board. But their romance is threatened by the villainous Simon Doonan (Tim Curry), who has discovered about the ticket and makes Jamie his unwilling accomplice, as well as having sinister plans for the girl.","languages":["English"],"released":"1996-11-17T00:00:00.000Z","rated":"PG-13","awards":{"wins":0,"nominations":9,"text":"Won 1 Primetime Emmy. Another 8 nominations."},"lastupdated":"2015-08-30 00:47:02.163000000","year":1996,"imdb":{"rating":5.9,"votes":3435,"id":115392},"countries":["Canada","USA"],"type":"series","tomatoes":{"viewer":{"rating":3.8,"numReviews":30909,"meter":71},"dvd":"1999-09-07T00:00:00.000Z","production":"Hallmark Entertainment","lastUpdated":"2015-08-15T18:12:51.000Z"},"num_mflix_comments":0},{"_id":"573a139af29313caabcf0d74","fullplot":"84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancè, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.","imdb":{"rating":7.7,"votes":716392,"id":120338},"year":1997,"plot":"A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.","genres":["Drama","Romance"],"rated":"PG-13","metacritic":74,"title":"Titanic","lastupdated":"2015-09-13 00:41:42.117000000","languages":["English","French","German","Swedish","Italian","Russian"],"writers":["James Cameron"],"type":"movie","tomatoes":{"website":"http://www.titanicmovie.com/","viewer":{"rating":3.3,"numReviews":35792304,"meter":69},"dvd":"2012-09-10T00:00:00.000Z","critic":{"rating":8,"numReviews":178,"meter":88},"boxOffice":"$57.9M","consensus":"A mostly unqualified triumph for James Cameron, who offers a dizzying blend of spectacular visuals and old-fashioned melodrama.","rotten":21,"production":"Paramount Pictures","lastUpdated":"2015-09-13T17:05:18.000Z","fresh":157},"poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_SX677_AL_.jpg","num_mflix_comments":128,"released":"1997-12-19T00:00:00.000Z","awards":{"wins":127,"nominations":63,"text":"Won 11 Oscars. Another 116 wins & 63 nominations."},"countries":["USA"],"cast":["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates"],"directors":["James Cameron"],"runtime":194}]

3.2 Get movies by title "Back To The Future":
$ curl http://localhost:5000/movies/titles/Back%20To%20The%20Future

** Result:

{"Msg":"No movie found with the title: Back To The Future"}

4.1 Get movies by title "Titanic" and year "1997":
$ curl http://localhost:5000/movies/Titanic/1997

** Result:

[{"_id":"573a139af29313caabcf0d74","fullplot":"84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancè, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.","imdb":{"rating":7.7,"votes":716392,"id":120338},"year":1997,"plot":"A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated 
R.M.S. Titanic.","genres":["Drama","Romance"],"rated":"PG-13","metacritic":74,"title":"Titanic","lastupdated":"2015-09-13 00:41:42.117000000","languages":["English","French","German","Swedish","Italian","Russian"],"writers":["James Cameron"],"type":"movie","tomatoes":{"website":"http://www.titanicmovie.com/","viewer":{"rating":3.3,"numReviews":35792304,"meter":69},"dvd":"2012-09-10T00:00:00.000Z","critic":{"rating":8,"numReviews":178,"meter":88},"boxOffice":"$57.9M","consensus":"A mostly unqualified triumph for James Cameron, who offers a dizzying blend of spectacular visuals and old-fashioned melodrama.","rotten":21,"production":"Paramount Pictures","lastUpdated":"2015-09-13T17:05:18.000Z","fresh":157},"poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_SX677_AL_.jpg","num_mflix_comments":128,"released":"1997-12-19T00:00:00.000Z","awards":{"wins":127,"nominations":63,"text":"Won 11 Oscars. Another 116 wins & 63 nominations."},"countries":["USA"],"cast":["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates"],"directors":["James Cameron"],"runtime":194}]

4.2 Get movies by title "Titanic" and year "2000":
$ curl http://localhost:5000/movies/Titanic/2000

** Result:

{"Msg":"No movie found with the title: Titanic and the year: 2000"}

5.1 Insert a new movie to "movies" collection with "title" is "Llamas From Space" and "plot" is "Aliens...":
$ curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies

** Result:

{"newObjectId":"62d4de298f691ec756722025","message":"Item created! ID: 62d4de298f691ec756722025"}

5.2 If the movie's info is invalid (e.g empty body):
$ curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:5000/movies

** Result:

{"Msg":"Please provide a valid movie info."}

6.1 Update a movie info by id: "62d4de298f691ec756722025" - Change the "plot" from "Aliens..." to "Sharks...":
$ curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/62d4de298f691ec756722025

** Result:

{"message":"UPDATED 1 movies"}

6.2 Check the update of this movie with id "62d4de298f691ec756722025":
$ curl http://localhost:5000/movies/62d4de298f691ec756722025

** Result:

{"_id":"62d4de298f691ec756722025","title":null,"plot":"Sharks..."}

6.3 If the given id is invalid, ex: "testid":
$ curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/testid

** Result:

{"error":"No movie found with id: testid"}

7.1 Delete a movie by id: "62d4de298f691ec756722025":
$ curl -X DELETE http://localhost:5000/movies/62d4de298f691ec756722025

** Result:

{"message":"DELETED 1 movies"}

7.2 If the id is not found:
$ curl -X DELETE http://localhost:5000/movies/62d4de298f691ec756722025

** Result:

{"error":"No movie found with id: 62d4de298f691ec756722025"}
