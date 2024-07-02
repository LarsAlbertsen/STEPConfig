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
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a2",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a3",
    "parameterClass" : "null",
    "value" : null,
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
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "116311",
    "description" : null
  }, {
    "contract" : "ProductBindContract",
    "alias" : "below",
    "parameterClass" : "com.stibo.core.domain.impl.FrontProductImpl",
    "value" : "116311",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,queryHome,a1,a2,a3,itemType,belowProduct,below) {
/** @type{Conditions} */
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

/*
var result = queryHome.queryFor(com.stibo.core.domain.Product)
    .where(c.objectType(itemType)
    .and(c.hierarchy().simpleBelow(belowProduct))
    .and(conditions))
    .execute();

result.forEach(function(o) {
     logger.info(o.getTitle());
     return true;
});*/


var q = queryHome
     .queryFor(com.stibo.core.domain.Product)
     .where(c.id().like("1163*").and(c.hierarchy().simpleBelow(below)))
logger.info("q=" + q.asList(10))





var r2 = queryHome
     .queryFor(com.stibo.core.domain.Product)
     .where(
          c.id().like("1163*")
               .and(
                    c.hierarchy().simpleBelow(below)
               )
               .and(c.valueOf(a1).neq("sa"))
     )
     .execute()
logger.info("r=" + r.asList(10))


var qq = queryHome.queryFor(com.stibo.core.domain.Product ).where(c.id().eq("123"))

/*
var result = queryHome.queryFor(com.stibo.core.domain.Product)
    .where(c.objectType(itemType)
    .and(c.hierarchy().simpleBelow(belowProduct))
    //.except(c.valueOf(publishedWebProducts).lov().id("NO"))
    .and(conditions))
    .execute();
 */
}