/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "TestTime",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "TestTime",
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
var callCount = 10000000;
var start = java.lang.System.currentTimeMillis();
var i = 0;
var str = new java.lang.String();
while (i++<callCount) {
	str.toString();
}
var end = java.lang.System.currentTimeMillis();
var timePerCall = (end-start)/callCount;
logger.info("Time "+(end-start));
logger.info("timePerCall "+(timePerCall));

}