import 'bootstrap';
import * as Papa from 'papaparse'

function beerEventTemplate(event) {
  return `
  <a href="${event.facebook_event}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action flex-column align-items-start day-event" id=${event.day.replace(/\s/g, '-')}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 grey">${event.place} - ${event.name}</h5>
      <small class="grey">${event.day.replace(/\s/g, "&nbsp;")}</small>
    </div>
    <p class="mb-1 grey">${event.description}</p>
    <p class="m-0">
      ${ event.event_image_link !== "" ? `<img src="dist/img/${event.event_image_link}.png" class="m-1 event-participants-responsive alt="${event.place}">` : '' }
      ${ event.image_link_2 !== "" ? `<img src="dist/img/${event.image_link_2}.png" class="m-1 event-participants-responsive">` : '' }
      ${ event.image_link_3 !== "" ? `<img src="dist/img/${event.image_link_3}.png" class="m-1 event-participants-responsive">` : '' }
    </p>
    <small class="grey">
      ${ event.price !== "" ? `<b>Prix:</b> ${event.price}.` : '' }
      ${ event.times !== "" ? `<b>Horaires:</b> ${event.times}.` : '' }
      ${ event.reservation !== "" ? `<b>Réservation:</b> ${event.reservation}` : ''}
    </small>
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
      <div class="btn-group flex-wrap mt-2 mr-2" role="group" aria-label="day-event-selection">
        <button type="button" id="monday-event" disabled class="btn btn-primary">Lundi</button>
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

  mondayEvent.addEventListener('click', function () { showOnlyEvents('Lundi-12')});
  tuesdayEvent.addEventListener('click', function () { showOnlyEvents('Mardi-13')});
  wednesdayEvent.addEventListener('click', function () { showOnlyEvents('Mercredi-14')});
  thursdayEvent.addEventListener('click', function () { showOnlyEvents('Jeudi-15')});
  fridayEvent.addEventListener('click', function () { showOnlyEvents('Vendredi-16')});
  saturdayEvent.addEventListener('click', function () { showOnlyEvents('Samedi-17')});
  sundayEvent.addEventListener('click', function () { showOnlyEvents('Dimanche-18')});

}

function init() {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRnPiq6Ln0sRNBe0dEY_Jst47jZKFGzcKBtl0kX37A2xQ0liNyHc_gP-EVesFsGbx1jnt-sIC5ZYbr/pub?gid=0&single=true&output=csv', {
    download: true,
    header: true,
    complete: function(results) {
      addBeerEvent(results.data)
    }
  })
}

window.addEventListener('DOMContentLoaded', init)
