var CCCTV = {
  Conferences: {
    recent: function(callback, errorCallback) {
      CCCTV.get(
        "https://api.media.ccc.de/public/conferences",
        callback,
        errorCallback
      )
    },

    find: function(url, callback, errorCallback) {
      CCCTV.get(
        url,
        callback,
        errorCallback
      )
    },
  },

  get: function(url, callback, errorCallback){
    request = new XMLHttpRequest()
    request.open("GET", url)
    request.addEventListener("load", function(){
      try {
        callback(JSON.parse(request.responseText).conferences)
      } catch(error){
        errorCallback(error)
      }
    })
    request.send()
  }
}
