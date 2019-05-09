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

$(document).ready(function(){
    loadQuestions();
});

function createAnswerChoice(choiceText) {
    var label = $('<label class="btn btn-primary">');
    var input = $('<input type="radio" name="options" autocomplete="off">');
    label.text(choiceText);
    $(label).append(input);
    return label;
}

function createAnswerDropdown() {
    var buttonGroup = $('<div class="btn-group btn-group-toggle" data-toggle="buttons">');
    buttonGroup.append(createAnswerChoice("Strongly Disagree"));
    buttonGroup.append(createAnswerChoice("Mildly Disagree"));
    buttonGroup.append(createAnswerChoice("Neutral"));
    buttonGroup.append(createAnswerChoice("Mildly Agree"));
    buttonGroup.append(createAnswerChoice("Strongly Agree"));
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
        qcolumna.append(createAnswerDropdown());
        qrow.append(qcolumna);
        qtable.append(qrow);
    }
}
