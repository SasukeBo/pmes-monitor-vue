const recentViewDevices = 'RECENT_VIEW_DEVICES'

function SetDeviceIDs(id) {
  var v = localStorage.getItem(recentViewDevices)
  if (!v) return
  var ids = v.split(',')
  if (ids.length >= 8) {
    ids.splice(7)
  }
  ids.unshift(id)
  localStorage.setItem(recentViewDevices, ids)
}

function GetDeviceIDs() {
  var v = localStorage.getItem(recentViewDevices)
  if (!v) return []
  return v.split(',')
}

export { SetDeviceIDs, GetDeviceIDs }
