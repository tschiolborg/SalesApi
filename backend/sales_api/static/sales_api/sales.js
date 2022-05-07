import { select, inc_dec_input } from './utils.js';

set_up_sales();


function set_up_sales() {
    // this sets up the modal for adding products

    var modal = document.getElementById("sales_modal");
    var inner_modal_text = document.getElementById("sales_selected_item");
    var items = document.getElementsByClassName("sales_open_modal");
    var close_btn = document.getElementById("sales_close");
    var increase_btn = document.getElementById("sales_increase");
    var decrease_btn = document.getElementById("sales_decrease");
    var input_field = document.getElementById("sales_count_input");
    var price_text = document.getElementById("sales_price");
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
    decrease_btn.onclick = function () { inc_dec_input(false, input_field, 1); }

    function set_select(item) {
        // sets the selected item

        select(item, modal, inner_modal_text);
        input_field.value = 1;
        if (item != null) {
            var id = item.id.slice(6);
            var price = document.getElementsByClassName("sales_price_" + id)[0].id.slice(12);
            form.action = "/sales_api/sales/" + id + "/";
            price_text.innerHTML = price;
        } else {
            form.action = "/sales_api/sales/";
            price_text.innerHTML = "none";
            input_field.value = 1;
        }
    }
}




