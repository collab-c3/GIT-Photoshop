﻿///////////////////////////////////////////// basic library /////////////////////////////////////////////// retrieve the path of current documentvar docPath = app.activeDocument.fullName.parent.fsName.toString();var docName = app.activeDocument.fullName.displayName;var gitInited = checkGitExists ();function Execute (command, directory){  var stdout = "";   var tempFile = new File (Folder.temp + "/temp.txt");   if (directory != null)        app.system ("cd " + directory + "; " + command + " > " + tempFile.fsName);   else        app.system (command + " > " + tempFile.fsName);   if (tempFile.open ("r"))   {       stdout = tempFile.read ();       tempFile.close ();       tempFile.remove ();   }   return stdout;}function checkGitExists () {        var checkGitCommand = "if [ -d .git ]; then echo git; else echo nogit; fi"    var result = Execute (checkGitCommand, docPath);    var gitInited = false;    if (result.substring (0, 3) == "git") {    // git repo already exists. do nothing        gitInited = true;     }    else {        gitInited = false;    }    return gitInited;}///////////////////////////////////////////// basic library /////////////////////////////////////////////if (gitInited) {    // git repo already exists. go on.        var lastVersion = Execute ("git ls-files " + docName, docPath);    if (lastVersion){        presentRevertWindow();    }    else {                var myWindow = new Window ("dialog");        var myMessage = myWindow.add ("statictext");        myMessage.text = "There were some problems retrieving the previous version.";        var confirmButton = myWindow.add ("button", undefined, "OK");    confirmButton.onClick = function () {        myWindow.close ();     }        myWindow.show ( );    } }else {    // git repo does not exists. stop execution.        var myWindow = new Window ("dialog");    var myMessage = myWindow.add ("statictext");    myMessage.text = "Current document does not belong to any Git Repo";        var confirmButton = myWindow.add ("button", undefined, "OK");    confirmButton.onClick = function () {        myWindow.close ();     }        myWindow.show ( );}function presentRevertWindow () {        var revertWindow = new Window ("dialog", "Revert");    revertWindow.orientation = "row";    revertWindow.add ("statictext", undefined, "Going to revert this doc to previous version. Are you sure?");    var confirmButton = revertWindow.add ("button", undefined, "Yes");    var cancelButton = revertWindow.add ("button", undefined, "No");    confirmButton.onClick = function () {        revertWindow.close ();                 Execute ("git checkout HEAD~1 -- " + docName, docPath);        app.executeMenuCommand('revert');        app.activeDocument.activeHistoryState = app.activeDocument.historyStates[0];     }     cancelButton.onClick = function () {        revertWindow.close ();     }    revertWindow.show (); }