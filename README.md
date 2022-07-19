Title: Endpoint Documentation

Description: There are six endpoints created to perford CRUD operations on the MongoDB movies collection. 

Endpoints:
All Movies 
READ curl http://localhost:5001/movies
This allows users to return all movies sorted by title, limited to ten objects at a time, and returned the title and object Id.

Movies with the title Titanic
READ curl http://localhost:5001/movies/titles/Titanic
This returns an array of movie objects with the title of Titanic.

Movies with a specified object Id
READ curl http://localhost:5001/movies/573a1390f29313caabcd4135
This returns a single object with a specified object Id.

Create a new movie object
CREATE curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5001/movies
This creates a new movie object with key values for Id, title, and plot

Update an existing record
UPDATE curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5001/movies/62d732c16a75185f01032f9b
This updates the plot value on an object with a specified Id of a movie object.

Delete an existing record
DELETE curl -X DELETE http://localhost:5001/movies/62d732c16a75185f01032f9b
This deletes the specified Id of a movie object.



