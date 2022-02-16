const searchInput = document.querySelector("#user-search"),
  searchForm = document.querySelector("#search-form"),
  ipAddressResult = document.querySelector("#ip-address"),
  locationResult = document.querySelector("#location"),
  timezoneResult = document.querySelector("#timezone"),
  ispResult = document.querySelector("#isp");

// ipify sample data
const data = {
  ip: "8.8.8.8",
  location: {
    country: "US",
    region: "California",
    city: "Mountain View",
    lat: 37.40599,
    lng: -122.078514,
    postalCode: "94043",
    timezone: "-07:00",
    geonameId: 5375481,
  },
  domains: [
    "0d2.net",
    "003725.com",
    "0f6.b0094c.cn",
    "007515.com",
    "0guhi.jocose.cn",
  ],
  as: {
    asn: 15169,
    name: "Google LLC",
    route: "8.8.8.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
};

const displayResults = () => {
  ipAddressResult.innerHTML = data.ip;
  locationResult.innerHTML = data.location.region;
  timezoneResult.innerHTML = data.location.timezone;
  ispResult.innerHTML = data.isp;
};

const changeLatLong = (latitudeLongitude) => {
  L.map("map").stopLocate();
  L.map("map").setView(latitudeLongitude, 13).addTo(map);
  L.marker(latitudeLongitude, { icon: locationIcon }).addTo(map);
};

// Create custom icon for Marker
const locationIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

// Initialize map with user's location
const map = L.map("map").locate({ setView: true, maxZoom: 16 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

onLocationFound = (e) => {
  L.marker(e.latlng, { icon: locationIcon, keyboard: true }).addTo(map);
};

map.on("locationfound", onLocationFound);

const latLong = [data.location.lat, data.location.lng];

searchForm.addEventListener("submit", (e) => {
  console.log(searchInput.value);
  displayResults();
  changeLatLong(latLong);
  searchInput.value = "";
  e.preventDefault();
});
