$(document).ready(function(){

    var position;
    var total_questions = 40;
    var table_correct;
    var question_array = [];
    var is_mobile;
    var error;


    setIsMobile();
    getQuestionArray();
    getPosition();
    setVarError();
    getTableCorrect();
    getQuestion();
    getTable(total_questions,colorTable);
    setProgressBar();


    /**
     * Get question array
     */
    function getQuestionArray(){
        if(Cookies.get('question_array')){
            question_array = JSON.parse(Cookies.get('question_array'));
        }
        else {
            for(var i=1; i <= total_questions; i++){
                question_array.push(i);
            }
            //array shuffle
            var currentIndex = question_array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = question_array[currentIndex];
                question_array[currentIndex] = question_array[randomIndex];
                question_array[randomIndex] = temporaryValue;
            }
            Cookies.set('question_array',JSON.stringify(question_array), { expires: 30 });
        }
        console.log(question_array);
    }


    /**
     * Option click
     */
    $("body").on("click","#options > div",function(){
        var correct = $(".correct");
        $(this).css("background-color","#eeeeee");
        correct.css("background-color","#b7dcff");

        $(".correct > p > i").removeClass("fa-circle");
        $(".correct > p > i").addClass("fa-dot-circle");
        $("#options").css("pointer-events","none");

        if($(this).is(correct)) {
            $("#progress-table > div:nth-child("+position+")").css("background-color", "#b7dcff");
            table_correct[position] = 1;
            Cookies.set('table_correct',JSON.stringify(table_correct));
        }
        else{
            $("#progress-table > div:nth-child("+position+")").css("background-color", "#ffb5bc");
            correct.siblings().css("text-decoration", "line-through");
            table_correct[position] = 0;
            error++;
            Cookies.set("error",error);
            Cookies.set('table_correct',JSON.stringify(table_correct));
            setError();
        }
        position++;
        Cookies.set('position',position);
        $("#skip-button").prop("hidden",true);
        $("#next-button").prop("hidden",false);
    });



    /**
     * Next button
     */
    $("body").on("click","#next-button",function(){
        $("#skip-button").prop("hidden",false);
        $("#next-button").prop("hidden",true);
        getQuestion(position);
        colorCurrent();
    });




    /**
     * Skip button
     */
    $("body").on("click","#skip-button",function(){
        $("#progress-table > div:nth-child("+position+")").css("background-color", "#eeeeee");
        table_correct[position] = 2;
        Cookies.set('table_correct',JSON.stringify(table_correct));
        position++;
        error++;
        Cookies.set('position',position);
        Cookies.set('error',error);
        setError();
        colorCurrent();
        getQuestion(position);
    });

    $("body").on("click touchstart","body",function(){

    });




    /**
     * Get next question
     */
    function getQuestion(){
        $.get("/g1polish/app/get.php?q="+question_array[position-1], function(data, status){
            $("#get").html(data);
        });
        setProgress();
    }




    /**
     * Get table
     */
    function getTable(total_questions, callback){
        $.get("/g1polish/app/getTable.php?q=" + total_questions, function(data, status){
            $("#progress-table").html(data);
            callback();
        });
    }




    function getTableCorrect() {
        if(Cookies.get('table_correct')){
            table_correct = JSON.parse(Cookies.get('table_correct'));
        }
        else {
            table_correct = [9];
            Cookies.set('table_correct',JSON.stringify(table_correct), { expires: 30 });
        }
    }




    function getPosition(){
        if(Cookies.get('position')){
            position = Cookies.get('position');
        }
        else {
            position = 1;
            Cookies.set('position',position, { expires: 30 });
        }
    }




    function colorTable() {
        for(var i = 1; i < table_correct.length; i++){
            if(table_correct[i] == 0){
                $("#progress-table > div:nth-child("+i+")").css("background-color", "#ffb5bc");
            }
            else if(table_correct[i] == 1){
                $("#progress-table > div:nth-child("+i+")").css("background-color", "#b7dcff");
            }
            else if(table_correct[i] == 2){
                $("#progress-table > div:nth-child("+i+")").css("background-color", "#eeeeee");
            }
        }
        colorCurrent();
    }

    /**
     * Border current table div
     */
    function colorCurrent() {
        $(".current").removeClass("current");
        $("#progress-table > div:nth-child("+position+")").addClass("current");
    }


    /**
     * Reset button
     */
    $("body").on("click","#reset",function() {
        Cookies.remove('position');
        Cookies.remove('table_correct');
        Cookies.remove('question_array');
        Cookies.remove('error');
        location.reload();
    });

    /**
     * Set Is Mobile
     */
    function setIsMobile() {
        if($( window ).width()<992){
            is_mobile = true
        }
        else {
            is_mobile = false;
        }
        console.log(is_mobile);
    }

    /**
     * Set Error
     */
    function setVarError() {
        if(Cookies.get("error")){
            error = Cookies.get("error");
        }
        else{
            error = 0;
            Cookies.set("error",error, { expires: 30 });
        }
    }

    /**
     * Set progress
     */
    function setProgressBar(){
        if(is_mobile==true){
            $(".navbar-brand").after('<div class="btn btn-light">Error<span id="error" style="display: block;"></span></div><div class="btn btn-light">Progress<span id="progress" style="display: block;"></span></div>');
        }
        else {
            $("#progress-bar-computer").html('<div class="col-6"><strong>Error <span id="error"></span></strong></div><div class="col-6"><strong>Progress <span id="progress"></span></strong></div>');
        }
        setProgress();
        setError();
    }
    
    function setProgress() {
        $("#progress").html(position+"/"+total_questions);
    }

    function setError() {
        $("#error").html(error);
    }

});

