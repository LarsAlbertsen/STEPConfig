/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LYRE-558",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "LYRE-558",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "queryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a1",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a1",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a2",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a2",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a3",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a3",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "belowProduct",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl$$Generated$$9",
    "value" : "102609",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,queryHome,a1,a2,a3,itemType,belowProduct) {
var c = com.stibo.query.condition.Conditions;

/*
var conditions = 
	c.valueOf(a1).eq("1")
     .or(c.valueOf(a2).eq("2"))
     .or(c.not(c.valueOf(a3).exist()));
*/


var conditions = c.valueOf(a1).eq("1")
     .or(c.valueOf(a2).eq("2"))
     .or(c.valueOf(a3).notExists());


var result = queryHome.queryFor(com.stibo.core.domain.Product)
    .where(c.objectType(itemType)
    .and(c.hierarchy().simpleBelow(belowProduct))
    .and(conditions))
    .execute();

result.forEach(function(o) {
	logger.info(o.getTitle());
	return true;
});





/*


var result = queryHome.queryFor(com.stibo.core.domain.Product)
    .where(c.objectType(itemType)
    .and(c.hierarchy().simpleBelow(belowProduct))
    //.except(c.valueOf(publishedWebProducts).lov().id("NO"))
    .and(conditions))
    .execute();

 
 */
}