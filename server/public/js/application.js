var resourceLoader;

npoplayer = {};

App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`,
    `${options.BASEURL}js/Conference.js`,
    `${options.BASEURL}js/Talk.js`,
    `${options.BASEURL}js/ccctv.js`,
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);

      resourceLoader.loadResource(
        `${options.BASEURL}templates/MenuBar.xml.js`,
        null,
        function(resource) {
          var doc = Presenter.makeDocument(resource);
          doc.addEventListener("select", Presenter.load.bind(Presenter));
          navigationDocument.pushDocument(doc);
        }
      )
    } else {
      throw ("Unable to evaluate scripts.");
    }
  });
}

var showAlert = function(error) {
  var alert = createAlert(error.name, error.message);
  Presenter.removeLoadingIndicator();
  navigationDocument.presentModal(alert);
}

var createAlert = function(title, description) {

  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
    <alertTemplate>
      <title>${title}</title>
      <description>${description}</description>
    </alertTemplate>
    </document>`

  var parser = new DOMParser();

  var alertDoc = parser.parseFromString(alertString, "application/xml");

  return alertDoc
}

var htmlEntities = function(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
