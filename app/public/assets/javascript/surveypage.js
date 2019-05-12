var questions = [
    {id: 1, question: "I have a good relationship with my mother"},
    {id: 2, question: "I usually follow my heart more than my head"},
    {id: 3, question: "Its easy to forgive people that don't deserve it"},
    {id: 4, question: "I like scary movies" },
    {id: 5, question: "I would like to travel to another country alone"},
    {id: 6, question: "How important politics are to you?"},
    {id: 7, question: "Do you see your family often?"},
    {id: 8, question: "I am more introverted than extroverted"},
    {id: 9, question: "I have a good relationship with my father"},
    {id: 10, question: "When a group of my friends goes somewhere, I am the one driving"}];

var surveyData = {
    name: null,
    picFile: null,
    answers: []
};

$(document).ready(function(){
    loadQuestions();
    // Reset things...
    surveyData.name = null;
    surveyData.picFile = null;
    surveyData.answers = [];
    $("#survey-submit").hide();
});

function createAnswerChoice(choiceText,questionId,responseId) {
    var label = $('<label class="btn btn-primary btn-survey-response" data-questionId="'+
    questionId + '" data-responseId="' + responseId + '">');
    var input = $('<input type="radio" name="options" autocomplete="off">');
    label.text(choiceText);
    $(label).append(input);
    return label;
}

function createAnswerDropdown(questionId) {
    var buttonGroup = $('<div class="btn-group btn-group-toggle" data-toggle="buttons">');
    buttonGroup.append(createAnswerChoice("Strongly Disagree",questionId,1));
    buttonGroup.append(createAnswerChoice("Mildly Disagree",questionId,2));
    buttonGroup.append(createAnswerChoice("Neutral",questionId,3));
    buttonGroup.append(createAnswerChoice("Mildly Agree",questionId,4));
    buttonGroup.append(createAnswerChoice("Strongly Agree",questionId,5));
    return buttonGroup;
}

function loadQuestions() {
    var qtable = $("#question-block");
    qtable.empty();
    var qrow = $("<div class='row'>");
    var qcolumnq = $("<div class='col-7'>");
    var qspan = $('<span class="qheader">').text("Question");
    qcolumnq.append(qspan);
    qrow.append(qcolumnq);
    var qcolumna = $("<div class='col-4'>");
    var aspan = $('<span class="qheader">').text("Answer");
    qcolumna.append(aspan);
    qrow.append(qcolumna);
    qtable.append(qrow);
 
    for (var i=0; i<questions.length; i++) {
        var qrow = $("<div class='row'>");
        var qcolumnq = $("<div class='col-7'>");
        var qspan = $('<span class="question">').text(questions[i].question);
        qcolumnq.append(qspan);
        qrow.append(qcolumnq);
        var qcolumna = $("<div class='col-4'>");
        qcolumna.append(createAnswerDropdown(i));
        qrow.append(qcolumna);
        qtable.append(qrow);
    }
}

function checkIfComplete() {
    var complete = true;

    if (surveyData.answers.length < 10) {
        complete = false;
    }
    else {
        for (var i=0; i<surveyData.answers.length; i++) {
            if (surveyData.answers[i] == undefined ||
                surveyData.answers[i] == NaN) {
                    complete = false;
                    break;
                }
        }
    }

    var name = $("#survey-name").val();
    if (name == undefined) {
        complete = false;;
    }
    else {
        surveyData.name = name;
    }

    if (surveyData.picFile == undefined) {
        complete = false;
    }

    if (complete) {
        $("#survey-submit").show();
    }
    else {
        $("#survey-submit").hide();
    }
}

$("#question-block").on("click",".btn-survey-response",function(event) {
    var questionId = parseInt($(this).data("questionid"));
    var responseVal = parseInt($(this).data("responseid"));
    surveyData.answers[questionId] = responseVal;

    checkIfComplete();
});

document.getElementById('survey-picture').addEventListener('change', function(){
     surveyData.picFile = this.files[0].name;
     checkIfComplete();
});

$("#picture-form").submit(function(event) {
    event.preventDefault();

    var data = new FormData();
    $.each($('#survey-picture')[0].files, function(i, file) {
        console.log("file",file);
        data.append('file-'+i, file);
    });

    $.ajax({
        url: '/api/uploadfile',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data){
            console.log("success",data);
        }
    });
});

$("#survey-submit").on("click",function(event) {
    // Post the survey.
    event.preventDefault();

    $.ajax({
        url: '/api/friends',
        data: surveyData,
        method: 'POST'
      }).then(function(data) {
        showMatch(data);
      });
});

function showMatch(match) {
    $("#result-form").css("display","block");
    $("#best-friend-name").text(match.name);
    var matchpic = $(`<img src="assets/profilepics/${match.picFile}" class="profile-pic" alt="profile picture"</img>`);
    console.log($("#result-form"));
    $("#result-form").append(matchpic);    
};
