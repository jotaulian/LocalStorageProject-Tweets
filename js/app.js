// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EVENT LISTENERS
eventListeners();
function eventListeners() {
    //When user adds a tweet:
    formulario.addEventListener('submit', agregarTweet);

    //When de document is ready:
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        createHTML();
    })

}


// FUNCTIONS
function agregarTweet(e) {
    e.preventDefault();

    // Textarea where the user writes
    const tweet = document.querySelector('#tweet').value;
    // Validation
    if(tweet === ''){
        showError('Please add some text to the tweet');

        return; //the rest of the code won't be executed
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet //En las ultimas versiones de JS, si llave y valor tienen el mismo nombre se puede dejar solo uno. Y la llave tendra el nombre del valor.
    }

    // Add to the tweets array:
    tweets = [...tweets, tweetObj];

    // Once we added the tweet we must create the HTML:
    createHTML();
    
    // Clear Textarea:
    formulario.reset();
}

// Show error message
function showError(error){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');
    
    // Insert in the content
    const content = document.querySelector('#contenido');
    content.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
        
    }, 3000);

}

// Muestra listado de los tweets
function createHTML(){
    cleanHTML();

    if(tweets.length > 0)
    {
        tweets.forEach( tweet => {
            // Add delete button:
            const deleteBtn = document.createElement('a');
            deleteBtn.classList.add('borrar-tweet');
            deleteBtn.innerText = 'X';
            
            // añadir la función de eliminar:
            deleteBtn.onclick = () => {
                deleteTweet(tweet.id);
            }

            // Create HTML:
            const li = document.createElement('li');
            li.classList.add('letra-lista');
            
            
            // Add text
            li.innerText = tweet.tweet;

            //Assign btn
            li.appendChild(deleteBtn);
            //Insert in HTML
            listaTweets.appendChild(li);
        }); 
    }

    // Sincronize storage:
    sincronizeStorage();
}

// Adds tweets to the local storage:
function sincronizeStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Delete tweet
function deleteTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id); // Brings all the tweets with a different id from the one we're passing.
    createHTML();
}

//Clean HTML
function cleanHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
