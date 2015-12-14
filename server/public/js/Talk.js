var Talk = function(data){
  this.id = data.guid
  this.title = htmlEntities(data.title)
  this.description = data.description
  this.persons = data.persons.join(', ')
  this.thumb_url = data.thumb_url
  this.length = Math.round(data.length / 60)
  this.release_date = new Date(data.release_date)
}
