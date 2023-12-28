/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateGarbageData",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CreateGarbageData",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Tree" ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "refType",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "Accessory",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "ItemAttr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ItemAttr",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,refType,ItemAttr) {
//logger.info(node.getID());

var productCount = 100000;
var revisionCount = 5;

// maye sure we stop
var tryCount = 0;

while (node.getRevisions().size()<revisionCount && tryCount<100) {
	node.setSimpleValue(ItemAttr, "Some Value "+Math.random());
	node.approve();
	tryCount++;
	//logger.info("Size "+node.getRevisions().size() + " tryCount="+tryCount);
}



/*
tryCount = 0;
// create reference until we have at least 5
var allRefs = node.getReferences(refType);
while (allRefs.size()<5 && tryCount<100) {
	var targetID = "LAAL-"+Math.floor(Math.random() * productCount);
	//logger.info("TargetID="+target);
	var target = node.getManager().getProductHome().getProductByID(targetID);
	if (target!=null) {
		logger.info("Create ref "+tryCount);
		node.createReference(target, refType);
		target.approve();
	}
	allRefs = node.getReferences(refType);
	tryCount++;
}
node.approve();
*/
}