/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CopyValue",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CopyValue",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "targetAttr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ObjectTypeDescription",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,targetAttr) {
var value = node.getValue("New Attr");

var raw = callMethod(value, "getRawValue");

logger.info("From ["+raw+"]");

var str = "Lars <ref attrid=\"\" equalsign=\"=\" includeattrname=\"false\" objecturl=\"step://product?id=DiscontinuedProductsRoot\" resolveto=\"objid\" separator=\";\"/> Albertsen";


var targetValue = node.getValue(targetAttr.getID());
targetValue.setValue(str);

//node.setValue(value);

function callMethod(pObj, pMethod) {
	var method = pObj.getClass().getMethod(pMethod);
	var oo = method.invoke(pObj);
	return oo;
}
}