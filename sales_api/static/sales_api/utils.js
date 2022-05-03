

export function select(item, modal, inner_modal_text) {
    // set selected item

    modal.style.display = item == null ? "none" : "block";
    inner_modal_text.innerHTML = item == null ? "" : item.innerHTML;
}


export function inc_dec_input(inc, input_field, minimum = 0) {
    // increase or decrease input field

    var v = parseInt(input_field.value);
    input_field.value = inc ? v + 1 : Math.max(v - 1, minimum);
}
