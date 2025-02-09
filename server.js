const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3001);
app.locals.favoriteMovies = [];

app.get('/api/v1/favorite-movies', (request, response) => {
  const faves = app.locals.favoriteMovies;
  response.json({ faves });
});

app.get('/api/v1/favorite-movies/:id', (request, response) => {
  const id = request.params.id;
  const foundFave = app.locals.favoriteMovies.find(movie => movie.id === Number(id));

  response.status(200).json(foundFave);
});

app.post('/api/v1/favorite-movies', (request, response) => {
  const fave = request.body;

  if (!fave.id) {
    response
      .status(422)
      .send({ error: `Id is required.` });
  }

  !app.locals.favoriteMovies.includes(fave.id) && app.locals.favoriteMovies.push(fave.id);
  response.status(201).json({ id: fave.id });
});

app.delete('/api/v1/favorite-movies/:id', (request, response) => {
  const id = request.params.id;
  const foundFave = app.locals.favoriteMovies.find(movie => movie.id === Number(id));
  const index = app.locals.favoriteMovies.indexOf(foundFave);

  app.locals.favoriteMovies.splice(index, 1);
  response.status(201).json({ id: id });

});

app.listen(app.get('port'), () => {
  console.log(`Box Office Deetz API is running on http://localhost:${app.get('port')}.`);
});