/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAALTestCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL Test Condition",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ ],
  "messages" : [ {
    "variable" : "MyMessage",
    "message" : "Hello",
    "translations" : [ {
      "language" : "da",
      "message" : "Hej Med Dig"
    }, {
      "language" : "de",
      "message" : "German Version"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (MyMessage) {
var msg = new MyMessage();


return msg;
}