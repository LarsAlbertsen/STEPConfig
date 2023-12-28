/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "API_Collection_Create",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "API_Collection_Create",
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
    "alias" : "Manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (Manager,logger,itemType) {




var collectionGroup=Manager.getNodeCollectionHome().getNodeCollectionGroupByID("116850");

var collection = collectionGroup.createNodeCollection("LarsCollection1");


 var c = com.stibo.query.condition.Conditions;
 var h = Manager.getHome(com.stibo.query.home.QueryHome);
 var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(c.objectType(itemType));;
 var query = querySpecification.execute();

var count = 0;
 
 query.forEach(function(node) {
     //handle node here
     count++;
     if (count<1000) {
     	if ((count%100)==0) {
		    	logger.info("count "+count);
     	}
     	var set = new java.util.HashSet();
     	set.add(node);
     	collection.addNodes(set);
	     return true;
     }
     else {
     	return false;
     }
 });


/*

 var c = com.stibo.query.condition.Conditions;
 var h = manager.getHome(com.stibo.query.home.QueryHome);
 var querySpecification = h.queryFor(com.stibo.core.domain.entity.Entity).where(
     c.valueOf(active).eq("No")
     .and(c.objectType(location))
 );
 var result = querySpecification.execute();




 */

/*
var q = collection.queryNodes(0, 1000, true);

var count = 0;
q.forEach(function(node) {
	//logger.info("ID\t"+node.getNode().getID());
	count++;
	return true;
});
logger.info("Count "+count);
// Query<SeqNode> queryNodes(long fromSeqNo, int count, boolean includeInvisibleNodes);
*/
}