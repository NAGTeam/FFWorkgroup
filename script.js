

window.onload=function(){
    console.log('start');
    var fb = new Firebase("http://ffworkgroup.firebaseio.com");
    console.log(fb);
    
    fb.on("value",function(data){
        prs=data.val();
        
        writePrList(prs);
        
        $(document).on('click','.links',function(){
            $('#message-list').empty();
            $('#message-title').empty();
            stringId=this.getAttribute('data-id');
            id=parseInt(stringId);
            $('#message-title').append(prs[id].name);
            console.log(prs);
            writeMessages(prs,id);
        });
        
    });
}

function writePrList(projects){
    for(i=0;i<projects.prcounter;i++){
        project=projects[i];
        $('#projects').append('<li><a data-id='+i+' class="links" href="#">'+project.name+'</a></li>');
    }
}

function writeMessages(projects,projectID){
    messaggi=projects[projectID].messagges;
    length=projects[projectID].msgcounter;
    for(i=0;i<length;i++){
        messaggio=messaggi[i];
        $('#message-list').append('<li>'+messaggio.text+" by "+messaggio.auth+'</li>');
    }
}
