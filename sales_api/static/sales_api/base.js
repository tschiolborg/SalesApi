var collapsible_btns = document.getElementsByClassName("collapsible");

for (var i = 0; i < collapsible_btns.length; i++) {
    collapsible_btns[i].addEventListener("click", open_content);
}

function open_content() {
    // close and return if open
    if (this.className.includes("active")) {
        collapse(this);
        return;
    }

    // close active elm
    var active_elms = document.getElementsByClassName("active");
    if (active_elms.length > 0) {
        collapse(active_elms[0]);
    }

    // open this elm
    this.className += " active";
    var content = this.nextElementSibling;
    content.style.maxHeight = content.scrollHeight + "px";
}

function collapse(elm) {
    // collapse this elm
    elm.className = elm.className.replace(" active", "");
    elm.nextElementSibling.style.maxHeight = null;
}
