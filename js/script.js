//start time and date
let lang = 'en';
function timeUpdate (){
    const time = document.querySelector('.time');
    time.textContent = new Date().toLocaleTimeString('en-GB');
    dataUpdate();
    showGreeting();
    setTimeout(timeUpdate,1000);
}
timeUpdate();
function dataUpdate(){
    const dataTranslation ={
        'en':'en-US',
        'ru':'ru-RU'
    }
    const date = document.querySelector('.date');
    const options = {weekday: 'long',month: 'long', day: 'numeric', timeZone: 'UTC'};
    date.textContent = new Date().toLocaleDateString(dataTranslation[lang], options);
}
//end time and date
//start greeting

function showGreeting (){  
    const greetingTranslation = {
        'en':[['Good morning','Good afternoon','Good evening','Good night'],["enter name"]],
        'ru':[['Доброе утро','Добрый день','Добрый вечер','Доброй ночи'],["введите имя"]]
    }
    const  greeting = document.querySelector('.greeting');
    const hours = new Date().getHours();
    if (hours<6){
        greeting.textContent = greetingTranslation[lang][0][3];
    }else if(hours>5&&hours<12){
        greeting.textContent = greetingTranslation[lang][0][0];
    }else  if(hours>11&&hours<18){
        greeting.textContent = greetingTranslation[lang][0][1];
    }else {
        greeting.textContent = greetingTranslation[lang][0][2];
    }
    const name = document.querySelector(".name");
    name.placeholder = greetingTranslation[lang][1][0];
}
function setLocalStorage() {
    const name = document.querySelector(".name");
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const name =document.querySelector(".name")
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);
//end greeting
//start slider
let photoApi = 'git';
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
let number =getRandom(1,20);
let bgNum = String(number).padStart(2,"0");
function setBg(){
    photoApi = 'git';
    const greetingTranslation = {
        'en':[['Good morning','Good afternoon','Good evening','Good night'],["enter name"]],
        'ru':[['Доброе утро','Добрый день','Добрый вечер','Доброй ночи'],["введите имя"]]
    }
    const linkObject ={
        'git':[
            [`https://raw.githubusercontent.com/stroich/stage1-tasks-img/main/images/morning/${bgNum}.webp`],
            [`https://raw.githubusercontent.com/stroich/stage1-tasks-img/main/images/afternoon/${bgNum}.webp`],
            [`https://raw.githubusercontent.com/stroich/stage1-tasks-img/main/images/evening/${bgNum}.webp`],
            [`https://raw.githubusercontent.com/stroich/stage1-tasks-img/main/images/night/${bgNum}.webp`]
        ]
    }
    const timeOfDay = document.querySelector('.greeting').textContent;
    const body = document.body;
    const img = new Image();
    img.onload = () => {
        body.style.backgroundImage = "url(\'"+img.src+"\')";
    };
    if (timeOfDay===greetingTranslation[lang][0][0]){
        img.src = linkObject[photoApi][0];
    }else if (timeOfDay===greetingTranslation[lang][0][1]){
        img.src =linkObject[photoApi][1];
    }else if (timeOfDay===greetingTranslation[lang][0][2]){
        img.src =linkObject[photoApi][2];
    }else {
        img.src = linkObject[photoApi][3];
    }
}
setBg();
let i = 0;
const buttonNext=document.querySelector('.slide-next');
const buttonPrev = document.querySelector('.slide-prev');
function getSlideNext(){
    if(photoApi==='git'){
        if (number===20) {
            number =1;
            bgNum = "01";
        }else {
            number+=1;
            bgNum = String(number).padStart(2, "0");
        }
        setBg();
    }else if(photoApi==='unsplash'){
        clickUnsplash ();
    }else if(photoApi==='flickr'){
        if(i===20){
            i = 0;
            clickFlickr(i);
        }else{
            i+=1;
            clickFlickr(i);
        }
        
    }
    
}
function getSlidePrev(){
    if(photoApi==='git'){
        if (number===1) {
            number =20;
            bgNum = "20";
        }else {
            number-=1;
            bgNum = String(number).padStart(2, "0");
        }
        setBg();
    }else if (photoApi==='unsplash'){
        clickUnsplash ();
    }else if (photoApi==='flickr'){
        if(i===0){
            i=20;
            clickFlickr(20);
        }else{
            i-=1;
            clickFlickr(i);
        }
        
    }
    
}
buttonNext.addEventListener('click', getSlideNext);
buttonPrev.addEventListener('click', getSlidePrev);
//end slider
// start weather
const city =document.querySelector(".city");
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
async function getWeather(a) {
    const urlTranlation ={
        'en':[[`https://api.openweathermap.org/data/2.5/weather?q=${a}&lang=en&appid=b332b3c13a9eb7954f5fa649326d9241&units=metric`],['Wind speed'],['Humidity']],
        'ru':[[`https://api.openweathermap.org/data/2.5/weather?q=${a}&lang=ru&appid=b332b3c13a9eb7954f5fa649326d9241&units=metric`],['Скорость ветра'],['Влажность']]
    }
    const url = urlTranlation[lang][0][0];
    const res = await fetch(url);
    const data = await res.json();
    const weatherError = document.querySelector('.weather-error');
    if (data.cod==='404'){
        weatherIcon.className = 'weather-icon owf';
        weatherError.textContent='city not found';
        temperature.textContent ='';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }else {
        weatherError.textContent='';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${urlTranlation[lang][1][0]}: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `${urlTranlation[lang][2][0]}: ${data.main.humidity} %`;
    }
}
const cityTranslation = {
    'en':'Minsk',
    'ru':'Минск'
}
city.value =  cityTranslation[lang]
getWeather(city.value);
localStorage.setItem('city', city.value);

