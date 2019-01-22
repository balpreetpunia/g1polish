$(document).ready(function(){

    var position;
    var total_questions;
    var table_correct;
    var question_array = [];
    var is_mobile;
    var error;

    getTotalQuestions();
    setIsMobile();
    getQuestionArray();
    getPosition();
    setVarError();
    getTableCorrect();
    getQuestion(setProgress());
    if(!is_mobile){getTable(total_questions,colorTable);}
    setProgressBar();

    function getTotalQuestions() {
        if(Cookies.get("total_questions")){
            total_questions = Cookies.get("total_questions");
        }
        else{
            total_questions = 40;
        }
    }

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

        $(".correct > i").removeClass("fa-circle");
        $(".correct > i").addClass("fa-dot-circle");
        $("#options").css("pointer-events","none");

        if($(this).is(correct)) {
            if(!is_mobile){$("#progress-table > div:nth-child("+position+")").css("background-color", "#b7dcff");}
            table_correct[position] = 1;
            Cookies.set('table_correct',JSON.stringify(table_correct));
        }
        else{
            if(!is_mobile){$("#progress-table > div:nth-child("+position+")").css("background-color", "#ffb5bc");}
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
        resetStyle();
        $("#skip-button").prop("hidden",false);
        $("#next-button").prop("hidden",true);
        if(!checkFinish()){
            getQuestion(setProgress());
            if(!is_mobile){colorCurrent();}
        }
    });




    /**
     * Skip button
     */
    $("body").on("click","#skip-button",function(){
        resetStyle();
        if(!is_mobile){$("#progress-table > div:nth-child("+position+")").css("background-color", "#eeeeee");}
        table_correct[position] = 2;
        Cookies.set('table_correct',JSON.stringify(table_correct));
        position++;
        error++;
        Cookies.set('position',position);
        Cookies.set('error',error);
        setError();
        if(!checkFinish()){
            if(!is_mobile){colorCurrent();}
            getQuestion(setProgress());
        }
    });

    $("body").on("click touchstart","body",function(){

    });




    /**
     * Get next question
     */
    function getQuestion(callback){
        $.getJSON("public/javascripts/data.json", function(data) {
            //console.log(data);
            var dataPosition = question_array[position-1];
            var correct = data[dataPosition].correct;
            $("#question > div > strong").html(data[dataPosition].question);
            $("#optiona > span ").html('&nbsp;'+data[dataPosition].optiona);
            $("#optionb > span ").html('&nbsp;'+data[dataPosition].optionb);
            $("#optionc > span ").html('&nbsp;'+data[dataPosition].optionc);
            $("#optiond > span ").html('&nbsp;'+data[dataPosition].optiond);
            $("#options > div:nth-child("+correct+")").addClass("correct");
            if(callback) callback();
        });
    }




    /**
     * Get table
     */
    function getTable(total_questions, callback) {
        var data ="";
        for(var i=1;i<=total_questions;i++){
            data += '<div>'+i+'</div>';
        }
        $("#progress-table").html(data);
        callback();
    }



    /**
     * Get table_correct from cookie or create one
     */
    function getTableCorrect() {
        if(Cookies.get('table_correct')){
            table_correct = JSON.parse(Cookies.get('table_correct'));
        }
        else {
            table_correct = [9];
            Cookies.set('table_correct',JSON.stringify(table_correct), { expires: 30 });
        }
    }


    /**
     * get Position from cookie or create one
     */
    function getPosition(){
        if(Cookies.get('position')){
            position = Cookies.get('position');
        }
        else {
            position = 1;
            Cookies.set('position',position, { expires: 30 });
        }
    }


    /**
     * Color table divs
     */
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
    $("body").on("click","#reset, #reset-mb",function() {
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
        if($( window ).width()<768){
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
     * Set progress bar
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

    /**
     * Set Progress
     */
    function setProgress() {
        $("#progress").html(position+"/"+total_questions);
    }

    /**
     * Set error
     */
    function setError() {
        $("#error").html(error);
    }

    function resetStyle() {
        $(".correct > i").removeClass("fa-dot-circle");
        $(".correct > i").addClass("fa-circle");
        $("#options, #optiona, #optionb, #optionc, #optiond").removeAttr("style");
        $("#optiona, #optionb, #optionc, #optiond").removeClass("correct");
    }

    function checkFinish() {
        if (position > total_questions){
            console.log('Finished');
            console.log('Errors ' + error);
            console.log('Correct ' + (total_questions - error));
            $("#quiz").css("display","none");
            Cookies.remove('position');
            Cookies.remove('table_correct');
            Cookies.remove('question_array');
            Cookies.remove('error');
            return true;
        }
    }
});

