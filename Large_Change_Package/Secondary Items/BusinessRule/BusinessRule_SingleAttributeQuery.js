/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SingleAttributeQuery",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "SingleAttributeQuery",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attribute",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "90099098-6e54-4207-ae2a-1a5ad01de515",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,attribute) {


//List<Product> products = manager.getHome(SingleAttributeQueryHome.class).querySingleAttribute(new SingleAttributeQueryHome.SingleAttributeQuerySpecification(Product.class, attribute, "A value")).asList(10);

//var h = manager.getHome(com.stibo.query.home.QueryHome);
  
var queryHome = manager.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome);

//var arg = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.doamin.Product, attribute, "No")
var arg = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.Product, attribute, "No")
//var query = queryHome.querySingleAttribute(arg).asList(1000);
//logger.info("result "+query.size());

var count = 0;
queryHome.querySingleAttribute(arg).forEach(function(node) {
     count++;
     return true;
});

logger.info("Count "+count);
}