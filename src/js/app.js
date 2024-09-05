import 'bootstrap';
import * as Papa from 'papaparse'

function beerEventTemplate(event) {
  let image_nodes = '';
  const imageLinks = [event.event_image_link, event.image_link_2, event.image_link_3];
  
  imageLinks.forEach(link => {
    if (link) {
      image_nodes += `<img src="dist/img/${link}.png" class="partner-logo" alt="${event.place}">`;
    }
  });

  return `
  <a href="${event.facebook_event}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action flex-column align-items-start day-event" id=${event.day.replace(/\s/g, '-')}>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 grey">${event.place} - ${event.name}</h5>
      <small class="grey">${event.day}</small>
    </div>
    <p class="mb-1 grey">${event.description}</p>
    <div class="logo-container">
      ${image_nodes}
    </div>
    <small class="grey"><b>Prix:</b> ${event.price}. <b>Horaires:</b> ${event.times}. <b>Réservation:</b> ${event.reservation}</small>
  </a>
  `;
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

  mondayEvent.addEventListener('click', function () { showOnlyEvents('Lundi-09')});
  tuesdayEvent.addEventListener('click', function () { showOnlyEvents('Mardi-10')});
  wednesdayEvent.addEventListener('click', function () { showOnlyEvents('Mercredi-11')});
  thursdayEvent.addEventListener('click', function () { showOnlyEvents('Jeudi-12')});
  fridayEvent.addEventListener('click', function () { showOnlyEvents('Vendredi-13')});
  saturdayEvent.addEventListener('click', function () { showOnlyEvents('Samedi-14')});
  sundayEvent.addEventListener('click', function () { showOnlyEvents('Dimanche-15')});

}

function init() {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTMXZMQtFZbRa66700v7W1wf67rRFRiNSXZk9Drcr5qr_7SipEDUzJ0XNLVo363XIjiDXnsdaCM_RnD/pub?gid=0&single=true&output=csv', {
    download: true,
    header: true,
    complete: function(results) {
      addBeerEvent(results.data)
    }
  })
}


document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav > li > a');

  const menuToggle = document.getElementById('navbarToggler');

  const bsVersion = (typeof bootstrap !== 'undefined') ? parseInt(bootstrap.Collapse.VERSION.split('.')[0]) : 0;

  function closeMenu() {
      if (bsVersion >= 5) {
          const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
          if (bsCollapse && menuToggle.classList.contains('show')) {
              bsCollapse.hide();
          }
      } else {
          // Fallback for older Bootstrap versions or custom implementations
          menuToggle.classList.remove('show');
      }
  }

  // Add click event listener to each link
  navLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
  });
});

window.addEventListener('DOMContentLoaded', init)
