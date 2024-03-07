'use server'

export async function fetchData(ingredients) {

  const API_KEY = '62adf3f691934c71be3d572bcb2071ed';

  const arrayIngredients = ingredients.toLocaleLowerCase().split(/[\s,]+/).join(',+');

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${arrayIngredients}&number=3&apiKey=${API_KEY}`;

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    console.log('There was a problem with the fetch operation: ' + error.message);
  });
}