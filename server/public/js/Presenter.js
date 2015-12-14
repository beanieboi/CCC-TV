var Presenter = {
  defaultPresenter: function(xml) {
    if(this.loadingIndicatorVisible) {
      navigationDocument.replaceDocument(xml, this.loadingIndicator);
      this.loadingIndicatorVisible = false;
    } else {
      navigationDocument.pushDocument(xml);
    }
  },

  menuBarItemPresenter: function(xml, element) {
    var feature = element.parentNode.getFeature("MenuBarDocument");
    if (feature) {
      var currentDoc = feature.getDocument(element);
      if (!currentDoc) {
        feature.setDocument(xml, element);
      }
    }
  },

  load: function(event) {
    var self = this,
    element = event.target,

    view = element.getAttribute("view")

    switch(view) {
      case "conferences":
        self.showLoadingIndicator();

        Conference.recent(function(conferences){
          resourceLoader.loadResource(resourceLoader.BASEURL + "templates/Conferences.xml.js",
            conferences,
            function(resource) {
              if (resource) {
                var doc = self.makeDocument(resource);
                doc.addEventListener("select", self.load.bind(self));
                self.menuBarItemPresenter.call(self, doc, element);
              }
            }
          )
        }, showAlert)
      break
      case "conference":
        self.showLoadingIndicator();

        url = element.getAttribute("url")
        Conference.find(url, function(conference){
          resourceLoader.loadResource(resourceLoader.BASEURL + "templates/Conference.xml.js",
            conference,
            function(resource) {
              if (resource) {
                var doc = self.makeDocument(resource);
                doc.addEventListener("select", self.load.bind(self));
                self.defaultPresenter.call(self, doc);
              }
            }
          )
        }, showAlert)
      break
    }
  },

  makeDocument: function(resource) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }

    var doc = Presenter.parser.parseFromString(resource, "application/xml");
    return doc;
  },

  showLoadingIndicator: function() {
    if (!this.loadingIndicator) {
      this.loadingIndicator = this.makeDocument(this.loadingTemplate);
    }

    if (!this.loadingIndicatorVisible) {
      navigationDocument.pushDocument(this.loadingIndicator);
      this.loadingIndicatorVisible = true;
    }
  },

  removeLoadingIndicator: function() {
    if (this.loadingIndicatorVisible) {
      navigationDocument.removeDocument(this.loadingIndicator);
      this.loadingIndicatorVisible = false;
    }
  },

  loadingTemplate: `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <loadingTemplate>
        <activityIndicator>
          <text>Loading...</text>
        </activityIndicator>
      </loadingTemplate>
    </document>`
}
