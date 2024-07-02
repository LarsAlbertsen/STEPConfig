/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Action2",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "Action2",
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
  "binds" : [ {
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "errorMessage",
    "message" : "Default Error Message",
    "translations" : [ {
      "language" : "en",
      "message" : "Default English MEssage"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (dir,errorMessage) {
dir.addError("Lars from Action2")
return dir

}