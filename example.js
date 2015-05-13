'use strict';

/**
 Purpose:
 * Configure the angular log extender (`angular-logex`)
 *
 Documentation:
 *  - [angular-logex](https://github.com/lwhiteley/AngularLogExtender/)
 *  - [how to use angular log](https://github.com/lwhiteley/AngularLogExtender/wiki/04.-How-to-Use)
*/

module.exports = function (app) {
    function configAngularLogExtender(_, logExProvider) {
        var enabledLogging = true,
            enableQuietly = true;

        var colorTemplates = require('./angular-logex.json');

        function logPrefix (className) {
            var separator = ' >> ';
            return '' + (!_.isString(className) ? '' : '::' + className) + separator;
        }

        var colors = {
            log:
                colorTemplates.standard['dark'],
            info:
                colorTemplates.standard['positive-block'],
            warn:
                colorTemplates.standard['energized-block'],
            error:
                colorTemplates.standard['assertive-block'],
            debug:
                colorTemplates.standard['subdued']
        };

        logExProvider.overrideLogMethodColors(colors);
        logExProvider.overrideLogPrefix(logPrefix);
        logExProvider.enableLogging(enabledLogging, enableQuietly);
    }

    configAngularLogExtender.$inject = ['lodash', 'logExProvider'];

    app.run(['$log', 'lodash',function($log, _){
        var LOG = $log.getInstance('color', true);
        var logTypes = ['info','error','debug','warn', 'log'];
        _.forEach(logTypes, function(value){
            return LOG[value](value);
        });
    }]);
    return app.config(configAngularLogExtender);
};
