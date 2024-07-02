/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "HasBranch",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ChangePackage Scripting" ],
  "name" : "HasBranch",
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
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "GITBranch",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "GITBranch",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,GITBranch) {
var v = node.getValue(GITBranch.getID()).getSimpleValue();
if (v==null) {
	throw "No GITBranch";
}
logger.info("HasBranch "+v);
return true

}