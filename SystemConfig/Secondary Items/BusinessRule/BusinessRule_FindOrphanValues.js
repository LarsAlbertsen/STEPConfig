/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "FindOrphanValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "FindOrphanValues",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Branch", "Family", "Item", "Leaf", "Variant" ],
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
var allValues = node.getValues().toArray();
for (var i=0; i<allValues.length; i++) {
	var aValue = allValues[i];
	if (aValue.isOrphan()) {
		logger.info(node.getID()+"\t"+aValue.getAttribute().getTitle()+"="+aValue.getSimpleValue());
	}
}
}