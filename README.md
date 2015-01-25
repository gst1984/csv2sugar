# csv2sugar

> Upload csv data to sugar crm 6.5 CE

DISCLAIMER: This plugin is just for testing purposes and is probably not production ready. So NO warranty for anything ;-).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install csv2sugar --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('csv2sugar');
```

This plugin requires the node-sugarcrm-client and node-csv. So be sure to run the following statement first:

```shell
npm install node-sugarcrm-client
npm install csv
```



## The "csv2sugar" task

### Overview
In your project's Gruntfile, add a section named `csv2sugar` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csv2sugar : {
		options : {
			apiURL:  "http://{yoursugarcrmtestsystem}/service/v4_1/rest.php",
			login:   "****",
			passwd:  "****",
			module: "Accounts",
		},
		src : ['test.csv']
	},
});
```

You can create or update rows in the regular sugar modules (Accounts, Contacts,...).
If the csv contains and id column, an existing row is updated, if not a new row is created.
The column header of the csv has to have the same naming (in lowercase) as SugarCRM.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
