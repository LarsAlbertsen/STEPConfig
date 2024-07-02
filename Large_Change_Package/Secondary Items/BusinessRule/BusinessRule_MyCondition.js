/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "MyCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "MyCondition",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
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
    "message" : "English Message",
    "translations" : [ {
      "language" : "da",
      "message" : "My Danish Message"
    }, {
      "language" : "en",
      "message" : "My English Message"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (MyMessage) {
return new MyMessage()
//return "NoTranslation"
}