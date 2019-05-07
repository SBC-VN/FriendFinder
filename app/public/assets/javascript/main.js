var questions = [{id:1,question: "who are you?"},{id:2,question:"What is your favorite color?"}];

$(document).ready(function(){
    loadQuestions();
});

function createAnswerDropdown() {
    var button = $('<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').text("Answers");
    var choicediv = $('<div class="dropdown-menu">');
    choicediv.append($('<a class="dropdown-item" href="#">1 - Strongly Disagree</a>'));
    choicediv.append($('<a class="dropdown-item" href="#">1 - Mildly Disagree</a>'));
    choicediv.append($('<a class="dropdown-item" href="#">3 - Neutral</a>'));
    choicediv.append($('<a class="dropdown-item" href="#">1 - Mildly Agree</a>'));
    choicediv.append($('<a class="dropdown-item" href="#">5 - Strongly Agree</a>'));
    button.append(choicediv);
    return button;
}

function loadQuestions() {
    var qtable = $("#question-block");
    qtable.empty();
    var qrow = $("<div class='row'>");
    var qcolumnq = $("<div class='col-8'>").text("Question");
    qrow.append(qcolumnq);
    var qcolumna = $("<div class='col-4'>").text("Answer");
    qrow.append(qcolumna);
    qtable.append(qrow);
 
    console.log(questions.length);
    for (var i=0; i<questions.length; i++) {
        console.log(questions[i]);
        var qrow = $("<div class='row'>");
        var qcolumnq = $("<div class='col-8'>").text(questions[i].question);
        qrow.append(qcolumnq);
        var qcolumna = $("<div class='col-4'>");
        qcolumna.append(createAnswerDropdown());
        qrow.append(qcolumna);
        qtable.append(qrow);
    }
}
