/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "PrintDataContainers",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "PrintDataContainers",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var allDCs = node.getDataContainers().toArray();
for (var i1=0; i1<allDCs.length; i1++) {
	var aDC = allDCs[i1];
	logger.info("DataContainer "+aDC);
	printIfNode(aDC);
	if (aDC instanceof com.stibo.core.domain.datacontainer.MultiDataContainer) {
		printMultiDataContainer(aDC);
	}
	else if (aDC instanceof com.stibo.core.domain.datacontainer.SingleDataContainer) {
		printSingleDataContainer(aDC);
	}
	else {
		logger.info("Unknown DC Type "+aDC.getClass().getName());
	}
}


function printMultiDataContainer(pDC) {
	logger.info("  MultiDataContainer "+pDC);
	printIfNode(pDC);
	var sDCs = pDC.getDataContainers().toArray();
	for (var i=0; i<sDCs.length; i++) {
		printSingleDataContainer(sDCs[i])
	}
}

function printSingleDataContainer(pDC) {
	logger.info("    SingleDataContainer "+pDC);
	printIfNode(pDC);
	var dcObject = pDC.getDataContainerObject();
	logger.info("      DataContainerObject "+dcObject);
	printIfNode(dcObject);
	var allValues = dcObject.getValues().toArray();
	for (var i=0; i<allValues.length; i++) {
		var aValue = allValues[i];
		logger.info("        Value "+aValue.getAttribute().getID()+"="+aValue.getSimpleValue());
	}
	
}

function printIfNode(o) {
	if (o instanceof com.stibo.core.domain.Node) {
		logger.info("o is node");
	}
	else {
		logger.info("o is NOT node");
	}
}
}