import { select, inc_dec_input } from './utils.js';

set_up_sales();


function set_up_sales() {

    var modal = document.getElementById("sales_modal");
    var inner_modal_text = document.getElementById("sales_selected_item");
    var items = document.getElementsByClassName("sales_open_modal");
    var close_btn = document.getElementById("sales_close");
    var increase_btn = document.getElementById("sales_increase");
    var decrease_btn = document.getElementById("sales_decrease");
    var input_field = document.getElementById("sales_count_input");
    var form = document.getElementById("sales_form");

    // onclick for each item: open modal
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () { set_select(this); }
    }

    // close modal
    close_btn.onclick = function () { set_select(null); }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            set_select(null)
        }
    });

    // set increase / decrease btns
    increase_btn.onclick = function () { inc_dec_input(true, input_field); }
    decrease_btn.onclick = function () { inc_dec_input(false, input_field); }

    function set_select(item) {
        select(item, modal, inner_modal_text);
        form.action = item == null ? "/sales_api/sales/" : "/sales_api/sales/" + item.id.slice(4) + "/";
        input_field.value = 0;
    }
}




