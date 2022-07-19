getAll()
> Returns the title and year of the first ten items in the database, sorted by ascending title. 
> 
>> example: curl http://localhost:5000/movies
>> response: [{"_id":"573a13cef29313caabd86ecc","title":"!Women Art Revolution","year":2010},{"_id":"573a13e6f29313caabdc56c7","title":"#chicagoGirl: The Social Network Takes on a Dictator","year":2013},{"_id":"573a1396f29313caabce48c4","title":"$","year":1971},{"_id":"573a13b8f29313caabd4bd33","year":2008,"title":"$9.99"},{"_id":"573a13d9f29313caabda9ffb","title":"$ellebrity","year":2012},{"_id":"573a13dff29313caabdb9439","year":2014,"title":"'71"},{"_id":"573a1396f29313caabce4485","title":"'Doc'","year":1971},{"_id":"573a1398f29313caabce99ac","title":"'Master Harold'... and the Boys","year":1985},{"_id":"573a1393f29313caabcdc5dc","title":"'Pimpernel' Smith","year":1941},{"_id":"573a13a1f29313caabd07b8a","year":2001,"title":"'R Xmas"}]

getById()
> Finds an object and returns all key values. 
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl http://localhost:5000/movies/573a1394f29313caabcdf639
>> response: {"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}}

getByTitle()
> Finds an object and returns all key values.
> Accepts a title key (String) as an argument.
> Returns 404 error if title is not found or title is invalid
>> example: curl http://localhost:5000/movies/title/Titanic
>> response: {"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}}

getByTitleAndYear()
> Finds all objects and returns all key values.
> Accepts title and year keys (String, Int) as arguments.
> Returns 404 error if title is not found or title is invalid
>> example: curl http://localhost:5000/movies/title/Titanic/year/1953
>> response: {"_id":"573a1394f29313caabcdf639","plot":"An unhappy married couple deal with their problems on board the ill-fated ship.","genres":["Drama","History","Romance"],"runtime":98,"rated":"NOT RATED","cast":["Clifton Webb","Barbara Stanwyck","Robert Wagner","Audrey Dalton"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg","title":"Titanic","fullplot":"Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.","languages":["English","Basque","French","Spanish"],"released":"1953-07-13T00:00:00.000Z","directors":["Jean Negulesco"],"writers":["Charles Brackett","Walter Reisch","Richard L. Breen"],"awards":{"wins":0,"nominations":3,"text":"Won 1 Oscar. Another 2 nominations."},"lastupdated":"2015-09-16 00:00:16.593000000","year":1953,"imdb":{"rating":7.3,"votes":4677,"id":46435},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.6,"numReviews":86400,"meter":65},"dvd":"2003-09-02T00:00:00.000Z","critic":{"rating":6.7,"numReviews":9,"meter":89},"lastUpdated":"2015-09-10T19:15:34.000Z","rotten":1,"production":"20th Century Fox","fresh":8}}

create()
> Creates a new object in the database.
> Returns 500 error if document cannot be created
>> example: curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
>> response: {"newObjectId":"62d62e880056426645f1f8fa","message":"Item created! ID: 62d62e880056426645f1f8fa"}

updateById()
> Updates an object's keys in the database. 
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/62d62e880056426645f1f8fa
>> response: {"message":"UPDATED 1 movies"}

deleteById()
> Deletes an object in the database.
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl -X DELETE http://localhost:5000/movies/62d62e880056426645f1f8fa
>> response: {"message":"DELETED 1 movies"}
