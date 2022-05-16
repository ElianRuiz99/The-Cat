const API_KEY = 'f63c326e-c24b-40bb-a2b2-bbc720a11f5a';
const URL_BASE_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
const URL_BASE_FAVORITE= `https://api.thecatapi.com/v1/favourites?limit=10&api_key=${API_KEY}`;
const URL_BASE_DELETE= (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

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
        const btn1 = document.getElementById('btn1');

        const img2 = document.querySelector('.img-cat2');
        const btn2 = document.getElementById('btn2');

        const img3 = document.querySelector('.img-cat3');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        btn1.onclick = () => saveFavoriteCat(data[0].id);

        img2.src = data[1].url;
        btn2.onclick = () => saveFavoriteCat(data[1].id);

        img3.src = data[2].url;
        btn3.onclick = () => saveFavoriteCat(data[2].id);

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


//**Peticion con Async Await traer favoritos
const getFavoriteCat = async() => {
    const response = await fetch(URL_BASE_FAVORITE);
    const data = await response.json();
    console.log('Favorites')
    console.log(data)

    if( response.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }else{
        data.forEach(element => {
            const section = document.querySelector('.container-favorite-cats');

            const divContainer = document.createElement('div');
            divContainer.className = 'container-img';
            
            const img = document.createElement('img');
            img.className = 'img-favorite';
            img.src = element.image.url;

            const btn = document.createElement('button');
            btn.className = 'secondary-button';
            btn.onclick = () => deleteFavoriteCat(element.id);

            const btnText = document.createTextNode('Out cat in favorite');

            //Agregar el texto al boton
            btn.appendChild(btnText);

            //Agregar imagen y boton al contenedor;
            divContainer.appendChild(img);
            divContainer.appendChild(btn);

            //Agregar contenedor a la seccion
            section.appendChild(divContainer);
            
        });
    }
}
getFavoriteCat();

//Funcion para guardar en mis favoritos
const saveFavoriteCat = async(id) =>{
    const res = await fetch(URL_BASE_FAVORITE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });

    const data = await res.json();

    console.log('Save')
    console.log(res)

    if( res.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }else{
        console.log('Cat Was Saved in Favorites');
    }
}

//funcion para eliminar de favoritos
const deleteFavoriteCat = async(id) =>{
    const res = await fetch( URL_BASE_DELETE(id) , {
        method: 'DELETE',
    });

    if( res.status != 200){
        spanError.innerHTML = `Hubo un Error:  ${data.status} ${data.message}`;
    }else{
        console.log('Cat Was deleted from Favorites')
    }
} 


