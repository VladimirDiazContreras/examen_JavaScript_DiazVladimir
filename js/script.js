const API_URL = 'https://68344d38464b499636022d47.mockapi.io/food';

const carrusel = document.getElementById('carrusel');
const detalle = document.getElementById('detalle');
const info = document.getElementById('info');
const volver = document.getElementById('volver');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    carrusel.innerHTML = ''; // limpia
    data.forEach(food => {
      const img = document.createElement('img');
      img.src = food.strMealThumb;
      img.alt = food.strMeal;
      img.addEventListener('click', () => mostrarDetalle(food));
      carrusel.appendChild(img);
    });
  });

function mostrarDetalle(food) {
  document.querySelector('.carrusel-wrapper').classList.add('hidden');
  detalle.classList.remove('hidden');

  info.innerHTML = `
    <h2>${food.strMeal}</h2>
    <img src="${food.strMealThumb}" alt="${food.strMeal}" style="height:200px;border-radius:10px;" />
    <p><strong>receata:</strong> ${food.strInstructions}</p>
    <iframe width="420" height="315"src="${food.strYoutube}"></iframe>
    <p><strong>categoria:</strong> ${food.strCategory}</p>
    ${isFavorite(food.strMeal) ? '💖' : '🤍'}
        </button>
  `;
}


volver.addEventListener('click', () => {
  detalle.classList.add('hidden');
  document.querySelector('.carrusel-wrapper').classList.remove('hidden');
});

// Flechas
document.getElementById('prev').addEventListener('click', () => {
  carrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next').addEventListener('click', () => {
  carrusel.scrollBy({ left: 300, behavior: 'smooth' });
});
//favoritos 
function getFavorites() {
  return JSON.parse(localStorage.getItem('Favorite') || '[]');
}

function isFavorite(strMeal) {
  return getFavorites().some(food => food.strMeal === strMeal);
}

function toggleFavorite(strMealThumb, strMeal) {
  const favorites = getFavorites();
  const index = favorites.findIndex(food => food.strMeal === strMeal);

  if (index > -1) {
    favorites.splice(index, 1);
    alert(`Quitado de favoritos: ${strMeal}`);
  } else {
    favorites.push({ strMealThumb, strMeal});
    alert(`Agregado a favoritos: ${strMeal}`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  fetchInitialPets();
  renderFavoriteList();
}
// reder

function renderFavoriteList() {
  const favorites = getFavorites();
  favoriteList.innerHTML = '';

  if (favorites.length === 0) {
    favoriteList.innerHTML = '<p>No tienes favoritos aún.</p>';
    return;
  }

  favorites.forEach(pet => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${pet.photoUrl}" alt="${pet.name}" />
      <div class="card-body">
        <h3>${pet.name}</h3>
        <p>${pet.type}</p>
        <p>age: ${pet.age}</p>
        <button class="favorite-btn" onclick="toggleFavorite(
          ${pet.id},
          '${pet.name.replace(/'/g, "\\'")}',
          '${pet.type}',
          '${pet.photoUrl}',
          '${pet.age}'
        )">❌ Quitar</button>
      </div>
    `;
    favoriteList.appendChild(div);
  });
}

