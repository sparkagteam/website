var I_S = jQuery;
I_S(document).ready(function(){
var runningRequest = false;
    var request;

    I_S('#I_S_Q').keyup(function(e){
        e.preventDefault();
        var I_Sq = I_S(this);

        if(I_Sq.val() == ''){
            I_S('div#results').html('');
            return false;
        }

        //Abort opened requests to speed it up
        if(runningRequest){
            request.abort();
        }

        runningRequest=true;
        I_S_Loader_show();


// This needs to be changed to the location of the search.php file

        request = I_S.getJSON(instant.AjaxUrl,{
	   I_S_Q:I_Sq.val(),action: 'i_s_magic'
        },function(data){           
            I_S_showResults(data,I_Sq.val());
            console.log('this runs once');
            runningRequest=false;
        });

var currentPostType;

function I_S_showResults(data, highlight){
           var resultHtml = '';
            I_S.each(data, function(i,item){
                if(currentPostType != item.posttype) {
                    if(i > 0) { // close previous post type container
                        resultHtml += '</div>';
                    }
                    resultHtml += '<div class="'+item.posttype+'-container">';
                    resultHtml += '<a href="'+item.posttypelink+'"><span>'+item.posttype+'</span>('+ item.posttypeCount +') View all</a>';
                    currentPostType = item.posttype;
                }
                resultHtml+='<div class="result">';
                resultHtml+='<a href="'+ item.url +'">'+item.title+'</a>';
                resultHtml+='</div>';
            });

            resultHtml+='</div>'; // close the post type container

            I_S('div#results').html(resultHtml);
            I_S_Loader_hide();
        }

function I_S_Loader_show(){
	I_S('#I_S_ajax_loader').show("slow");
}
function I_S_Loader_hide(){
	I_S('#I_S_ajax_loader').hide("3000");
}

        I_S('#I_S_form').submit(function(e){
            e.preventDefault();
        });
    });
 });