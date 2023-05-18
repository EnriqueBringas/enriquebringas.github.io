function IsAlphaNumeric(input) {
    let value = input.value;
    let numbers = value.replace(/[^A-Za-z0-9]/g, "");
    input.value = numbers;
}

function MessageOk(message) {
    $.alert({
        title: "Aviso",
        icon: "fa fa-info",
        type: "green",
        content: message,
    });
}

function MessageError(message) {
    $.alert({
        title: "Aviso",
        icon: "fa fa-exclamation",
        type: "red",
        content: message,
    });
}