const clickCountButton = document.querySelector('#problem-3 #click-count');

// write your code here
function addS(num) {
    if(num === 1) {
        return '';
    } else {
        return 's';
    }
}

let cnt = 0
clickCountButton.addEventListener('click', () => {
    cnt=parseInt(cnt)+parseInt(1);
    clickCountButton.textContent = "You clicked the button "+ cnt +" time" + addS(parseInt(cnt));
});