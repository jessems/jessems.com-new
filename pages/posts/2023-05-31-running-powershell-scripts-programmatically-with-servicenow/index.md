---
slug: running-powershell-scripts-programmatically-with-servicenow
date: "2023-05-31"
title: "Running PowerShell scripts programmatically with ServiceNow"
description: "Running PowerShell scripts programmatically with ServiceNow"
tags: "servicenow, powershell"
published: true
category: "technical"
---

I've created an extended and updated version of John J. Andersen's [2013 PowerShellProbe class](https://john-james-andersen.com/blog/service-now/powershell-probe-and-utility-for-servicenow.html) for ServiceNow. It allows you to run custom PowerShell scripts on a MID Server from a Script Include or Background script. You can get it [here](https://gist.github.com/jessems/5a5f78209c3cd24f93dbf24906f521ea).

## Example usage

```js
var pb = new PowershellProbe("EC2WINMID1", "127.0.0.1")

var script =
  "$myVarName = 'Thank you John Andersen'\n" + "Write-Host $myVarName\n"

pb.setScript(script)

var response = pb.execute(true)

gs.info("OUTPUT: " + response.output) // OUTPUT: Thank you John Andersen
gs.info("ERROR: " + response.error) // ERROR: null
```

Or with an existing script file:

```js
var MIDSERVER = "midserver_name"
var MIDSERVER_IP = "123.456.789.101"

var pb = new global.PowershellProbe(MIDSERVER, MIDSERVER_IP)

var params = {
  myVarName: "ValueOne",
  myVarNameTwo: "ValueTwo",
}

pb.setScriptByFilePath("ExistingScript.ps1", params)

var response = pb.execute(true)
```

## Some of the changes I made

John's script has a reference to `Packages.com.glide.util.StringUtil.escapeHTML(script)` which is no longer available in the latest versions of ServiceNow. I've updated the script to use `GlideStringUtil` instead.

I've also included a method `setScriptByFilePath` to run a PowerShell script file that already exists on your MID Server.

John's original also includes a `maxWaitTimeForEccQueue` property, which you can choose to use or not, but which isn't part of the gist.

Get the gist [here](https://gist.github.com/jessems/5a5f78209c3cd24f93dbf24906f521ea) or view the source code below:

```js
// Original: https://john-james-andersen.com/blog/service-now/powershell-probe-and-utility-for-servicenow.html
var PowershellProbe = Class.create()
PowershellProbe.prototype = {
  initialize: function (mid, server) {
    this.setMidServer(mid)
    this.setPSServer(server)
  },

  _createEccOutputRecord: function () {
    var ecc = new GlideRecord("ecc_queue")
    ecc.initialize()
    ecc.agent = this.mid
    ecc.topic = "Powershell"
    ecc.name = "Windows - Powershell"
    ecc.source = this.psServer
    ecc.queue = "output"
    ecc.state = "ready"
    ecc.payload = this._getPayloadString()
    return ecc.insert()
  },

  _getPayloadString: function () {
    var xmldoc = new XMLDocument("<parameters/>")

    var el = xmldoc.createElement("parameter")
    xmldoc.setCurrent(el)
    xmldoc.setAttribute("name", "skip_sensor")
    xmldoc.setAttribute("value", "true")

    xmldoc.setCurrent(xmldoc.getDocumentElement())
    el = xmldoc.createElement("parameter")
    xmldoc.setCurrent(el)
    xmldoc.setAttribute("name", "probe_name")
    xmldoc.setAttribute("value", "Windows - Powershell")

    xmldoc.setCurrent(xmldoc.getDocumentElement())
    el = xmldoc.createElement("parameter")
    xmldoc.setCurrent(el)
    xmldoc.setAttribute("name", "script.ps1")
    xmldoc.setAttribute(
      "value",
      this.prettyScript ? this.prettyScript : this.scriptFileInvocation
    )

    return xmldoc.toString()
  },

  _getPayload: function (ecc) {
    if (ecc.payload != "<see_attachment/>") {
      return ecc.payload
    }
    var sa = new Packages.com.glide.ui.SysAttachment()
    var payload = sa.get(ecc, "payload")
    return payload
  },

  _getResponse: function (eccQueueRecordId) {
    var maxtime = gs.getProperty(
      "com.snc.integration.powershellprobe.maxWaitTimeForEccQueue",
      60
    )
    var counter = 0
    var found = false
    var eccResponse = new GlideRecord("ecc_queue")
    eccResponse.addQuery("queue", "input")
    eccResponse.addQuery("response_to", eccQueueRecordId)
    while (counter < maxtime && found == false) {
      eccResponse.query()
      if (eccResponse.next()) {
        found = true
      }
      gs.sleep(1000)
      counter++
    }
    var payload = this._getPayload(eccResponse)
    var xmldoc = new XMLDocument(payload)
    var retObj = new Object()
    retObj.output = ""
    retObj.error = ""
    if (found) {
      retObj.output = "" + this._getResponseOutputValue(xmldoc)
      retObj.error = "" + this._getResponseErrorValue(xmldoc)
      return retObj
    }
  },

  _getResponseErrorValue: function (xmldoc) {
    var error = xmldoc.getNodeText("//results/result/error")
    return error
  },

  _getResponseOutputValue: function (xmldoc) {
    var output = xmldoc.getNodeText("//results/result/output")
    return output
  },

  execute: function (waitForResponse) {
    var recSysId = this._createEccOutputRecord()
    if (waitForResponse == true) {
      var response = this._getResponse(recSysId)
      return response
    }
  },

  setMidServer: function (mid) {
    this.mid = "mid.server." + mid
  },

  setPSServer: function (server) {
    this.psServer = server
  },

  setScript: function (script) {
    this.prettyScript = script
    this.encodedScript = GlideStringUtil.escapeHTML(script)
  },

  setScriptByFilePath: function (filePath, params) {
    this.scriptFileInvocation = 'powershell "scripts\\' + filePath + '"'

    if (gs.nil(params)) return

    // Add parameters to the script invocation
    for (var key in params) {
      this.scriptFileInvocation += " -" + key + " " + params[key].toString()
    }
  },

  type: "PowershellProbe",
}
```
