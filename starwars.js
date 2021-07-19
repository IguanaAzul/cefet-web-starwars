const star_wars_api = 'https://swapi.dev/api'

import {play} from './music.js';
import {restartAnimation} from './restart-animation.js';
import {friendlyFetch} from './friendly-fetch.js';

let star_wars_music = {
    audioUrl: './audio/tema-sw.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Main Theme',
    artist: 'John Williams'
}

play(star_wars_music, document.body);

let to_roman = {
    1: 'I  ',
    2: 'II ',
    3: 'III',
    4: 'IV ',
    5: 'V  ',
    6: 'VI '
}

let movies_list = document.querySelector('#filmes ul');
for (let movie of ((await friendlyFetch(star_wars_api + '/films')).results).sort((i, j) => (i.episode_id > j.episode_id) ? 1 : -1)) {
    let movie_element = document.createElement('li');
    movie_element.innerHTML = `EPISODE ${to_roman[movie.episode_id]} - ${movie.title.toUpperCase()}`;
    movie_element.addEventListener('click', event => {
        let introduction = document.querySelector('pre.introducao');
        introduction.innerHTML = `Episode ${to_roman[movie.episode_id].trim()}\n${movie.title.toUpperCase()}\n${movie.opening_crawl}`;
        restartAnimation(introduction);
    });
    movies_list.appendChild(movie_element);
}