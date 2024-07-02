/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "QueryLeafs",
  "type" : "BusinessFunction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "QueryLeafs",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "LeafObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Leaf",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "com.stibo.query.home.QuerySpecification",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "currentNode",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "StringBindContract",
    "alias" : "searchString",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (log,manager,LeafObjType,currentNode,searchString) {
var c = com.stibo.query.condition.Conditions;
var h = manager.getHome(com.stibo.query.home.QueryHome);
var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(
	c.name().like(searchString)
     .and(c.objectType(LeafObjType))
);

/*

var querySpecification = h.queryFor(com.stibo.core.domain.entity.Entity).where(
     c.valueOf(active).eq("No")
     .and(c.objectType(location))
 );

var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(
     c.objectType(LeafObjType)
);

  
  */
 
return querySpecification;
}