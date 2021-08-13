import 'bootstrap';
import * as Papa from 'papaparse'

function eventIcon(event) {
}

function beerEventTemplate(event) {
  return `
  <a href="${event.facebook_event}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action flex-column align-items-start">
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

function addBeerEvent(events) {
  let listGroupEvents = [];
  events.forEach(function(row) {
    if (row.active == 'FALSE') { return; }

    listGroupEvents.push(beerEventTemplate(row))
  })

  let eventsTemplate = `
    <div class="list-group list-group-flush">
      ${listGroupEvents.join('')}
    </div>
    `
  document.getElementById("events").innerHTML = eventsTemplate;
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
