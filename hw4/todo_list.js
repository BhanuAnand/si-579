    function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
        const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
        const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

        if(dueDate && dueTime) { // The user specified both a due date & due time
            //Add the timezone offset to account for the fact that timestamps are specified by UTC
            const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
            return dueDate + dueTime + timezoneOffset;
        } else {
            // if the user did not specify both a due date and due time, return false
            return false;
        }
    }

    add_task.addEventListener('keydown', addTasks);
    add_task.addEventListener('click', addTasks)

    function addTasks(){

        let descElem = document.getElementById("task_description_input");
        if(!descElem.value){
            alert("Please enter Task Description");
            return;
        }
        
        const dueDateElem = document.getElementById("duedate_input");
        const dueTimeElem = document.getElementById("duetime_input");

        timeToDisp = dateAndTimeToTimestamp(dueDateElem, dueTimeElem);
        
        const ul = document.getElementById("task_list");
        const li = document.createElement("li");

        li.appendChild(document.createTextNode(descElem.value));

        if(timeToDisp){
            let spn = document.createElement("span");
            spn.className = "due";
            let d = new Date(timeToDisp);
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            let year = d.getFullYear();
            let hrs = d.getHours() >= 12 ? d.getHours()-12 : d.getHours();
            let min = d.getMinutes();
            let sec = d.getSeconds();
            if(sec == 0){
                sec = "00"
            }
            let ampm = d.getHours() >= 12 ? 'PM' : 'AM';
            spn.appendChild(document.createTextNode("due " + mon + "/" + day + "/" + year + " " + hrs + ":" + min + ":" + sec + " " + ampm));
            li.appendChild(spn);
        }

        let btn = document.createElement("button");
        btn.className = "btn btn-sm btn-outline-danger done";
        btn.innerHTML = "Done";
        btn.addEventListener("click", function(e) {
            e.currentTarget.parentNode.remove();
          }, false);
        li.appendChild(btn);
        
        ul.appendChild(li);

        descElem.value = '';
    }