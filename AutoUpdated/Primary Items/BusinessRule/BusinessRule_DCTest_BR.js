/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "DCTest_BR",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "DCTest_BR",
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


//var dcHome = node.getManager().getHome(DataContainerTypeHome.class)

var dc = node.getDataContainerByTypeID('LAAL_Single_DC')
logger.info('dc='+dc)
if (dc!=null) {
    dc.deleteLocal()
}

/** @type{MultiDataContainer} */
var mDC = node.getDataContainerByTypeID("Marketing")
logger.info(mDC)
if (mDC!=null) {
    logger.info('deleteing mDC '+mDC)
    // com.stibo.core.domain.impl.datacontainer.FrontMultiDataContainerImpl
    var allSingle = mDC.getDataContainers()
    var it = allSingle.iterator()
    while (it.hasNext()) {
        // com.stibo.core.domain.impl.datacontainer.FrontSingleMultiDataContainerImpl
        /** @type{SingleDataContainer} */
        var single = it.next();
        logger.info('single='+single)
        var obj = single.getDataContainerObject()
        logger.info("obj.getID="+obj.getID())
        if ('1622756'.equals(obj.getID())) {
            single.deleteLocal()
        }
    }
}

}