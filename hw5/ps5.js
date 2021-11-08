/**
 * Returns a list of objects grouped by some property. For example:
 * groupBy([{name: 'Steve', team:'blue'}, {name: 'Jack', team: 'red'}, {name: 'Carol', team: 'blue'}], 'team')
 * 
 * returns:
 * { 'blue': [{name: 'Steve', team: 'blue'}, {name: 'Carol', team: 'blue'}],
 *    'red': [{name: 'Jack', team: 'red'}]
 * }
 * 
 * @param {any[]} objects: An array of objects
 * @param {string|Function} property: A property to group objects by
 * @returns  An object where the keys representing group names and the values are the items in objects that are in that group
 */
 function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}
function saveItem(wordToSave){
    if(savedWordsElem.innerHTML=='(put saved words here)'){
        savedWordsElem.innerHTML = wordToSave;
    }else{
        savedWordsElem.innerHTML = savedWordsElem.innerHTML + ", " + wordToSave;
    }
}

const showRhymeButton = document.getElementById('show_rhymes');
const showSynonymsButton = document.getElementById('show_synonyms');
const wordInputElem = document.getElementById("word_input");
const outputDescElem = document.getElementById("output_description");
const wordOutputElem = document.getElementById("word_output");
const savedWordsElem = document.getElementById("saved_words");
const URL = "https://api.datamuse.com/words";

showRhymeButton.addEventListener('click', () => {
    outputDescElem.innerHTML = "<p>words that rhyme with "+wordInputElem.value;
    wordOutputElem.innerHTML = "<p>Loading...";
    
    if(wordInputElem.value == '') {
        wordOutputElem.innerHTML = "(no results)";
        return;
    }
    
    let mod_URL = URL+'?rel_rhy='+wordInputElem.value;
    fetchGroupedWords(mod_URL);   
});

showSynonymsButton.addEventListener('click', () => {
    outputDescElem.innerHTML = "<p>words with a meaning similar to "+wordInputElem.value;
    
    const loadElem = document.createElement('p');
    loadElem.textContent = "Loading...";
    wordOutputElem.innerHTML = "";
    wordOutputElem.append(loadElem);

    if(wordInputElem.value == '') {
        wordOutputElem.innerHTML = "(no results)";
        return;
    }

    let mod_URL = URL+'?ml='+wordInputElem.value;
    const fetchPromise = fetch(mod_URL);
    
    fetchPromise.then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
      }).then(words => {
        if(words.length == 0) {
            wordOutputElem.innerHTML = "(no results)";
        }
        else {
            const groupUL = document.createElement('ul');
            wordOutputElem.append(groupUL);
            createListOfWords(words, groupUL);
            document.getElementsByTagName('p')[1].remove();
        }
    }).catch((error) => {
        wordOutputElem.innerHTML = "(no results)";
        console.log(error);
    });
});

function fetchGroupedWords(mod_URL){
    const fetchPromise = fetch(mod_URL);
    
    fetchPromise.then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
      }).then(words => {
        if(words.length == 0) {
            wordOutputElem.innerHTML = "(no results)";
        }
        else {
            wordGroups = groupBy(words, 'numSyllables');

            Object.values(wordGroups).forEach(eachGroup => {
                for (let wordElem of eachGroup) {
                    syllable_number = wordElem.numSyllables;
                    break;
                  }
                const group = document.createElement('h2');
                group.textContent = syllable_number +" Syllable";
                wordOutputElem.append(group);

                const groupUL = document.createElement('ul');
                wordOutputElem.append(groupUL);
                
                createListOfWords(eachGroup, groupUL);
            });

            document.getElementsByTagName('p')[1].remove();
        }
    }).catch((error) => {
        wordOutputElem.innerHTML = "(no results)";
        console.log(error);
    });

}

function createListOfWords(words, groupUL) {
        
    words.map(wordElem => {
        let wordLi = document.createElement('li');
        let wordText = document.createTextNode(wordElem.word);
        
        let btn = document.createElement("button");
        btn.innerHTML = '(save)';
        btn.onclick = function(){
            if(savedWordsElem.innerHTML=='(put saved words here)'){
                savedWordsElem.innerHTML = wordElem.word;
            }else{
                savedWordsElem.innerHTML = savedWordsElem.innerHTML + ", " + wordElem.word;
            }
        };
        
        wordLi.append(wordText);
        wordLi.append(btn);
        groupUL.append(wordLi);
    }).join("\n");
}