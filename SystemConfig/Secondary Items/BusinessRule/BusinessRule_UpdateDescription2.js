/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "UpdateDescription2",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "UpdateDescription2",
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
    "contract" : "BusinessConditionBindContract",
    "alias" : "isActive",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "isActive",
    "description" : null
  }, {
    "contract" : "BusinessActionBindContract",
    "alias" : "updateDescription",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessActionImpl",
    "value" : "UpdateDescriptionIfNotActive",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,isActive,updateDescription) {
if (isActive.evaluate(node).isAccepted()) {
	updateDescription.execute(node)
}
}