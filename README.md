>> Returns the title and year of the first ten items in the database, sorted by ascending title. 
example: curl http://localhost:5000/movies

>> Finds an object from its 24 character alphanumeric id key and returns all key values. 
example: curl http://localhost:5000/movies/573a1394f29313caabcdf639

>> Finds an object from its title key and returns all key values.
example: curl http://localhost:5000/movies/title/Titanic

>> Finds all objects from its title and year keys then returns all key values.
example: curl http://localhost:5000/movies/title/Titanic/year/1953

>> Creates a new object in the database.
example: curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies

>> Updates an object's keys in the database. 
example: curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8

>> Deletes an object in the database.
example: curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd42e8

