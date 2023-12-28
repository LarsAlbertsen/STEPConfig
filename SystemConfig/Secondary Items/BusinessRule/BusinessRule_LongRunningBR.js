/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LongRunningBR",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LongRunningBR",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var minutes = 20;

for (var i=0; i<minutes; i++) {
	node.setName("LONGRUNNING "+i);
	for (var j=0; j<60; j++) {
		logger.info("LONGRUNNING "+i+"/"+j);
		java.lang.Thread.sleep(1000);
		node.setName("LONGRUNNING "+i);
	}
}

logger.info("LONGRUNNING done after "+minutes+" minutes");
}