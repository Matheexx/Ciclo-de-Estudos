const input_content = window.document.getElementById("input_content");
const input_difficult = window.document.getElementById("input_difficult");
const input_hours_per_day = window.document.getElementById("input_hours_per_day");

const list_contents = window.document.getElementById("list_contents");

let contents = [];
let difficults = [];
let difficultsColor = [];

const result = window.document.getElementById("result");

function add() {
    if (verifyContent(input_content.value) && verifyDifficult(input_difficult.value) && verifyLastContent(input_content.value)) {
        result.innerHTML = "";
        const content = input_content.value;
        const difficult = Number(input_difficult.value);
        const difficultColor = diffColor(difficult);
        contents.push(content);
        difficults.push(difficult);
        difficultsColor.push(difficultColor);
        const option = window.document.createElement("option");
        option.setAttribute("style", `color: ${difficultColor}`);
        option.text = `${content} - dificuldade: ${difficult}`;
        list_contents.appendChild(option);
        clearInputs();
    }
}

function clearList() {
    list_contents.innerHTML = "";
    contents = [];
    difficults = [];
    difficultsColor = [];
    result.innerHTML = "";
}

function end() {
    if (verifyList() && verifyHoursPerDay(input_hours_per_day.value)) {
        const hoursPerDay = input_hours_per_day.value;
        const result_sumDifficult = sumDifficult(difficults);
        const hoursPerWeek = hoursPerDay * 7;
        const hoursPerContent = hoursPerWeek / result_sumDifficult;
        result.innerHTML = "<h3 style='font-size: 18px;'>Quantidade de horas de cada matéria a serem estudadas por ciclo(estudo de todas as matérias): <br> <br> </h3>";

        for (let i = 0; i < contents.length; i++) {
            const horas = ((difficults[i] * hoursPerContent).toFixed())
            if (horas == "1") {
                result.innerHTML += `<p><strong>* <span style="color: ${difficultsColor[i]}">${contents[i]}</span>: 1 hora por ciclo.</strong></p>`;
            }
            else {
                result.innerHTML += `<p><strong>* <span style="color: ${difficultsColor[i]}">${contents[i]}</span>: ${(difficults[i] * hoursPerContent).toFixed()} horas por ciclo.</strong></p>`;
            }
        }
    }
}

function verifyContent(content) {
    if (content.length) return true;
    window.alert("Complete o campo da matéria/conteúdo!");
}

function verifyDifficult(difficult) {
    if (difficult.length && Number(difficult) >= 1 && Number(difficult) <= 5) return true;
    window.alert("Complete corretamente o campo da dificuldade!");
}

function verifyLastContent(content) {
    if (contents.indexOf(content) == -1) return true;
    window.alert("Matéria já adicionada!");
    input_content.value = "";
}

function verifyList() {
    if (contents.length) return true;
    window.alert("Resultado inválido. Adicione a matéria/conteúdo a ser estudado!");
}

function verifyHoursPerDay(hoursperday) {
    if (hoursperday >= 1 && hoursperday <= 8) return true;
    else if (!hoursperday.length) {
        window.alert("Complete o campo de horas a serem estudadas diariamente");
    }
    else if (hoursperday < 1) {
        window.alert("Estude pelo menos 1 hora por dia!");
    }
    else if (hoursperday > 8) {
        window.alert("Vai com calma! Não recomendamos mais de 8 horas para serem estudadas diariamente.");
    }
}

function sumDifficult(difficults) {
    let sumResult = 0;
    for (let i = 0; i < difficults.length; i++) {
        sumResult += difficults[i];
    }
    return sumResult;
}

function diffColor(difficult) {
    switch (difficult) {
        case 1:
            return "rgb(0, 60, 255)";
        case 2:
            return "rgb(2, 211, 2)";
        case 3:
            return "yellow";
        case 4:
            return "rgb(255, 136, 0)";
        case 5:
            return "red";
    }
}

function clearInputs() {
    input_content.value = "";
    input_difficult.value = "";
}