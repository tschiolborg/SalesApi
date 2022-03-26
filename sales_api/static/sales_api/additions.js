import { select, inc_dec_input } from './utils.js';

set_up_add();


function set_up_add() {

    var modal = document.getElementById("add_modal");
    var inner_modal_text = document.getElementById("add_selected_item");
    var items = document.getElementsByClassName("add_open_modal");
    var close_btn = document.getElementsByClassName("close")[0];
    var increase_btn = document.getElementById("add_increase");
    var decrease_btn = document.getElementById("add_decrease");
    var input_field = document.getElementById("add_count_input");
    var form = document.getElementById("add_form");

    // onclick for each item: open modal
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            set_select(this)
        }
    }

    // close modal
    close_btn.onclick = function () {
        set_select(null)
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            set_select(null)
        }
    }

    // set increase / decrease btns
    increase_btn.onclick = function () { inc_dec_input(true, input_field); }
    decrease_btn.onclick = function () { inc_dec_input(false, input_field); }

    function set_select(item) {
        select(item, modal, inner_modal_text);
        form.action = item == null ? "/sales_api/add_count/" : "/sales_api/add_count/" + item.id.slice(4) + "/";
        input_field.value = 0;
    }
}




