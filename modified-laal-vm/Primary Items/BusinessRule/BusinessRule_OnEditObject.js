/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "OnEditObject",
  "type" : "BusinessAction",
  "setupGroups" : [ "OnApproval" ],
  "name" : "OnEditObject",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "stibo.businessrule.action" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Trigger",
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
logger.info("OnApprove "+node)


}