function cityValue(){
    city.value = cityTranslation[lang];
}
function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
    getWeather(city.value);
}
city.addEventListener('change', setLocalStorageCity);

function getLocalStorageCity() {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather(city.value);
}


//end weather
//quote start
const quote = document.querySelector('.quote');
const author =document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote')
async function getQuotes() {
    const quotesTranslation= {
        'en':'./assets/json/quotes-en.json',
        'ru':'./assets/json/quotes-ru.json'
    }
    const quotes = quotesTranslation[lang];
    const res = await fetch(quotes);
    const data = await res.json();
    const numberQuote = getRandom(0,(data.length-1));
    quote.textContent = `\"${data[numberQuote].text}\"`;
    author.textContent = data[numberQuote].author;
}
getQuotes();
changeQuote.addEventListener('click',()=>{
    getQuotes();
})
//quote end
// //audio start
const play = document.querySelector('.play');
const  playNext = document.querySelector('.play-next');
const  playPrev =document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const durationPlayer = document.querySelector('.duration-player');
let progressPlayer = document.querySelector('.player-progress');
let progressTime =document.querySelector('.duration-time');
let nameSong = document.querySelector('.name-song');
import playList from './playList.js';
playList.forEach(el=>{
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent=el.title;
    playListContainer.append(li)
})
const namePlayList = document.querySelectorAll('.play-item');
let playListNumber = 0;

const songs = document.querySelector('.songs');
songs.volume =0.5;

function playAudio() {
    if (play.classList.contains('pause')===false){
        namePlayList.forEach(el=>el.classList.remove('item-active'));
        namePlayList[playListNumber].classList.add('item-active');
        songs.src = playList[playListNumber].src;
        songs.currentTime = 0;
        play.classList.toggle('pause');
        songs.play();

    }else{        
        songs.pause();
        play.classList.toggle('pause');
        namePlayList.forEach(el=>el.classList.remove('item-active'));
        
    }
}

function playAudioEnded(){
    if (playListNumber===(playList.length-1)){
        playListNumber=0;
    }else {
        playListNumber+=1;
    }
    songs.src = playList[playListNumber].src;
    songs.currentTime = 0;
    songs.play();
}
function playAudioNext(){
    namePlayList.forEach(el=>el.classList.remove('item-active'));
    
    if (playListNumber===(playList.length-1)){
        playListNumber=0;
    }else {
        playListNumber+=1;
    }
    songs.src = playList[playListNumber].src;
    songs.currentTime = 0;
    songs.play();
    if (play.classList.contains('pause')===false){
        play.classList.toggle('pause');
    } 
    namePlayList[playListNumber].classList.add('item-active');
}
function playAudioPrev(){
    namePlayList.forEach(el=>el.classList.remove('item-active'));
    
    if (playListNumber===0){
        playListNumber=playList.length-1;
    }else {
        playListNumber-=1;
    }
    songs.src = playList[playListNumber].src;
    songs.currentTime = 0;
    songs.play();
    if (play.classList.contains('pause')===false){
        play.classList.toggle('pause');
    }
    namePlayList[playListNumber].classList.add('item-active');
}
function audioTime(time) {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minutesNew = minutes;
    let secondsNew = seconds;
    if(minutes < 10) {
        minutesNew = '0' + minutes;
    }
    if(seconds < 10) {
        secondsNew = '0' + seconds;
    }
    return minutesNew + ':' + secondsNew;
}
function audioProgressTime(){  
    nameSong.textContent = playList[playListNumber].title;
    let timeMax = playList[playListNumber].duration;
    let timeValue = audioTime(Math.round(songs.currentTime));
    progressTime.innerHTML=`${timeValue}/${timeMax}`;
    let progress = (songs.currentTime/songs.duration) * 100;
    progressPlayer.style.width = `${progress}%`;
}
function rewind(event){
    const  widthDurationPlayer = this.clientWidth;
    const coordinates = event.offsetX;
    let timeMax = songs.duration;
    songs.currentTime = coordinates/widthDurationPlayer*timeMax;

}
// turning the sound on and off
const sound =document.querySelector('.sound');
const soundContainer = document.querySelector('.sound-volume-container');
let soundVolume =document.querySelector('.sound-volume');

