$(document).ready(function(){

    var answer = [1,4,2];
    var position = 1;
    get(position);

    $("body").on("click","#options > div",function(){
        var correct = $("#options > div:nth-child(1)");
        $(this).css("background-color","#eeeeee");
        correct.css("background-color","#b7dcff");

        $("#options > div:nth-child(1) > p > i").removeClass("fa-circle");
        $("#options > div:nth-child(1) > p > i").addClass("fa-dot-circle");
        $("#options").css("pointer-events","none");

        if($(this).is(correct)) {
            $("#progress-table > div:nth-child("+position+")").css("background-color", "#b7dcff");
        }
        else{
            $("#progress-table > div:nth-child("+position+")").css("background-color", "#ffb5bc");
            correct.siblings().css("text-decoration", "line-through");
        }
        $("#skip-button").prop("hidden",true);
        $("#next-button").prop("hidden",false);
    });

    $("body").on("click","#next-button",function(){
        position++;
        get(position);
    });

    $("body").on("click","#skip-button",function(){
        $("#progress-table > div:nth-child("+position+")").css("background-color", "#eeeeee");
        position++;
        get(position);
    });


    function get(position){
        $.get("/g1polish/app/get.php?q="+position, function(data, status){
            $("#get").html(data);
        });
    }


});

