/* left */

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition,onstart = function () {
    console.log("voice is activated, you can speak to microphone!");
};

recognition.onresult = function (event) {
const current = event.resultIndex;

const transcript = event.results[current][0].transcript;
content.textContent = transcript;
};
btn.addEventListener('click', () => {
    recognition.start();
})

/* Right */

//speechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body")

// voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
// loop voices to input and creat option for each one !

voices.forEach(voice => {
    // creat option element
    const option = document.createElement("option");
    //fill optin with voices and languages
    option.textContent = voice.name + '(' + voice.lang + ')';
    //set needed option attributes 
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
});
};
getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// speack!
const speak = () => {
// check if speaking is working!    
if(synth.speaking) {
    console.error("Already Speaking...");
    return;
}
if(textInput.value !== "") {
// add bg animation
body.style.background = "black url(./giphy.gif)";
body.style.backgroundRepeat = "repeat-x";
body.style.backgroundSize = "100% 100%";

// get speak text
const speakText = new SpeechSynthesisUtterance(textInput.value);
//speak end
speakText.onend = e => {
    console.log("Done Speaking...");
    body.style.background = "black";
};
// check speak err
speakText.onerror = e => {
    console.error("Somthing Went Wrong");
}
//selected voices
const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
// loop voices
voices.forEach(voice => {
    if(voice.name === selectedVoice) {
        speakText.voice = voice;
    }
});
// set pitch and rate 
speakText.rate = rate.value;
speakText.pitch = pitch.value;

//speak
synth.speak(speakText);
}
};

// event listeners


//text submit

textForm.addEventListener("submit", e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener("change", e => rateValue.textContent = rate.value)
//pitch value change
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value)

// voice select change
voiceSelect.addEventListener("change", e => speak());