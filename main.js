const API_KEY = 'f63c326e-c24b-40bb-a2b2-bbc720a11f5a';
const URL_BASE_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
const URL_BASE_FAVORITE= `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`;

const spanError = document.getElementById('errorCat');
//**Peticion a la api con fetch
// fetch(URL)
//     .then(response => response.json())
//     .then(data => {
//         const img = document.querySelector('.img-cat');
//         img.src = data[0].url;
//         img.with = 400;
//         img.height = 400;
//     });

//**Peticion con Async Await randoms
const getRandomCat = async() => {

    const response = await fetch(URL_BASE_RANDOM);
    const data = await response.json();

    console.log('Randoms')
    console.log(data)

    if( response.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }else{
        const img1 = document.querySelector('.img-cat1');
        const img2 = document.querySelector('.img-cat2');
        const img3 = document.querySelector('.img-cat3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }

    
}

//**Accion para el evento randoms
const reload = () =>{
    getRandomCat();
}

//**Tomar el boton para traer nuevas imagenes
const button = document.querySelector('.reload-cat');

//**Agregar evento
button.addEventListener('click', reload)

reload();


//**Peticion con Async Await favoritos
const getFavoriteCat = async() => {
    const response = await fetch(URL_BASE_FAVORITE);
    const data = await response.json();
    console.log('Favorites')
    console.log(data)

    if( response.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }
}
getFavoriteCat();

//Funcion para guardar en mis favoritos
const saveFavoriteCat = async() =>{
    const res = await fetch(URL_BASE_FAVORITE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'Hsm9oWvH6',
        }),
    });

    console.log('Save')
    console.log(res)

    const data = await res.json();
    if( res.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }

}


