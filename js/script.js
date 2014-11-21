window.onload=function(){
    //user=prompt();
    user="test";
    //console.log('start');
    fb = new Firebase("http://ffworkgroup.firebaseio.com");
    //console.log(fb);
    currentId=null;
    //setInterval(function(){console.log(currentId);},2000);
    
    fb.on("value",function(data){
        projects=data.val();
        $('#message-list').empty();
        $('#projects').empty();
        
        writeProjects(projects);
        if(currentId!=null)
            writeMessages(projects[currentId].messages);
        
        
        $(document).on('click','.project-link',function(){
            $('#message-list').empty();
            $('#message-title').empty();
            id=this.getAttribute('data-id');
            currentId=id;
            $('#message-title').append(projects[id].name);
            writeMessages(projects[id].messages);
        });
        
        $('#mex-form').submit(function(){
            console.log('message sent');
            text=$('#message').val();
            fb.child(currentId+'/messages').push({'auth':user,'text':text});
        });
        
        $('#pr-form').submit(function(){
            console.log('project sent');
            name=$('#project-creator').val();
            fb.push({'name':name,'messages':0});
        });
        
    });
}

function writeProjects(projects){
    for(id in projects){
        project=projects[id];
        $('#projects').prepend('<li><a class="project-link" href="#" data-id="'+id+'">'+project.name+'</a></li>');
    }
}

function writeMessages(messages){
    for(id in messages){
        message=messages[id];
        $('#message-list').prepend('<li><div class="panel panel-default"><div class="panel-heading">'+message.auth+'says:</div><div class="panel-body">'+message.text+'</div></div></li>');
    }
}
