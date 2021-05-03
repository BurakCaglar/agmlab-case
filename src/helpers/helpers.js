/* GET CLOSEST LAT & LON COORDINAT FROM JSON DATA START */

export function closestLocation(targetLocation, locationData) {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1, location2) {
    var dx = location1.lat - location2.centerLat,
      dy = location1.lon - location2.centerLon;

    return vectorDistance(dx, dy);
  }

  return locationData.sort(function (prev, curr) {
    var prevDistance = locationDistance(targetLocation, prev),
      currDistance = locationDistance(targetLocation, curr);

    return prevDistance - currDistance;
  });
}

/* GET CLOSEST LAT&LON COORDINAT FROM JSON DATA END */

/* COORDINAT DISTANCE CALCULATOR START  */

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(4);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/* COORDINAT DISTANCE CALCULATOR END  */
