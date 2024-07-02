/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "API_Collections",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "API_Collections",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,logger) {
var collection = manager.getNodeCollectionHome().getNodeCollectionByID("AllAttributes");


aProduct.queryChildren().asList().get(0)

// Quick count
var count=0;
var q = collection.queryNodes(0, 10, false);
q.forEach(function(node) {
	count++;
	return true;
});
logger.info("QuickCount "+count);


var types = new java.util.HashSet();
var batchSize = 100;
var foundSome = false;
var first = 0;
var count = 0;

do {
	foundSome = false;
	logger.info("First "+first+"\t"+count);
	var q = collection.queryNodes(first, batchSize, true);
	q.forEach(function(node) {
		/** @type {Node} */
		var objType = node.getNode().getObjectType().getID();
		if (!types.contains(objType)) {
			types.add(objType);
			logger.info("ID\t"+node.getNode().getID()+"\t"+objType);
		}
		foundSome = true;
		count++;
		return true;
	});
	
	first+=batchSize;
} while (foundSome);
logger.info("Count "+count);
logger.info(""+types)
// Query<SeqNode> queryNodes(long fromSeqNo, int count, boolean includeInvisibleNodes);
}