# Week 2

## Getting Started
- Start the server:

> npm install 
>  node index.js

## API Documentation

### 1. GET All Movies
- Http Method : GET
- Path : /movies
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | Movies Array | Returns top 10 records sorted by year in descending order    |
| 500 Server Error | N/A | Any server error  |

- Example:
	- `curl -X GET http://localhost:5000/movies` 

### 2. GET Movie By Title
- Http Method : GET
- Path : /movies/:title
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | Movies Array | Returns Movies with the Input Title   |
| 404 Not Found | N/A | No Movie records found with the Input title    
| 500 Server Error | N/A | Any server error  |

- Example:
	- `curl -X GET http://localhost:5000/movies/Titanic` 

### 3. SEARCH Movie By Title & Year
- Http Method : GET
- Path : /movies/search?title=&year=
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | Movies Array | Returns Movies with the Input Title and Year   |
| 400 Bad Request | N/A | Invalid or Missing Title and Year   |
| 404 Not Found | N/A | No Movie records found with the Input title and year  |    
| 500 Server Error | N/A | Any server error  |

- Example:
	- `curl -X GET http://localhost:5000/movies/search?title=Titanic&year=1953` 

### 3. Create Movie
- Http Method : POST
- Path : /movies
- Request Body: Movie Object
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | new movie id | Creates new record in Mongodb database   |
| 400 Bad Request | N/A | Invalid Request Body  |
| 500 Server Error | N/A | Any Server Error  |

- Example:
	-  `curl -X POST http://localhost:5000/movies -H "Content-Type: application/json" -d "{\"title\": \"mymovie4\", \"year\" : \"1988\"}"`

### 4. Edit Movie by Id
- Http Method : PUT
- Path : /movies/:id
- Request Body: Movie Object
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | acknowledged=true | Edit existing record or Creates new record if the record doesnt exist in the DB  |
| 400 Bad Request | N/A | Invalid Request Body  |
| 500 Server Error | N/A | Any Server Error  |

- Example:
	-  `curl -X PUT http://localhost:5000/movies/62d4f3f3caaa9303e08efb2b -H "Content-Type: application/json" -d "{\"title\": \"mymovie4\", \"year\" : \"1989\"}"`

### 4. Delete Movie by Id
- Http Method : DELETE
- Path : /movies/:id
- Response:
	
|Status Code | Response Body  | Description |
|--|--|--|
| 200 OK | acknowledged=true | Deletes the record in DB  |
| 500 Server Error | N/A | Any Server Error  |

- Example:
	-  `curl -X DELETE http://localhost:5000/movies/62d4f3f3caaa9303e08efb2b`