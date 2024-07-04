const url = 'https://hp-api.onrender.com/api/characters';
const container = document.getElementById('personajes');
const select = document.getElementById('filtrar');
const filterInput = document.getElementById('searchbar');
const btnFilter = document.getElementById('btnFilter');
const btnReset = document.getElementById('btnReset');

fetch(url)
  .then(response => response.json())
  .then(data => {
    const filtrarHouse = data.reduce((housePersonaje, personaje) => {
      if (!housePersonaje.includes(personaje.house)) {
        housePersonaje.push(personaje.house);
      }
      return housePersonaje;
    }, []);

    filtrarHouse.forEach(house => {
      const option = document.createElement('option');
      option.value = house;
      option.innerText = house;
      select.appendChild(option);
    });

    const showCard = (SelectOptionCheck, filterText) => {
      container.innerHTML = '';
      data.forEach(personaje => {
        const houseMatches = !SelectOptionCheck || personaje.house === SelectOptionCheck;
        const nameMatches = personaje.name.toLowerCase().includes(filterText.toLowerCase());

        if (houseMatches && nameMatches) {
          const card = document.createElement('div');
          card.classList.add('card');

          const img = document.createElement('img');
          img.src = personaje.image || 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';
          img.alt = personaje.name;

          const name = document.createElement('span');
          name.innerText = personaje.name;

          const genero = document.createElement('p');
          genero.innerText = personaje.gender;

          const house = document.createElement('p');
          house.innerText = personaje.house;

          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(genero);
          card.appendChild(house);

          container.appendChild(card);
        }
      });
    };

    showCard('', '');

    select.addEventListener('change', () => {
      const SelectOptionCheck = select.value;
      const filterText = filterInput.value;
      showCard(SelectOptionCheck, filterText);
    });

    btnFilter.addEventListener('click', () => {
      const SelectOptionCheck = select.value;
      const filterText = filterInput.value;
      showCard(SelectOptionCheck, filterText);
    });

    btnReset.addEventListener('click', () => {
        select.value = '';
        filterInput.value = '';
        showCard('', '');
      });
  })
  .catch(error => {
    console.error('error:', error);
  });
