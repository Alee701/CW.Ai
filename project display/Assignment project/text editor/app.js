function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

function toggleBold() {
    execCommand("bold");
}

function toggleItalic() {
    execCommand("italic");
}

function toggleUnderline() {
    execCommand("underline");
}

function LAlign() {
    execCommand("justifyLeft");
}

function CAlign() {
    execCommand("justifyCenter");
}

function RAlign() {
    execCommand("justifyRight");
}

function UpperLine() {
    let selection = window.getSelection().toString();
    if (selection) {
        execCommand("insertText", selection.toUpperCase());
    }
}

function Lowerline() {
    let selection = window.getSelection().toString();
    if (selection) {
        execCommand("insertText", selection.toLowerCase());
    }
}

function changeFontColor() {
    const color = document.getElementById("fontColor").value;
    execCommand("foreColor", color);
}

function changeBgColor() {
    const color = document.getElementById("bgColor").value;
    execCommand("hiliteColor", color);
}

function changeFontSize() {
    const size = document.getElementById("fontSize").value;
    execCommand("fontSize", size);
}

function resetFormatting() {
    const textarea = document.getElementById("textarea1");
    textarea.innerHTML = textarea.innerText;
}

function copyText() {
    execCommand("copy");
}

function cutText() {
    execCommand("cut");
}

function pasteText() {
    execCommand("paste");
}

function saveText() {
    const text = document.getElementById("textarea1").innerHTML;
    const blob = new Blob([text], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadText() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/html';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            document.getElementById("textarea1").innerHTML = event.target.result;
            updateWordCount();
        };
        reader.readAsText(file);
    };
    input.click();
}

function undoAction() {
    execCommand('undo');
}

function redoAction() {
    execCommand('redo');
}

function updateWordCount() {
    const text = document.getElementById("textarea1").innerText;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById("wordCount").innerText = "Word Count: " + wordCount;
}

document.getElementById("textarea1").addEventListener("input", updateWordCount);
