/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&appid=e96de8cd3cbefa2956325873b44a58e2";

/* Create a new date instance dynamically with JS
* One was added beacause getMonth return months from 0 to 11
*/
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

// Have the button ready to generate responce on click
const generate = document.getElementById("generate");
generate.addEventListener("click", geneData);

function geneData(e) {
        e.preventDefault();
        // Get user inputs
        const feelings = document.getElementById("feelings").value;
        const zip = document.getElementById("zip").value;
        getWeather(baseURL,zip,apiKey)
        // Post data to server
        .then(function (data) {
            postData("/addData", {date: newDate, temp: data.main.temp, content: feelings})
        })
        // Update UI data
        .then(function (newData){
            updateUI()
        })
};

// Get request data from API
const getWeather = async(baseURL, zip, apiKey) => {
    try {
        const res = await fetch(
            `${baseURL}${zip}${apiKey}`
        );
        // Save data in res as json
        const data = res.json();
        return data;
    } catch(error) {
        console.log("Error", error);
    }
};

// Get data from server
const getData = async(url = "") => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
    } catch {
        console.log("Error", error);
    }
};

// Post data to server endpoint (projectData)
const postData = async(url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return (newData);
    } catch(error) {
        console.log("Error", error);
    }
}

const updateUI = async() => {
    const req = await fetch("/all");
    try {
        const projectData = await req.json();
        document.getElementById("date").innerHTML = `${projectData.date}`;
        document.getElementById("temp").innerHTML = `${projectData.temperature}&#8451;`;
        document.getElementById("content").innerHTML = `${projectData.feelings}`;
    } catch {
        console.log("Error", error);
    }
}