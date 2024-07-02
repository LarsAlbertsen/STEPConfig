/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "getAllValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "getAllValues",
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
    "contract" : "AttributeBindContract",
    "alias" : "MarketingCopy",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "MarketingCopy",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,MarketingCopy) {
var allValues = node.getAllValues(MarketingCopy);
logger.info("allValues = " + allValues);

allValues.toArray().forEach(function (v) {
	logger.info("sv = " + v.getSimpleValue() + " dimansionPoints=" + v.getDimensionPoints());
});

logger.info(" ")
var myOwnValue = myGetAllValue(node, MarketingCopy);
logger.info(" ");

myOwnValue.toArray().forEach(function (v) {
	logger.info("sv = " + v.getSimpleValue() + " dimansionPoints=" + v.getDimensionPoints());
});

/**
 * 
 * @param {StiboNode} node
 * @param {Attribute} attribute 
 * @returns {JavaUtilMap}
 */
function myGetAllValue(n, a) {
	var result = new java.util.HashMap()

	n.getManager().getContextHome().getContexts().forEach(function (c) {
		n.getManager().executeInContext(c.getID(), function (m) {
			var nodeInContext = m.getObjectFromOtherManager(n);
			var valueInContext = nodeInContext.getValue(a.getID());
			// remove duplidate dimension points
			result.put(valueInContext.getDimensionPoints(), valueInContext);
		});
	})
	return result.values();
}

}