import 'bootstrap';
import * as Papa from 'papaparse'

function beerEventTemplate(event) {
  return `
  <a href="${event.facebook_event}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action flex-column align-items-start day-event" id=${event.day.replace(/\s/g, '-')}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${event.name}</h5>
      <small>${event.day}</small>
    </div>
    <p class="mb-1">${event.description}</p>
    <p class="mb-1">Lieu: ${event.place}</p>
    <small><b>Prix:</b> ${event.price}. <b>Horaires:</b> ${event.times}. <b>Réservation:</b> ${event.reservation}</small>
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
    if (row.active == 'FALSE') { return; }

    listGroupEvents.push(beerEventTemplate(row))
  })

  let eventsTemplate = `
    <div class="col text-center mb-3">
      <div class="btn-group mt-2 mr-2" role="group" aria-label="day-event-selection">
        <button type="button" id="monday-event" class="btn btn-primary">Lundi</button>
        <button type="button" id="tuesday-event" class="btn btn-primary">Mardi</button>
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

  mondayEvent.addEventListener('click', function () { showOnlyEvents('Lundi-20')});
  tuesdayEvent.addEventListener('click', function () { showOnlyEvents('Mardi-21')});
  wednesdayEvent.addEventListener('click', function () { showOnlyEvents('Mercredi-22')});
  thursdayEvent.addEventListener('click', function () { showOnlyEvents('Jeudi-23')});
  fridayEvent.addEventListener('click', function () { showOnlyEvents('Vendredi-24')});
  saturdayEvent.addEventListener('click', function () { showOnlyEvents('Samedi-25')});
  sundayEvent.addEventListener('click', function () { showOnlyEvents('Dimanche-26')});

}

function init() {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTPHQ0uV24jynuVRLPPA22JxEgx658oqKFKWwZ_5LP7XFzlr7NZUFMx7qS1vNZrgUOT4DMEP9EfvE4b/pub?gid=0&single=true&output=csv', {
    download: true,
    header: true,
    complete: function(results) {
      addBeerEvent(results.data)
    }
  })
}

window.addEventListener('DOMContentLoaded', init)
