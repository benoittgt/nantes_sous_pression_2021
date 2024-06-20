import 'bootstrap';
import * as Papa from 'papaparse'

function beerEventTemplate(event) {
  let image_node = '';
  if (event.event_image_link) {
    image_node = `<img src="dist/img/${event.event_image_link}.png" class="m-2 partners-responsive" alt="${event.place}"></img>`;
  }
  return `
  <a href="${event.facebook_event}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action flex-column align-items-start day-event" id=${event.day.replace(/\s/g, '-')}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 grey">${event.place} - ${event.name}</h5>
      <small class="grey">${event.day}</small>
    </div>
    <p class="mb-1 grey">${event.description}</p>
    <p class="m-0">
      ${image_node}
    </p>
    <small class="grey"><b>Prix:</b> ${event.price}. <b>Horaires:</b> ${event.times}. <b>Réservation:</b> ${event.reservation}</small>
  </a>
`
}

function showOnlyEvents(day) {
  let listGroupItems = document.getElementsByClassName('day-event');
  for (let listGroupItem of listGroupItems) {
    if (listGroupItem.id == day) {
      listGroupItem.style.display = "";
    } else {
      listGroupItem.style.display = "none";
    }
  }
}

function addBeerEvent(events) {
  let listGroupEvents = [];
  events.forEach(function(row) {
    if (row.active != 'TRUE') { return; }

    listGroupEvents.push(beerEventTemplate(row))
  })

  let eventsTemplate = `
    <div class="col text-center mb-3">
      <div class="btn-group flex-wrap mt-2 mr-2" role="group" aria-label="day-event-selection">
        <button type="button" id="monday-event" disabled class="btn btn-primary">Lundi</button>
        <button type="button" id="tuesday-event" disabled class="btn btn-primary">Mardi</button>
        <button type="button" id="wednesday-event" class="btn btn-primary">Mercredi</button>
        <button type="button" id="thursday-event" class="btn btn-primary">Jeudi</button>
        <button type="button" id="friday-event" class="btn btn-primary">Vendredi</button>
      </div>
      <div class="btn-group mt-2" role="group" aria-label="day-weekend-selection">
        <button type="button" id="saturday-event" class="btn btn-primary">❤️ Samedi</button>
        <button type="button" id="sunday-event" class="btn btn-primary">Dimanche ❤️</button>
      </div>
    </div>
    <div class="list-group list-group-flush">
      ${listGroupEvents.join('')}
    </div>
    `
  document.getElementById("events").innerHTML = eventsTemplate;
  const mondayEvent = document.getElementById('monday-event');
  const tuesdayEvent = document.getElementById('tuesday-event');
  const wednesdayEvent = document.getElementById('wednesday-event');
  const thursdayEvent = document.getElementById('thursday-event');
  const fridayEvent = document.getElementById('friday-event');
  const saturdayEvent = document.getElementById('saturday-event');
  const sundayEvent = document.getElementById('sunday-event');

  mondayEvent.addEventListener('click', function () { showOnlyEvents('Lundi-11')});
  tuesdayEvent.addEventListener('click', function () { showOnlyEvents('Mardi-12')});
  wednesdayEvent.addEventListener('click', function () { showOnlyEvents('Mercredi-13')});
  thursdayEvent.addEventListener('click', function () { showOnlyEvents('Jeudi-14')});
  fridayEvent.addEventListener('click', function () { showOnlyEvents('Vendredi-15')});
  saturdayEvent.addEventListener('click', function () { showOnlyEvents('Samedi-16')});
  sundayEvent.addEventListener('click', function () { showOnlyEvents('Dimanche-17')});

}

function init() {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSRc00CG2JSglmA66KHJk6HQu0u24nl6Ip2EWR4MUTMyuNI2K4_7EvWU5750jUcxH_mlX2QcW9glWhs/pub?gid=0&single=true&output=csv', {
    download: true,
    header: true,
    complete: function(results) {
      addBeerEvent(results.data)
    }
  })
}

window.addEventListener('DOMContentLoaded', init)

// Test lightbox - START
// Open Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
// Test lightbox - END