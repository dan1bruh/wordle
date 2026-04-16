let currentWord = 'APPLE';
let currentRow = 0;
let currentCol = 0;
const container = document.getElementById('grid');

function createGrid() {
    for (let i = 0; i < 6; i++){
        for(let j = 0; j < 5; j++){
            const div = document.createElement('div');
            div.dataset.row = i;
            div.dataset.col = j;
            container.appendChild(div);
        }
    }
}

function checkGuess(guess) {

    /*
    result array will hold the color for each letter in the guess
     * 'gray': incorrect letter,
     * 'yellow': correct letter, wrong position,
     * 'green': correct letter, correct position
    */
    const result = ['gray', 'gray', 'gray', 'gray', 'gray'];
    //split the current word and guess into arrays for easier comparison
    const wordLetters = currentWord.split('');
        //console.log(wordLetters);
    //make a copy of the guess letters to mark used letters    
    const guessLetters = [...guess];
        //console.log(guessLetters);

    //find greens
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === wordLetters[i]) {
            result[i] = 'green';
            wordLetters[i] = null;    //used
            guessLetters[i] = null;   //used
        }
    }

    //find yellows
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] && wordLetters.includes(guessLetters[i])) {
            result[i] = 'yellow';
            wordLetters[wordLetters.indexOf(guessLetters[i])] = null;
        }
    }

    //apply colors
    for (let i = 0; i < 5; i++) {
        const cell = document.querySelector('div[data-row="' + currentRow + '"][data-col="' + i + '"]');
        cell.style.backgroundColor = result[i];
    }
}

createGrid();

document.addEventListener('keydown', (e) => {

    /*
    check if pressed key is letter between a and z,
    make it upper case, add to current cell,
    then move to next column
    */
    if (e.key >= 'a' && e.key <= 'z' && currentCol < 5){
        //console.log(currentCol);

        const cell = document.querySelector('div[data-row="' + currentRow + '"][data-col="' + currentCol + '"]');
        cell.textContent = e.key.toUpperCase();
        currentCol++;
    }
    /*
    check if pressed key is backspace and if it is,
    move back one column and clear cell,
    also check if currecnt column is bigger than 0
    */
    else if (e.key ==='Backspace' && currentCol > 0){
        //console.log(currentCol);
        currentCol--;
        const cell = document.querySelector('div[data-row="' + currentRow + '"][data-col="' + currentCol + '"]');
        cell.textContent = '';
    
    }
    /*
    check if pressed key is enter, if all cols are filled,
    then push the letters in the current row to the guess array,
    check the guess with checkGuess function,
    if guess is not corrent, move to next row and reset column to 0
    */
    else if (e.key === 'Enter' && currentCol === 5){
        const guess = [];
        for (let i = 0; i < 5; i++){
            const cell = document.querySelector('div[data-row="' + currentRow + '"][data-col="' + i + '"]')
            guess.push(cell.textContent)
        }
        
        
        /*
        if the guess is correct,
        it needs to be handled
        */
        checkGuess(guess);
        currentRow++;
        currentCol = 0;
    }
});