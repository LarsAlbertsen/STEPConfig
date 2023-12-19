/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRProps",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRProps",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
var regs = ['InMemory.Plugin', 'TaskList.Streaming\..*', 'Portal.TaskList.Max', 'OAuthSSO\.Logout.*']

function matches(str) {
	var found = false;
	regs.every(function(regex) {
		found = str.matches(regex)
		return !found
	})
	return found
}	

var set = com.stibo.systemconfig.ConfigUtil.getAllProperties()
set.toArray().forEach(function(k) {
	//if ((k+'').match(/InMemory\.Plugin/)) 
	if (matches(k))
		logger.info('ConfigUtil: ' + k + ' = ' + com.stibo.systemconfig.ConfigUtil.getProperty(k))	
})
}