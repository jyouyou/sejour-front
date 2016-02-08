var Cucumber = require('cucumber'),
    fs = require('fs');
    path = require('path');

var JsonFormatter = Cucumber.Listener.JsonFormatter();

var reportDirectory = 'test_results/acceptance_tests/';
var reportFileName = 'report.json';

var reportDirectoryPath = path.join(__dirname, '../../../' + reportDirectory);
var reportFilePath = path.join(reportDirectoryPath + reportFileName);

function mkdirp(path, root) {
  var dirs = path.split('/'), dir = dirs.shift(), root = (root || '') + dir + '/';

  try {
    fs.mkdirSync(root);
  } catch (e) {
    if(!fs.statSync(root).isDirectory()) throw new Error(e);
  }

  return !dirs.length || mkdirp(dirs.join('/'), root);
}

var createHtmlReport = function (sourceJson) {
  var CucumberHtmlReport = require('cucumber-html-report');
  var report = new CucumberHtmlReport({
    source: sourceJson, // source json
    dest: reportDirectory // target directory (will create if not exists)
  });
  report.createReport();
};

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    fs.open(reportFilePath, 'w+', function (err, fd) {
      if (err) {
        mkdirp(reportDirectoryPath);
        fd = fs.openSync(reportFilePath, 'w+');
      }

      fs.writeSync(fd, json, 'utf-8');
      console.log('Ecriture du résultat fini avec succès : ' + reportFilePath);
      createHtmlReport(reportFilePath);
        
    });
  };

  this.registerListener(JsonFormatter);
};