function turnOffSound(){
    if(songs.muted){
        songs.muted = false;
    }else{
        songs.muted = true;
    }
    sound.classList.toggle('sound-without');
}
function changingSound(event){
    const  widthsoundContainer = this.clientWidth;
    const coordinates = event.offsetX;
    songs.volume = Number((coordinates/widthsoundContainer).toFixed(1));
    soundVolume.style.width = `${coordinates/widthsoundContainer*100}%`;    
}
function playPlayList(event){
    let number = 0;
    namePlayList.forEach((el,num)=>{
        if(el===event.currentTarget){
            number = num;
        }
    });
    if(number===playListNumber&&play.classList.contains('pause')){
        songs.pause();
        play.classList.toggle('pause');
        namePlayList.forEach(el=>el.classList.remove('item-active'));
    } else{
        namePlayList.forEach(el=>el.classList.remove('item-active'));    
        playListNumber = number;
        songs.src = playList[playListNumber].src;
        songs.currentTime = 0;
        namePlayList[playListNumber].classList.add('item-active');
        if(play.classList.contains('pause')===false){
            play.classList.add('pause');
        };
        songs.play();
    }   

}
play.addEventListener('click',playAudio);
playNext.addEventListener('click',playAudioNext);
playPrev.addEventListener('click',playAudioPrev);
durationPlayer.addEventListener('click', rewind);
songs.addEventListener('timeupdate',audioProgressTime);
songs.addEventListener('ended',playAudioEnded);
sound.addEventListener('click', turnOffSound);
soundContainer.addEventListener('click',changingSound);
namePlayList.forEach(element=>element.addEventListener('click',playPlayList))

//start setting
const languageSetting = {
    'en':['Application language','The source of the photo','Hide/display any block'],
    'ru':['Язык приложения','Источник получения фото','Cкрыть/отобразить любой блок'],
    'visibility':{
        'en':['todolist', 'date','greeting', 'quote', 'weather', 'audio','time'],
        'ru':['список задач', 'дата', 'приветствие', 'цитата', 'погода', 'аудио', 'время'],
    }
}
const titleTranslation = document.querySelector('.title-translation');
const titlePhoto = document.querySelector('.title-photo');
const titleVisibility = document.querySelector('.title-visibility');

const checkboxsName = document.querySelectorAll('.checkbox');
const checkbox = document.querySelectorAll('.visibility-checkbox');

function settingTranslation(){
    titleTranslation.textContent = languageSetting[lang][0];
    titlePhoto.textContent = languageSetting[lang][1];
    titleVisibility.textContent = languageSetting[lang][2];
    checkboxsName.forEach((el,ind)=>el.textContent = languageSetting.visibility[lang][ind]);
    checkbox.forEach(elem=>elem.checked=true);    
}
settingTranslation();
const burger = document.querySelector('.burger');
function clickburger(){
    const buttonstranslation = document.querySelectorAll('.container-element-burger');
    const settingsElementTitle = document.querySelector('.settings-element-title');
    buttonstranslation.forEach(el=>el.classList.remove('active'));
    settingsElementTitle.classList.remove('inactive');
    const containerSettings =document.querySelector('.container-settings');
    containerSettings.classList.toggle('container-settings-open');
    burger.classList.toggle('.opened');
}
burger.addEventListener('click',clickburger);

