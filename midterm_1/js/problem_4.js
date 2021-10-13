const messageInput = document.querySelector('#problem-4 #message-input');
const messageFeedback = document.querySelector('#problem-4 #message-feedback')

const MAX_CHARACTERS = 50;

// Write your code here
messageInput.addEventListener('input', () => {
    if(messageInput.value.length <= MAX_CHARACTERS){

        messageInput.classList.remove("is-invalid");
        messageInput.classList.add("is-valid");

        messageFeedback.classList.remove("invalid-feedback");
        messageFeedback.classList.add("valid-feedback");

        let charLeft = MAX_CHARACTERS-messageInput.value.length;
        messageFeedback.textContent = charLeft + " characters left";

    }else if(messageInput.value.length > MAX_CHARACTERS){

        messageInput.classList.remove("is-valid");
        messageInput.classList.add("is-invalid");

        messageFeedback.classList.remove("valid-feedback");
        messageFeedback.classList.add("invalid-feedback");

        let overUsedCharCount = messageInput.value.length-MAX_CHARACTERS;
        messageFeedback.textContent = overUsedCharCount + " characters too long";

    }
});