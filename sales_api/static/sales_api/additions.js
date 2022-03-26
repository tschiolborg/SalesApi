var modal = document.getElementById("add_modal");
var inner_modal_text = document.getElementById("add_selected_item");
var items = document.getElementsByClassName("add_open_modal");
var close_btn = document.getElementsByClassName("close")[0];
var selected_item = null;

// onclick for each item: open modal
for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
        select(this);
    }
}

// close modal
close_btn.onclick = function () {
    select(null);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        select(null);
    }
}

// set selected item
function select(item) {
    selected_item = item;
    modal.style.display = item == null ? "none" : "block";
    inner_modal_text.innerHTML = item == null ? "" : selected_item.innerHTML;
}
