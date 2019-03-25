// from: https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function distance(event, currentPosition) {
  var radlat1 = Math.PI * event.latitude / 180
  var radlat2 = Math.PI * currentPosition.latitude / 180
  var radlon1 = Math.PI * event.longitude / 180
  var radlon2 = Math.PI * currentPosition.longitude / 180

  var theta = event.longitude - currentPosition.longitude
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}

export default distance
