var Template = function(conference) {
  function shelf(){
    if(conference.talks.length > 0) {
      return `<shelf>
      <header>
        <title>Meer “${conference.name}”</title>
      </header>
      <section>
        ` + talkLockups(conference.talks) + `
      </section>
    </shelf>`
    }
  }

  function episodeLockups(talks) {
    output = ``

    for(i=0; i<talks.length; i++){
      talk = talks[i]

      output += `<lockup view="talk">
        <img src="${talk.poster_url ? talk.poster_url : resourceLoader.BASEURL + 'images/static.gif'}" width="308" height="174"/>
        <title class="marqueeOnHighlight">${talk.title}</title>
        <subtitle>${talk.release_date}</subtitle>
      </lockup>`
    }

    return output
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
    <productTemplate>
      <banner>
        <heroImg src="${conference.logo_url ? conference.logo_url : resourceLoader.BASEURL + 'images/static.gif'}" />
        <infoList>
          <info>
          <header>
          </header>
            <text>${conference.persons}</text>
            <text>${conference.duration} minuten</text>
          </info>
        </infoList>
        <stack>
          <title>${conference.name}</title>
          <row>
            <text>${conference.name}</text>
            <text>${conference.broadcasted_at}</text>
          </row>
          <description allowsZooming="true">${conference.description}</description>
          <row>
            <buttonLockup view="video" conference="${conference.id}">
              <badge src="resource://button-play" />
            </buttonLockup>
          </row>
        </stack>
      </banner>
      ` + shelf() + `
    </productTemplate>
  </document>`
}
