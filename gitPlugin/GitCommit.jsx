///////////////////////////////////////////// basic library /////////////////////////////////////////////
// retrieve the path of current document
var docPath = app.activeDocument.fullName.parent.fsName.toString();
var docName = app.activeDocument.fullName.displayName;
var gitInited = checkGitExists ();

function Execute (command, directory)
{
  var stdout = "";
   var tempFile = new File (Folder.temp + "/temp.txt");
   if (directory != null)
        app.system ("cd " + directory + "; " + command + " > " + tempFile.fsName);
   else
        app.system (command + " > " + tempFile.fsName);
   if (tempFile.open ("r"))
   {
       stdout = tempFile.read ();
       tempFile.close ();
       tempFile.remove ();
   }
   return stdout;
}

function checkGitExists () {
    
    var checkGitCommand = "if [ -d .git ]; then echo git; else echo nogit; fi"
    var result = Execute (checkGitCommand, docPath);
    var gitInited = false;
    if (result.substring (0, 3) == "git") {
    // git repo already exists. do nothing
        gitInited = true;
     }
    else {
        gitInited = false;
    }
    return gitInited;
}


///////////////////////////////////////////// basic library /////////////////////////////////////////////

function proceedWithCommit(commitMessage){
    
//commit the file
alert("Commiting file " + docName + " in folder " + docPath);


if (gitInited == "git") {
    // git repo already exists. do nothing
 }
else {
    // git repo does not exists. create it.
    Execute ("git init", docPath);
}
    commit(commitMessage);
}

function commit(commitMsg) {
    alert("commiting with message " + commitMsg);
    
    Execute ("git add " + docName, docPath );
    var result = Execute("git commit -m \"" + commitMsg + "\"", docPath);
    alert(result);
 }
