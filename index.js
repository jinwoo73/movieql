import { GraphQLServer } from 'graphql-yoga';
import { getMovies } from './db.js';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Movie {
    id:Int!
    title:String!
    rating:Float!
    summary:String!
    language:String!
    medium_cover_image:String!
  }
  type Query {
    movies(limit: Int,rating: Float): [Movie]!
  }
`

const getById = id => {
  const filteredMovies=movies.filter(movie => movie.id===id
    );
  return filteredMovies[0];
}
const deleteMovie = (id) => {
  const cleanedMovies = movies.filter(movie =>movie.id!==id);
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
}
const addMovie = (name,score) => {
  const newMovie = {
    id: `${movies.length+1}`,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie
}

const resolvers = {
  Query: {
    movies: (_, {rating,limit}) => getMovies(limit,rating),
    
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));