/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ActionToTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "ActionToTest",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,log) {
logger.info("Lars");
var attribute = node.getManager().getAttributeHome().getAttributeByID("d5986f5f-5e0a-4576-9361-bfa361736f72");
if (attribute == null) {
    logger.info("Attribute not found");
}
var value = node.getValue(attribute.getID());
value.setSimpleValue("100");
}