function clickTranslation(){
    const buttonstranslation = document.getElementById('translation');
    const settingsElementTitle = document.querySelector('.settings-element-title');
    buttonstranslation.classList.add('active');
    settingsElementTitle.classList.add('inactive');
}
titleTranslation.addEventListener('click',clickTranslation);
const back = document.querySelectorAll('.back');
function clickBack(){
    const buttonstranslation = document.querySelectorAll('.container-element-burger');
    const settingsElementTitle = document.querySelector('.settings-element-title');
    buttonstranslation.forEach(el=>el.classList.remove('active'));
    settingsElementTitle.classList.remove('inactive');
}
back.forEach(element=>element.addEventListener('click',clickBack));
function clickPhoto(){
    const button = document.getElementById('photo');
    const settingsElementTitle = document.querySelector('.settings-element-title');
    button.classList.add('active');
    settingsElementTitle.classList.add('inactive');
}
titlePhoto.addEventListener('click',clickPhoto);
function clickVisibility(){
    const button = document.getElementById('visibility');
    const settingsElementTitle = document.querySelector('.settings-element-title');
    button.classList.add('active');
    settingsElementTitle.classList.add('inactive');
}
titleVisibility.addEventListener('click', clickVisibility);
function clickBehind (event) { 
    const setting=document.querySelector('.settings');
    if (burger.classList.contains('.opened') && setting.contains(event.target)===false){
        clickburger();
    }
    
}
document.addEventListener('click', clickBehind);
//end setting

