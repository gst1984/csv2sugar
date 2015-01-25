/*
 * csv2sugar
 * https://github.com/gst1984/csv2sugar
 *
 * Copyright (c) 2015 Gerald Stockinger
 * Licensed under the MIT license.
 */

var sugar = require('node-sugarcrm-client');
var csv = require('csv');
var fs = require('fs');

module.exports = function(grunt) {


	 grunt.registerMultiTask('csv2sugar', 'Parse csv file and upload data to sugarcrm.', function() {

        var done, _this;
        _this = this;
        done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});
		var module = options.module;
		
		//init sugar connector
		sugar.init(
			{
				apiURL:  options.apiURL,
			    login:   options.login,
			    passwd:  options.passwd
			}
		);
		
		//login and perform the data sync in the call back
		sugar.login(function(sessionID){
			if (sessionID != '') {
				// process each source csv file
				processFiles(_this.filesSrc, sessionID, module, done);			
			} else {
				grunt.log.writeln("can't login, check your credentials");
				done(false);
			}			
		});
    });
	
	
	
};

function syncSugarBean(sessionID, module, datarow, lastline, done){
	// If you are here, you got a session ID
		params = {
			 session:  sessionID
			,module_name : module
			,name_value_list : []
		};
		
		//add data to name_value_list
		for (key in datarow) {
			params.name_value_list.push({"name" : key, "value" : datarow[key]});
		}
		
		
		sugar.call("set_entry", params, function(res,err){
			console.log(res,err);
			if(lastline){
				done(true);
			}
		});
}

function processFiles(files, sessionID, module, done){
	var filesCount =0;
	var lastfile=false;
	
	files.forEach(function(f) {
	
		if(filesCount>=files.length-1){
			lastfile=true;
		}
		console.log('source file:', f);
		// Using the first line of the CSV data to discover the column names
		var rs = fs.createReadStream(f);
		var parser = csv.parse({columns: true}, function(err, data){
			var rowind = 0;
			var lastline = false;
			for(row in data) {
				if(rowind>=data.length-1 && lastfile===true){
					lastline=true;
				}
				syncSugarBean(sessionID, module, data[row], lastline, done);
				rowind++;
			}
		});
		rs.pipe(parser);
		filesCount++;
	});
}
