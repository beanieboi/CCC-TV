var Conference = function(data){
  this.title = htmlEntities(data.title)
  this.url = htmlEntities(data.url)
  this.logo_url = htmlEntities(data.logo_url)

  if(data.events){
    this.talks = data.events.map(function(talk){
      return new Talk(talk)
    })
  }
}

Conference.recent = function(callback, errorCallback) {
  CCCTV.Conferences.recent(function(conferences){
    callback(
      conferences.map(function(conference){
        return new Conference(conference)
      })
    )
  }, errorCallback)
}

Conference.find = function(callback, errorCallback) {
  CCCTV.Conferences.find(function(conferences){
    callback(
      conferences.map(function(conference){
        return new Conference(conference)
      })
    )
  }, errorCallback)
}
