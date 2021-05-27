const formattedTime = moment().format('dddd, MMMM Do YYYY');
document.querySelector("#currentDay").textContent = formattedTime;

const currentHour = moment().hour();
const timeBlockArray = document.querySelectorAll(".time-block");
timeBlockArray.forEach((timeblock) => {
    //get hour from timeblock each of them
    const hour = timeblock.getAttribute("hour");
    if (hour < currentHour) {

        timeblock.classList.add("past");
     
    } else if (hour == currentHour) {
        timeblock.classList.add("present");
       
    } else if (hour > currentHour) {
        timeblock.classList.add("future");
       
    }
});

const saveBtnArray = document.querySelectorAll(".save-btn");
saveBtnArray.forEach((savebtn) => {
    savebtn.addEventListener("click", (event) => {
        //get hour data
        const hour = event.target.parentElement.getAttribute("hour");
        //get text
        const text = event.target.parentElement.children[1].value;
        //create new data entry
        const newData = {
            hour: hour,
            text: text
        }
        //check the local and get data iof it exists
        const data = JSON.parse(localStorage.getItem("timeInfo")) || [];
        //filter dupes
        const filteredData = data.filter((datum) => datum.hour != hour);
        //update the old data with new entry
        filteredData.push(newData)
        //set the local storage with update date if there is data already overwrite it
        localStorage.setItem("timeInfo",JSON.stringify(filteredData));
    })
});

const data = JSON.parse(localStorage.getItem("timeInfo")) || [];
data.forEach((datum) => {
    const query = `[hour='${datum.hour}']`;
    document.querySelector(query).children[1].value = datum.text;
});