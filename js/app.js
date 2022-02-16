const searchInput = document.querySelector("#user-search"),
  searchForm = document.querySelector("#search-form"),
  ipAddressResult = document.querySelector("#ip-address"),
  locationResult = document.querySelector("#location"),
  timezoneResult = document.querySelector("#timezone"),
  ispResult = document.querySelector("#isp");

// Create custom icon for Marker
const locationIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

// Initialize map with user's location
const map = L.map("map").locate({ setView: true, maxZoom: 16 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Functions

onLocationFound = (e) => {
  L.marker(e.latlng, { icon: locationIcon, keyboard: true }).addTo(map);
};

let latLong;

const searchForData = async (searchCriteria) => {
  try {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`,
      {
        params: searchCriteria,
      }
    );
    console.log(response.data.location.lat);
    ipAddressResult.innerHTML = response.data.ip;
    locationResult.innerHTML = response.data.location.region;
    timezoneResult.innerHTML = response.data.location.timezone;
    ispResult.innerHTML = response.data.isp;
    latLong = [
      Number(response.data.location.lat),
      Number(response.data.location.lng),
    ];
  } catch (err) {
    console.log(err);
  }
};

const changeLatLong = (latitudeLongitude) => {
  map.panTo(latitudeLongitude);
  L.marker(latitudeLongitude, { icon: locationIcon, keyboard: true }).addTo(
    map
  );
};

map.on("locationfound", onLocationFound);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchParameters;
  const searchInputValue = searchInput.value;
  const ipRegex = /\d+\.\d+\.\d+.\d+/;
  if (searchInputValue.match(ipRegex)) {
    searchParameters = { ipAddress: searchInputValue };
  } else {
    searchParameters = { domain: searchInputValue };
  }
  searchForData(searchParameters);
  changeLatLong(latLong);
  searchInput.value = "";
});
