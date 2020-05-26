export function debounce(fn, ms) {
    let idDebounce = null;
    return function (...args) {
        clearTimeout(idDebounce);
        idDebounce = setTimeout(function(){
            fn.apply(this, args);
        }, ms);
    };
}