// start api photo
const unsplash = document.querySelector('.photo-unsplash');
const tagUnsplash = document.querySelector('.tag-unsplash');
let timeOfDayUnslash = document.querySelector('.greeting').textContent.split(" ")[1];
tagUnsplash.value = timeOfDayUnslash;
function getTagUnslash(){
    timeOfDayUnslash = tagUnsplash.value;    
}
tagUnsplash.addEventListener('change', getTagUnslash);
function clickUnsplash (){
    photoApi = 'unsplash';
    const body = document.body;
    const img = new Image();    
    async function getLinkToImage() {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDayUnslash}&client_id=N3aU5i0PjejqELzYfkPYFu8HkbPjMTbbywopM9CmzRs`;
        const res = await fetch(url);
        const data = await res.json();
        img.src =data.urls.regular;
    }
    getLinkToImage ();
    img.onload = () => {
        body.style.backgroundImage = "url(\'"+img.src+"\')";
    };
}
function clickUnsplashButton(){
    clickUnsplash();
    clickburger();
}
unsplash.addEventListener('click', clickUnsplashButton);

const git =document.querySelector('.photo-git');
function clickGit(){
    photoApi = 'git';
    setBg();
    clickburger();
}
git.addEventListener('click',clickGit);

const flickrButton = document.querySelector('.photo-flickr');
const tagflickr = document.querySelector('.tag-flickr');
let timeOfDayflickr = document.querySelector('.greeting').textContent.split(" ")[1];
tagflickr.value = timeOfDayflickr;
function getTagflickr(){
    timeOfDayflickr = tagflickr.value;    
}
tagflickr.addEventListener('change', getTagflickr);
function clickFlickr(i){    
    photoApi = 'flickr';
    const body = document.body;
    const img = new Image();
    async function getLinkToImage(i) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=49d1113e75e16d709f2ca013cb15a143&tags=${timeOfDayflickr}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const data = await res.json();
        const link = data.photos.photo.filter(element =>("url_l" in element));
        img.src =link[i].url_l;
    }
    getLinkToImage (i);
    img.onload = () => {
        body.style.backgroundImage = "url(\'"+img.src+"\')";
    };    
}
function clickFlickrButton(){
    clickFlickr(i);
    clickburger();
}
flickrButton.addEventListener('click',clickFlickrButton);
// end api photo

//start language
const buttonLanguageRu =document.querySelector('.language-ru');
const buttonLanguageEn =document.querySelector('.language-en');
function translationEn(){
    buttonLanguageEn.textContent = "English";
    buttonLanguageRu.textContent = "Russian";
    lang = "en";
    cityValue();
    getLocalStorageCity();        
    getQuotes();
    settingTranslation();
    translationTodolist();
    clickburger();
}
function translationRu(){
    buttonLanguageEn.textContent = "Английский";
    buttonLanguageRu.textContent = "Русский";
    lang = "ru"; 
    city.value = cityTranslation[lang];         
    cityValue();
    getLocalStorageCity();
    getQuotes();    
    translationTodolist();
    settingTranslation();
    clickburger();
}
buttonLanguageEn.addEventListener('click', translationEn);
buttonLanguageRu.addEventListener('click', translationRu);
//end language
//start visibility

function clickCheckbox(event){
    let id = `.${event.currentTarget.id}`;    
    if (event.currentTarget.id ==='quote'){
        id ='.container-quote';
    }else if(event.currentTarget.id ==='audio'){
        id ='.player';
    }
    if (event.currentTarget.id ==='greeting'){
        if(event.currentTarget.checked){
            document.querySelector(id).classList.remove('visibility-hidden');
            document.querySelector('.name').classList.remove('visibility-hidden');
        }else{
            document.querySelector(id).classList.add('visibility-hidden');
            document.querySelector('.name').classList.add('visibility-hidden');
        } 
    }else{
        if(event.currentTarget.checked){
            document.querySelector(id).classList.remove('visibility-hidden')
        }else{
            document.querySelector(id).classList.add('visibility-hidden')
        } 
    } 

}
function changeCheckbox(checkboxI){
    let id = checkboxI.id
    console.log(id);
    if (id==='audio'){
        document.querySelector('.player').classList.add('visibility-hidden');
    } else if(id==='quote'){
        document.querySelector('.container-quote').classList.add('visibility-hidden');
    } else if(id==='greeting'){
        document.querySelector('.greeting').classList.add('visibility-hidden');
        document.querySelector('.name').classList.add('visibility-hidden');
    }else{
        document.querySelector(`.${id}`).classList.add('visibility-hidden');
    }
}
checkbox.forEach(el=>el.addEventListener('change',clickCheckbox));
//end visibility

//start todolist
const languageTodolist = {
    'en':['New todo','Add','The todolist is empty','The todo list'],
    'ru':['Новое задание','Добавить','Список дел пуст','Список дел']
}
const titleTodolist = document.querySelector('.todolist-title');
const todolistInput = document.querySelector('.todolist-form-input');
const todolistButton = document.querySelector('.todolist-form-button');
const listNoneText = document.querySelector('.list-none-text');
const todolistForm = document.querySelector('.todolist-form');
const listAvailable = document.querySelector('.list-available');
function translationTodolist (){
    todolistInput.placeholder = languageTodolist[lang][0];
    todolistButton.textContent = languageTodolist[lang][1];
    listNoneText.textContent = languageTodolist[lang][2];
    titleTodolist.textContent =languageTodolist[lang][3];
}
translationTodolist();
let numberListElement = 1;
function addTodolist(event){
    event.preventDefault();
    document.querySelector('.list-none').classList.add('none');
    listAvailable.classList.add('list-available-open');
    let divTodolist = document.createElement('div');
    divTodolist.classList.add('todo-list-element');
    let inputTodolist = document.createElement("input");
    inputTodolist.classList.add('input-todolist');
    let label1 = document.createElement('label');
    inputTodolist.id = `${numberListElement}`;
    inputTodolist.type = "checkbox";  
    label1.setAttribute("for", `${numberListElement}`);
    label1.classList.add('todo-list-element-label')
    label1.innerHTML = todolistInput.value;
    let spanClose = document.createElement("span");
    spanClose.classList.add('todo-list-element-span');
    spanClose.textContent ="X";    
    divTodolist.appendChild(inputTodolist);
    divTodolist.appendChild(label1);
    divTodolist.appendChild(spanClose);
    listAvailable.appendChild(divTodolist);
    todolistInput.value = "";
    numberListElement += 1;
    inputTodolist = document.querySelectorAll('.input-todolist');
    inputTodolist.forEach(el=>{
        el.addEventListener('click', clickTodo);
    });
    divTodolist = document.querySelectorAll('.todo-list-element')
    divTodolist.forEach(item=>{
        item.addEventListener('mouseover',hoverTodo);
        item.addEventListener('mouseout',hoverTodo);
    });
    
}
function addTodolistLocalStorage(el){
    document.querySelector('.list-none').classList.add('none');
    listAvailable.classList.add('list-available-open');
    let divTodolist = document.createElement('div');
    divTodolist.classList.add('todo-list-element');
    let inputTodolist = document.createElement("input");
    inputTodolist.classList.add('input-todolist');
    let label1 = document.createElement('label');
    inputTodolist.id = `${numberListElement}`;
    inputTodolist.type = "checkbox";  
    label1.setAttribute("for", `${numberListElement}`);
    label1.classList.add('todo-list-element-label')
    label1.innerHTML = el;
    let spanClose = document.createElement("span");
    spanClose.classList.add('todo-list-element-span');
    spanClose.textContent ="X";    
    divTodolist.appendChild(inputTodolist);
    divTodolist.appendChild(label1);
    divTodolist.appendChild(spanClose);
    listAvailable.appendChild(divTodolist);
    numberListElement += 1;
    inputTodolist = document.querySelectorAll('.input-todolist');
    inputTodolist.forEach(el=>{
        el.addEventListener('click', clickTodo);
    });
    divTodolist = document.querySelectorAll('.todo-list-element')
    divTodolist.forEach(item=>{
        item.addEventListener('mouseover',hoverTodo);
        item.addEventListener('mouseout',hoverTodo);
    });
    
}
todolistForm.addEventListener('submit', addTodolist);
function removetodo(event){
    event.currentTarget.parentNode.remove();
    let divTodolist = document.querySelectorAll('.todo-list-element');
    console.log(divTodolist)
    if(divTodolist.length===0){
        document.querySelector('.list-none').classList.remove('none');
        listAvailable.classList.remove('list-available-open');
    }

}
function clickTodo(event){
    event.currentTarget.nextElementSibling.classList.toggle('input-todolist-inactive');
}
function clickTodoLocalStorage(el){
    let labelTodo = document.querySelectorAll('.todo-list-element-label');
    labelTodo.forEach(item=>{
        if(item.textContent===el){
            item.classList.toggle('input-todolist-inactive');
            item.previousSibling.checked=true;
        }
    })
    
}
function hoverTodo(event){
    event.currentTarget.lastChild.classList.toggle('todo-list-element-span-hover');
    event.currentTarget.lastChild.addEventListener('click',removetodo)
}

// end todolist

//start LocalStorage
function returnallTodoList (Nameclass){
    let allTodolist ='';
    document.querySelectorAll(`.${Nameclass}`).forEach(el=>{
        allTodolist += `${el.textContent} `;
    });
    return allTodolist;
}
function setLocalStorageSetting() {    
    localStorage.setItem('language', lang);
    localStorage.setItem('photoAPI', photoApi);  
    localStorage.setItem('timeOfDayUnslash', tagUnsplash.value);
    localStorage.setItem('timeOfDayflickr', tagflickr.value);
    localStorage.setItem('todolist', checkbox[0].checked);
    localStorage.setItem('date', checkbox[1].checked);
    localStorage.setItem('greeting', checkbox[2].checked);
    localStorage.setItem('quote', checkbox[3].checked);
    localStorage.setItem('weather', checkbox[4].checked);
    localStorage.setItem('audio', checkbox[5].checked);
    localStorage.setItem('time', checkbox[6].checked);
    let allTodolist = returnallTodoList('todo-list-element-label');
    localStorage.setItem('allTodolist', allTodolist);
    let allTodolistinactive = returnallTodoList('input-todolist-inactive');
    localStorage.setItem('allTodolistinactive', allTodolistinactive);
}
window.addEventListener('beforeunload', setLocalStorageSetting);

function getLocalStorageSetting() {
    if(localStorage.getItem('language')) {
        lang = localStorage.getItem('language');        
    }    
    getLocalStorageCity();
    cityValue();
    getQuotes();    
    settingTranslation();
    translationTodolist();
    tagUnsplash.value = localStorage.getItem('timeOfDayUnslash');
    tagflickr.value = localStorage.getItem('timeOfDayflickr');
    if (localStorage.getItem('photoAPI')==='flickr'){
        timeOfDayflickr = tagflickr.value;
        clickFlickrButton();
        clickburger();
    }else if(localStorage.getItem('photoAPI')==='unsplash'){
        timeOfDayUnslash = tagUnsplash.value;
        clickUnsplashButton();
        clickburger();
    }
    checkbox.forEach((el,ind)=>{        
        if(localStorage.getItem(`${el.id}`)==='false'){
            el.checked = false;
            changeCheckbox(el);
        }else{
            el.checked = true;
        }
    })
    let allTodolist = localStorage.getItem('allTodolist').split(' ');
    allTodolist = allTodolist.slice(0,(allTodolist.length-1));
    allTodolist.forEach(el=>{
    addTodolistLocalStorage(el);
    })
    let allTodolistinactive= localStorage.getItem('allTodolistinactive').split(' ');
    allTodolistinactive = allTodolistinactive.slice(0,(allTodolistinactive.length-1));
    allTodolistinactive.forEach(el=>{
        clickTodoLocalStorage(el);
    })   
    

    
}
window.addEventListener('load', getLocalStorageSetting);

//end LocalStorage

