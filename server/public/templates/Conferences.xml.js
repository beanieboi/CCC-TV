var Template = function(conferences) {
  function conferenceLockups(){
    output = ``

    for(i=0; i<conferences.length; i++){
      conference = conferences[i]

      output += `<lockup view="conference" conference="${conference.url}">
        <img src="${conference.logo_url ? conference.logo_url : resourceLoader.BASEURL + 'images/static.gif'}" width="308" height="174"/>
        <title>${conference.title}</title>
      </lockup>`
    }

    return output;
  }

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
        .marqueeOnHighlight {
          tv-text-highlight-style: marquee-on-highlight;
        }
      </style>
    </head>
    <stackTemplate>
      <collectionList>
        <grid>
          <header>
            <title>New</title>
          </header>
          <section>` + conferenceLockups() + `</section>
        </grid>
      </collectionList>
    </stackTemplate>
  </document>`
}
