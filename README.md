getAll()
> Returns the title and year of the first ten items in the database, sorted by ascending title. 
> 
>> example: curl http://localhost:5000/movies

getById()
> Finds an object and returns all key values. 
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl http://localhost:5000/movies/573a1394f29313caabcdf639

getByTitle()
> Finds an object and returns all key values.
> Accepts a title key (String) as an argument.
> Returns 404 error if title is not found or title is invalid
>> example: curl http://localhost:5000/movies/title/Titanic

getByTitleAndYear()
> Finds all objects and returns all key values.
> Accepts title and year keys (String, Int) as arguments.
> Returns 404 error if title is not found or title is invalid
>> example: curl http://localhost:5000/movies/title/Titanic/year/1953

create()
> Creates a new object in the database.
> Returns 500 error if document cannot be created
>> example: curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies

updateById()
> Updates an object's keys in the database. 
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8

deleteById()
> Deletes an object in the database.
> Accepts a 24 character alphanumeric id key (String) as an argument. 
> Returns 404 error if id is not found or id is invalid
>> example: curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd42e8

