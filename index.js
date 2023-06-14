
const L = window.L;
// tworzenie mapy
const map = L.map('map').setView([54.4640500, 17.0287200], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

//  współrzędne markera
let marker = null;

const form = document.getElementById('detailsForm');

// podwójne kliknięcie
function handleDoubleClick(e) {
  
  if (marker) {
    map.removeLayer(marker);
  }

  //  marker
  marker = L.marker(e.latlng, { draggable: true }).addTo(map);

  // aktualizacja współrzędnych
  updateFormCoordinates();

  
  marker.on('dragend', () => {
    updateFormCoordinates();
  });
}

function updateFormCoordinates() {
  const coordinatesInput = document.getElementById('coordinatesInput');
  if (coordinatesInput && marker) {
    const latLng = marker.getLatLng();
    coordinatesInput.value = `${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`;
  }
}

map.on('dblclick', handleDoubleClick);