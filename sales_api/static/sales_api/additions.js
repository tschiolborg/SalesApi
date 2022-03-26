var modal = document.getElementById("add_modal");
var inner_modal_text = document.getElementById("add_selected_item");
var items = document.getElementsByClassName("add_open_modal");
var close_btn = document.getElementsByClassName("close")[0];
var increase_btn = document.getElementById("add_increase");
var decrease_btn = document.getElementById("add_decrease");
var input_field = document.getElementById("add_count_input");
var add_form = document.getElementById("add_form");
var selected_item = null;

// onclick for each item: open modal
for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
        select(this);
    }
}

// close modal
close_btn.onclick = function () { select(null); }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        select(null);
    }
}

// set increase / decrease btns
increase_btn.onclick = function () { inc_dec_input(true); }
decrease_btn.onclick = function () { inc_dec_input(false); }

// set selected item
function select(item) {
    selected_item = item;
    modal.style.display = item == null ? "none" : "block";
    inner_modal_text.innerHTML = item == null ? "" : "Add " + selected_item.innerHTML;
    add_form.action += item == null ? "" : item.id.slice(4) + "/";
}

// increase or decrease input field
function inc_dec_input(inc) {
    var v = parseInt(input_field.value);
    input_field.value = inc ? v + 1 : Math.max(v - 1, 0);
}
