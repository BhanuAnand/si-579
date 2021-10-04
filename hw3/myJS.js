/*
* Excercise 1
*
*/

const origColor = document.getElementById("color-name").textContent;

/*
* Then write a function that changes the text and the color inside the div
*
*/

function changeColor(){
    
    const colorBlock = document.getElementById("color-block");
    const colorName = document.getElementById("color-name");
    let textColor = colorName.textContent;

    // condition that determines what color it should be changed to
    if(textColor != "#FFFF00"){
        colorBlock.style.backgroundColor = "#FFFF00";
        colorName.textContent = "#FFFF00";
    }else{
        colorBlock.style.backgroundColor = origColor;
        colorName.textContent = origColor;
    }
    
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/
convertbtn.addEventListener('click', () => {
    let farenTemp = document.getElementById("f-input").value;
    convertTemp(farenTemp);
});

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(fTemp){
    //Calculate the temperature here
    let cTemp = Math.round((fTemp-32) * 5/9);
    //Send the calculated temperature to HTML
    const cOutSpan = document.getElementById("c-output");
    cOutSpan.textContent = cTemp;
}


