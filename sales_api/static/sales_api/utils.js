
// set selected item
export function select(item, modal, inner_modal_text) {
    modal.style.display = item == null ? "none" : "block";
    inner_modal_text.innerHTML = item == null ? "" : item.innerHTML;
}


// increase or decrease input field
export function inc_dec_input(inc, input_field, minimum = 0) {
    var v = parseInt(input_field.value);
    input_field.value = inc ? v + 1 : Math.max(v - 1, minimum);
}
