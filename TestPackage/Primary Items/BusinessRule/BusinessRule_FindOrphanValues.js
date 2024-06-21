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
    "alias" : "curObject",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (curObject) {

curObject.getValues().forEach(function(v) {
	/** @type{Value} */
	var aValue = v;
	if (aValue.isOrphan()) {
		logger.info(curObject.getID() + "\t" + aValue.getAttribute().getTitle() + "=" + aValue.getSimpleValue());
	}
});
}