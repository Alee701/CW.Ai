function toggleBold() {
    let textarea = document.getElementById("textarea1");
    if (textarea.style.fontWeight === "bold") {
        textarea.style.fontWeight = "normal";
    } else {
        textarea.style.fontWeight = "bold";
    }
}

function toggleItalic() {
    let textarea = document.getElementById("textarea1");
    if (textarea.style.fontStyle === "italic") {
        textarea.style.fontStyle = "normal";
    } else {
        textarea.style.fontStyle = "italic";
    }
}

function toggleUnderline() {
    let textarea = document.getElementById("textarea1");
    if (textarea.style.textDecoration === "underline overline") {
        textarea.style.textDecoration = "none";
    } else {
        textarea.style.textDecoration = "underline overline";
    }
}

function LAlign() {
    document.getElementById("textarea1").style.textAlign = "left";
}

function CAlign() {
    document.getElementById("textarea1").style.textAlign = "center";
}

function RAlign() {
    document.getElementById("textarea1").style.textAlign = "right";
}

function UpperLine() {
    document.getElementById("textarea1").style.textTransform = "uppercase";
}

function LowerLine() {
    document.getElementById("textarea1").style.textTransform = "lowercase";
}

function changeFontSize(size) {
    document.getElementById("textarea1").style.fontSize = size;
}

function changeFontColor(color) {
    document.getElementById("textarea1").style.color = color;
}

function changeBgColor(color) {
    document.getElementById("textarea1").style.backgroundColor = color;
}

function changeFontFamily(font) {
    document.getElementById("textarea1").style.fontFamily = font;
}
