/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ListValidatorNames",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "ListValidatorNames",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Family", "Item", "Variant" ],
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

/** @type {Manager} */
var manager = manager;

/** @type {Node} */ 
var node;
var allValues = node.getValues().toArray();



for (var i=0; i<allValues.length; i++) {
	var aValue = allValues[i];
	try {
		var a = aValue.getAttribute();
		var m1 = a.getClass().getMethod("getValidatorName");
		var validatorName = m1.invoke(a);

		logger.info(aValue.getAttribute().getTitle()+"="+validatorName);
	} catch (e) {
		logger.info("ERROR " +e);
	}
}

}