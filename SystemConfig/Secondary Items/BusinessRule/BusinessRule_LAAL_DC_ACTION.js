/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_DC_ACTION",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_DC_ACTION",
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

logger.info("1Type = "+node.getDataContainerByTypeID("LAALDC"));
//node.getDataContainerByTypeID("LAALDC").createDataContainerObject("LarsDC1");

var newDC = node.getDataContainerByTypeID("LAALDC").addDataContainer();
logger.info("newDC "+newDC);
newDC.createDataContainerObject("Lars800");



var dataContainerArr = node.getDataContainerByTypeID("LAALDC").getDataContainers().toArray();
for (var i=0; i<dataContainerArr.length; i++) {
	var singleDataContainer = dataContainerArr[i];
	//createDataContainerObject

	logger.info("Type: "+ singleDataContainer);
	logger.info(""+i+" "+singleDataContainer.getDataContainerObject().getID());
}

var dc = node.getDataContainerByTypeID("ELFRContainer");
dc.createDataContainerObject("Lars-900");
logger.info("Type: "+ dc);
logger.info("ELFR "+dc.getDataContainerObject().getID());

}