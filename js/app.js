// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners
eventListeners();
function eventListeners() {
formulario.addEventListener('submit', agregarTweet);
}








// Functions
function agregarTweet(e) {
    e.preventDefault();

    // Textarea where the user writes
    const tweet = document.querySelector('#tweet').value;
    // Validation
    if(tweet === ''){
        showError('Please add some text to the tweet');

        return; //the rest of the code won't be executed
    }
    addTweet(tweet);
}

// Show error message
function showError(error){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');
    
    // Insertart in the content
    const content = document.querySelector('#contenido');
    content.appendChild(errorMessage);

}

// Agregar tweet a la lista
function addTweet(tweet){
    const tweetParaAgregar = document.createElement('p');
    tweetParaAgregar.textContent = tweet;
    listaTweets.appendChild(tweetParaAgregar);
}