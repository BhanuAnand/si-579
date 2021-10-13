const wordInput = document.querySelector('#problem-5 #rhyme-with-input');
const showRhymesButton = document.querySelector('#problem-5 #show-rhymes-button');
const clearButton = document.querySelector('#problem-5 #clear-rhymes-button');
const rhymesOutput = document.querySelector('#problem-5 #rhymes');

function getRhymes(rel_rhy, callback) {
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

// Write your code here
showRhymesButton.addEventListener('click', () => {
    rhymesOutput.innerHTML = '';
    word = wordInput.value;
    getRhymes(word, (result) => {
        if(Object.keys(result).length === 0){
            rhymesOutput.innerHTML = 'no rhymes';
            return;
        }
        for(const key in result) {
            const rhyme = result[key];
            
            const rhymesOutputList = document.createElement('li');
            rhymesOutputList.classList.add("list-group-item");
            rhymesOutputList.innerHTML = rhyme.word;
            rhymesOutput.append(rhymesOutputList);
        }
    });
});

clearButton.addEventListener('click', () => {
    rhymesOutput.innerHTML = '';
    wordInput.value = '';
});