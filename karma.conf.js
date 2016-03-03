module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/string.startsWith/src/string.startsWith.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/ng-storage/ngStorage.js',
      'app/bower_components/angular-ui-select/dist/select.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/mavrix-agenda.js',
      'app/components/**/*.js',
      'app/views/**/*.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
