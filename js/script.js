user="";
window.onload=function(){
    
   
    console.log(localStorage.getItem('user'));
    if(localStorage.getItem('user')==null){
        console.log('here');
        $('#splashscreen').addClass('show');
        $('#splashscreen').removeClass('hidden');
    }else{
        user=localStorage.getItem('user');
        $('#projects-list-view').addClass('show');
        $('#projects-list-view').removeClass('hidden');
    }

    
    $('#user-input').submit(function(){
         if($('#user').val()!=""){
            user=$('#user').val();
            localStorage.setItem('user',user);
            
            $('#splashscreen').addClass('hidden');
            $('#splashscreen').removeClass('show');
            
            $('#projects-list-view').addClass('show');
            $('#projects-list-view').removeClass('hidden');
         }   
    });

    //user=prompt();
    //console.log('start');
    
    //console.log(fb);
    currentId=null;
    //setInterval(function(){console.log(currentId);},2000);
    
    fb = new Firebase("http://ffworkgroup.firebaseio.com");
    fb.on("value",function(data){
        projects=data.val();
        $('#message-list').empty();
        $('#projects').empty();
        
        resetInput();
       
        $('#message').val("");
        $('#name').val("");
        $('#project-creator').val("");
        
        writeProjects(projects);
        if(currentId!=null)
            writeMessages(projects[currentId].messages);
        });
            
        $(document).on('click','.back',function(){
            $('#conversation-view').addClass('hidden');
            $('#conversation-view').removeClass('show');
            
            $('#new-project').addClass('hidden');
            $('#new-project').removeClass('show');
            
            $('#projects-list-view').addClass('show');
            $('#projects-list-view').removeClass('hidden');
            
            resetInput();
            
        });
        
        
        $(document).on('click','.new',function(){
            resetInput();
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
            resetInput();
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
            if(text!="")
                fb.child(currentId+'/messages').push({'auth':user,'text':text});
            resetInput();
        });
        
        $('#pr-form').submit(function(){
            console.log('project sent');
            description=$('#project-creator').val();
            name=$('#name').val();
            if((name!="")&&(description!="")){
                fb.push({'name':name,'description':description,'messages':0});
                $('#new-project').addClass('hidden');
                $('#new-project').removeClass('show');
                
                $('#projects-list-view').addClass('show');
                $('#projects-list-view').removeClass('hidden');
                resetInput();
            }
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
    for(id in messages){
        message=messages[id];
        $('#message-list').append('<div class="mex panel panel-info"><div class="panel-heading">'+message.auth+' says:</div><div class="panel-body">'+message.text+'</div></div>');
    }
}


function resetInput(){
    $('#message').val("");
    $('#name').val("");
    $('#project-creator').val("");

}
