#include "json2.js";
#include "GitCommit.jsx";

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


var result = Execute ("curl -L https://script.google.com/macros/s/AKfycbyF-7cZ3jqhHUZJL0MTqysO5Z27xEh22mYXnPPRhC1SE1K6WG4/exec", docPath);
alert("received curl with content " + result);
var data = JSON.parse(result);
openWindow(data["items"], data["tags"]);


function openWindow (items, tags) {

    /*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":7,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Parametri commit","preferredSize":[300,199],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Messaggio di commit","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"DropDownList","parentId":0,"style":{"enabled":true,"varName":"listaItem","text":"DropDownList","listItems":"Item 1, -, Item 2,uytrre","preferredSize":[200,0],"alignment":null,"selection":0,"helpTip":null}},"item-3":{"id":3,"type":"ListBox","parentId":0,"style":{"enabled":true,"varName":"listaTag","creationProps":{"multiselect":true,"numberOfColumns":"1","columnWidths":"[]","columnTitles":"[]","showHeaders":false},"listItems":"ciao, ciao2","preferredSize":[92,0],"alignment":null,"helpTip":null,"selection":[0]}},"item-4":{"id":4,"type":"EditText","parentId":0,"style":{"enabled":true,"varName":"textBoxMessage","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"EditText","justify":"left","preferredSize":[221,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Selezione Item","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Tag da usare","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":10,"style":{"enabled":true,"varName":"confermaBtn","text":"Conferma","justify":"center","preferredSize":[85,0],"alignment":"left","helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":10,"style":{"enabled":true,"varName":"annullaBtn","text":"Annulla","justify":"right","preferredSize":[0,0],"alignment":"bottom","helpTip":null}},"item-9":{"id":9,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"groupButtons","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,1,4,5,2,6,3,9,10,8,7],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"itemReferenceList":"None"}}
*/ 

// DIALOG
// ======
var dialog = new Window("dialog", undefined, undefined, {resizeable: true});    
    dialog.text = "Parametri commit"; 
    dialog.preferredSize.width = 500; 
    dialog.preferredSize.height = 250; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var statictext1 = dialog.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Messaggio di commit"; 

var textBoxMessage = dialog.add('edittext {properties: {name: "textBoxMessage"}}'); 
    textBoxMessage.text = ""; 
    textBoxMessage.preferredSize.width = 221; 

var statictext2 = dialog.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Selezione Item"; 

var listaItem_array = items; 
var listaItem = dialog.add("dropdownlist", undefined, undefined, {name: "listaItem", items: listaItem_array}); 
    listaItem.selection = 0; 
    listaItem.preferredSize.width = 200; 

var statictext3 = dialog.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Tag da usare"; 

var listaTag_array = tags; 
var listaTag = dialog.add("listbox", undefined, undefined, {name: "listaTag", items: listaTag_array, multiselect: true}); 
    listaTag.selection = 0; 
    listaTag.preferredSize.width = 200; 

var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

 var annullaBtn = dialog.add("button", undefined, "Cancel"); 

var confermaBtn = dialog.add("button", undefined, "Ok"); 
    confermaBtn.onClick = function () {
        
        var tags = "";
        
        if (listaTag.selection != null) {
            tags = listaTag.selection;
        }
        var messageToCommit =   listaItem.selection.text + " - "  + textBoxMessage.text + " " + tags;
        
        
        proceedWithCommit(messageToCommit);
                //dialog.close();

     }

dialog.show();
    
    
}