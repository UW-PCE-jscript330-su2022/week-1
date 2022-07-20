----------------------------------------------------
TITLE:  Movies API
-----------------------------------------------------
DESCRIPTION OF PROJECT

This API uses different endpoints to manage data found in the sample_mflix.movies database collection provided by MongoDB.  Six endpoints have been created to allow a user to  create, read, update or delete data.  These endpoints are described below.  Each endpoint returns all data for the selected objects including:

-----------------------------------------------------
TECHNOLOGIES USED
-----------------------------------------------------
The following technologies were used in this project:
-  Node.js
-  NPM
-  Express
-  Mongo DB
-----------------------------------------------------
ENDPOINTS
-----------------------------------------------------
READ - Three endpoints have been created to allow a user to read data from the database colletion:

find all movies
Example request:  curl -sS http://localhost:5001/movies
Parameters:  limits data returned to 10 objects, returns id, title and lastupdated key:values
Example results:  [
            [{
                "_id": "62ce40c1462229267a4ddac2",
                "title": "NEW TITLE"
            }, {
                "_id": "573a13bcf29313caabd57d52",
                "title": "Jimmy Rosenberg: The Father, the Son & the Talent",
                "lastupdated": "2013-12-22 00:00:00"
                }
            ]


find all movies with the title Titanic
Example request: curl -sS http://localhost:5001/movies/titles/Titanic
Parameters: title equals Titanic
Example results:
            [{
                "_id": "573a1394f29313caabcdf639",
                "plot": "An unhappy married couple deal with their problems on board the ill-fated ship.",
                "genres": ["Drama", "History", "Romance"],
                "runtime": 98,
                "rated": "NOT RATED",
                "cast": ["Clifton Webb", "Barbara Stanwyck", "Robert Wagner", "Audrey Dalton"],
                "num_mflix_comments": 0,
                "poster": "https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SY1000_SX677_AL_.jpg",
                "title": "Titanic",
                "fullplot": "Unhappily married and uncomfortable with life among the British upper crust, Julia Sturges takes her two children and boards the Titanic for America. Her husband Richard also arranges passage on the doomed luxury liner in order to let him have custody of their two children. Their problems soon seem minor when the ship hits an iceberg.",
                "languages": ["English", "Basque", "French", "Spanish"],
                "released": "1953-07-13T00:00:00.000Z",
                "directors": ["Jean Negulesco"],
                "writers": ["Charles Brackett", "Walter Reisch", "Richard L. Breen"],
                "awards": {
                    "wins": 0,
                    "nominations": 3,
                    "text": "Won 1 Oscar. Another 2 nominations."
                },
                "lastupdated": "2015-09-16 00:00:16.593000000",
                "year": 1953,
                "imdb": {
                    "rating": 7.3,
                    "votes": 4677,
                    "id": 46435
                },
                "countries": ["USA"],
                "type": "movie",
                "tomatoes": {
                    "viewer": {
                        "rating": 3.6,
                        "numReviews": 86400,
                        "meter": 65
                    },
                    "dvd": "2003-09-02T00:00:00.000Z",
                    "critic": {
                        "rating": 6.7,
                        "numReviews": 9,
                        "meter": 89
                    },
                    "lastUpdated": "2015-09-10T19:15:34.000Z",
                    "rotten": 1,
                    "production": "20th Century Fox",
                    "fresh": 8
                }
            }]


find a single move with a specified id
Example request: curl -sS http://localhost:5001/movies/573a13bcf29313caabd57d52
Parameters: Object id equals specified value
Example results:
            ["Documentary", "Music"], 
            "runtime": 78, 
            "cast": ["Jimmy Rosenberg"], 
            "num_mflix_comments": 0, 
            "title": "Jimmy Rosenberg: The Father, the Son & the Talent", 
            "lastupdated": "2013-12-22 00:00:00", 
            "languages": ["English", "Dutch"], 
            "released": "2008-02-18T00:00:00.000Z", 
            "directors": ["Jeroen Berkvens"], 
            "writers": ["Jeroen Berkvens"], 
            "awards": {
                "wins": 2,
                    "nominations": 0,
                        "text": "2 wins."
            }, "year": 2006, "imdb": {
                "rating": 7.6,
                    "votes": 87,
                        "id": 986358
            }, "type": "movie", "tomatoes": {
                "viewer": {
                    "rating": 2.5,
                        "numReviews": 21
                }
            ]

-------------------------------------------------------

CREATE
Example request: curl -sS -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5001/movies
Parameters: None
Result:  New movie object is created with an Object ID and Title 
Example results:
    Success:  message 'Item created! ID: 62d74200cdd5050f3815e366' returned to the user
    Failure:  message  'error: Object not created' returned to the user

UPDATE
Example request: 
curl -sS -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5001/movies/62d74200cdd5050f3815e366
Parameters:  Object ID
Result:  Plot value is updated for the specified Object ID
Example results:
    Success: message '62d74200cdd5050f3815e366 has been updated.'
    Failure:  message 'ERROR - the object was not updated' returned to the user

    
DELETE
Example request: curl -sS -X DELETE http://localhost:5001/movies/62d74200cdd5050f3815e366
Parameters: Object ID
Result:  Selected Object ID is deleted from the collection.
Example results:
    Success:  message '62d74200cdd5050f3815e366 was deleted.' returned to user
    Failure:  message: "ERROR - the object was not deleted" returned to user