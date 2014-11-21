user="";
window.onload=function(){

    if(user!=""){
        $('#splashscreen').addClass('show');
        $('#splashscreen').removeClass('hidden');
    }else{
        $('#projects-list-view').addClass('show');
            $('#projects-list-view').removeClass('hidden');
    }

    fb = new Firebase("http://ffworkgroup.firebaseio.com");
    $('#user-input').submit(function(){
         if($('#user').val()!=""){
            user=$('#user').val();
            
            $('#splashscreen').addClass('hidden');
            $('#splashscreen').removeClass('show');
            
            $('#projects-list-view').addClass('show');
            $('#projects-list-view').removeClass('hidden');
         }   
    });

    //user=prompt();
    //console.log('start');
    
    console.log(fb);
    currentId=null;
    //setInterval(function(){console.log(currentId);},2000);
    
    fb.on("value",function(data){
        projects=data.val();
        $('#message-list').empty();
        $('#projects').empty();
        
        writeProjects(projects);
        if(currentId!=null)
            writeMessages(projects[currentId].messages);
            
        $(document).on('click','.back',function(){
            $('#conversation-view').addClass('hidden');
            $('#conversation-view').removeClass('show');
            
            $('#new-project').addClass('hidden');
            $('#new-project').removeClass('show');
            
            $('#projects-list-view').addClass('show');
            $('#projects-list-view').removeClass('hidden');
        });
        
        
        $(document).on('click','.new',function(){
            $('#name').val("");
            $('#project-creator').val("");
            $('#new-project').addClass('show');
            $('#new-project').removeClass('hidden');
            
            $('#projects-list-view').addClass('hidden');
            $('#projects-list-view').removeClass('show');
        });
        
        
        $(document).on('click','.project-link',function(){
            $('#message-list').empty();
            $('#message-title').empty();
            id=this.getAttribute('data-id');
            currentId=id;
            $('#message-title').append(projects[id].name);
            writeMessages(projects[id].messages);
            
            $('#conversation-view').addClass('show');
            $('#conversation-view').removeClass('hidden');
            
            $('#projects-list-view').addClass('hidden');
            $('#projects-list-view').removeClass('show');
        });
        
        $('#mex-form').submit(function(){
            console.log('message sent');
            text=$('#message').val();
            fb.child(currentId+'/messages').push({'auth':user,'text':text});
        });
        
        $('#pr-form').submit(function(){
            console.log('project sent');
            description=$('#project-creator').val();
            name=$('#name').val();
            fb.push({'name':name,'description':description,'messages':0});
        });
        
    });
}

function writeProjects(projects){
    for(id in projects){
        project=projects[id];
        count=0;
        if(project.messages!=0){
            for(mex in project.messages){
                count++;
            }
        }
        $('#projects').prepend('<li class="list-group-item"><a class="project-link" href="#" data-id="'+id+'"><div class="pr-desc"><h4 class="list-group-item-heading">'+project.name+'</h4><p class="list-group-item-text">'+project.description+'</p></div><div class="span-badge"><span class="badge">'+count+'</span></div></a></li>');
        
    }
}

function writeMessages(messages){
    counter=0;
    for(id in messages){
        message=messages[id];
        
        switch(counter){
            case 0:$('#message-list').append('<div class="panel panel-success"><div class="panel-heading">'+message.auth+' says:</div><div class="panel-body">'+message.text+'</div></div>');break;
            
            case 1:$('#message-list').append('<div class="panel panel-info"><div class="panel-heading">'+message.auth+' says:</div><div class="panel-body">'+message.text+'</div></div>');break;
            
            case 2:$('#message-list').append('<div class="panel panel-warning"><div class="panel-heading">'+message.auth+' says:</div><div class="panel-body">'+message.text+'</div></div>');break;
            
            case 3:$('#message-list').append('<div class="panel panel-danger"><div class="panel-heading">'+message.auth+' says:</div><div class="panel-body">'+message.text+'</div></div>');break;
        }
        counter=(counter+1)%4;
    }
}