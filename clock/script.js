function updateClock(){
    let timeElement = document.getElementById("time");
    let dateElement = document.getElementById("date");
    const now = new Date();
    const hours = (now.getHours()%12 || 12).toString().padStart(2,"0");
    const minutes = now.getMinutes().toString().padStart(2,"0");
    const seconds = now.getSeconds().toString().padStart(2,"0");
    const AMPM = now.getHours() >= 12? "PM" : "AM";
    timeElement.textContent = `${hours}:${minutes}:${seconds} ${AMPM}`;

    const options = {
        weekday: "long",
        month:"long",
        day: "numeric",
        year: "numeric"
    }
    dateElement.textContent = now.toLocaleDateString(undefined,options);
}
updateClock();
setInterval(updateClock,1000);