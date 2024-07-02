/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "GetRawLOV",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "GetRawLOV",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "RawLOV",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "RawLOV",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "RawMultiLOV",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,RawLOV,RawMultiLOV) {
var v = node.getValue(RawLOV.getID()).getSimpleValue();

logger.info("v=["+v+"]");

var v3 = node.getValue(RawMultiLOV.getID()).getRawValue();
logger.info("v3=["+v3+"]");

var v2 = node.getValue(RawLOV.getID()).getRawValue();
logger.info("v2=["+v2+"]");

}