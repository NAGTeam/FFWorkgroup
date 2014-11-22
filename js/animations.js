window.onload=function(){

    $(document).on('click','.back',function(){
        $('#conversation-view').addClass('show');
        $('#conversation-view').removeClass('hidden');
        
        $('#projects-list-view').addClass('hidden');
        $('#projects-list-view').removeClass('show');
    });
}
