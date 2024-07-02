/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "MyAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "MyAction",
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
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "myCondition",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "MyCondition",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,myCondition) {

var result = myCondition.evaluate(node);

/*logger.info("isRejected "+result.isRejected())
logger.info("Result "+result)

var messages = result.getLocalizableMessages();
logger.info("getLocalizableMessages="+messages)


messages.forEach(element => {
    logger.info("message "+element.getSupportedLocales());
});*/

var myLocale = java.util.Locale.forLanguageTag("en_US")



var c = new com.stibo.framework.localization.simple.SimpleLocalizerFactory()


//logger.info("c "+c);
//logger.info("class "+c.getClass().getName());

//var factory = new com.stibo.framework.localization.simple.SimpleLocalizerFactory()
//var localizer = .getLocalizer(myLocale)

//var localizer = new com.stibo.framework.localization.simple.SimpleLocalizerFactory().getLocalizer(Locale.ROOT)

}