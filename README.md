# Week 2 API

### Get All the Movies 

To Return all the movies, this uses the GET method.

Example command use: ` curl http://localhost:5000/movies`

This returns a list of all the movies in the database. Currently this list is limited to 10 entries per page and is sorted in order of title

Status Codes:

200 -> All Okay, returns list of movies limited to 10 entries per page and is sorted in order of title

404 -> Movie database not found

### Get a Movie By ID

To Return a single movie based on a unique ID number, this uses the GET method.

Example command use: ` curl http://localhost:5000/movies/573a139af29313caabcf0d74`

result: `{"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}}% `

to find a movie by a unique ID, type the ID after the `movies/` in the path. For this database, all unique ID numbers are 24 character. If the ID does not match it will retrun an error. 


Status Codes:

200 -> All Okay, returns a single movie that matches the entered unique ID 

404 -> Error, No movie with that ID found

### Get a Movie(s) By Title

To Return a movie or movies based on title, this uses the GET method.

Example command use: ` curl http://localhost:5000/movies/titles/zoot%20suit`

Result: `[{"_id":"573a1397f29313caabce821b","plot":"A kind of musical accompanying the story of the early 1940's and the effect that the \"zoot suit\" (a man's suit of long jacket and pegged pants, always worn with a long keychain that looped ...","genres":["Drama","Musical"],"runtime":103,"rated":"R","cast":["Daniel Valdez","Edward James Olmos","Charles Aidman","Tyne Daly"],"poster":"https://m.media-amazon.com/images/M/MV5BMGY3OTMzNTgtMDNhNC00OGM4LTliZTUtZWZkYWI3ODIxMDZlXkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SY1000_SX677_AL_.jpg","title":"Zoot Suit","fullplot":"A kind of musical accompanying the story of the early 1940's and the effect that the \"zoot suit\" (a man's suit of long jacket and pegged pants, always worn with a long keychain that looped almost to the ankle.... the rebellious fashion of young men) had on the morals and attitudes of the people of that era.","languages":["English"],"released":"1982-01-01T00:00:00.000Z","directors":["Luis Valdez"],"writers":["Luis Valdez (play)"],"awards":{"wins":2,"nominations":0,"text":"Nominated for 1 Golden Globe. Another 1 win."},"lastupdated":"2015-07-31 00:03:02.097000000","year":1981,"imdb":{"rating":6.7,"votes":788,"id":83365},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.8,"numReviews":1166,"meter":75},"dvd":"2003-05-27T00:00:00.000Z","production":"MCA Universal Home Video","lastUpdated":"2015-08-17T18:28:10.000Z"},"num_mflix_comments":0}]`

to find a movie or movies by a title query, type the title after the `movies/` in the path. For this database, the title is not case sensitive. 

If the title contains any spaces, ensure to use `%20` in lieu of a space (such as the example above)

If there are multiple matches for the title given, the results will return mutiple entries.


Status Codes:

200 -> All Okay, returns movie or movies that match the title given 

404 -> Error, No movie with that title found

### Create a New Movie Entry 


To create a new movie in the database, this uses the POST method.

Example command use: ` curl -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5000/movies`

result: `{"message":"Success! Item with a new ID of: 62d5e449068bda8b86c95126 has been created"}`

Using the command, insert your new title in the `"NEW TITLE"` part of the command. This will add your new movie to the database and will generate a sequentially new unique ID# for your new entry


Status Codes:

201 -> All Okay, your movie has been created

400 -> Error, movie cannot be created 


### Update an Existing Movie Entry 


To update an existing movie in the database, this uses the POST method.

Example command use: ` curl -X PUT -H "Content-Type: application/json" -d '{"TomatometerScore":"yourValue%"}' http://localhost:5000/movies/573a139af29313caabcf0d74`

result: `Success! Movie with the ID# of 573a139af29313caabcf0d74 now has an Updated field`

This command will add a Rotten Tomatoes TomatometerScore entry to an existing movie. Insert the score you'd like to assign in the `yourValue%` part of the command. In addition be sure to include the unique ID of the movie you are trying to uodate at the end of the command after the `movies/` part of the path.

 This will add your new value to the movie in database.


Status Codes:

201 -> All Okay, your movie has been updated

400 -> Error, movie cannot be updated


### Delete an Existing Movie Entry 


To delete an existing movie in the database, this uses the DELETE method.

Example command use: `curl -X DELETE http://localhost:5000/movies/573a139af29313caabcf0d74`

result: `Success! Movie with the ID# of 573a139af29313caabcf0d74 has been deleted`

This command will delete a movie based on the unique ID you pass, type the ID after the `movies/` in the path. For this database, all unique ID numbers are 24 character. If the ID does not match it will retrun an error. 


 This will delete the movie with the matching ID from the database.


Status Codes:

201 -> All Okay, your movie has been deleted

400 -> Error, movie cannot be deleted