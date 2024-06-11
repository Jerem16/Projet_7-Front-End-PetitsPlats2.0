export function save_SStorage(filters) {
    return sessionStorage.setItem("filters", JSON.stringify(filters));
}
export function get_SStorage() {
    return (
        JSON.parse(sessionStorage.getItem("filters")) || {
            ingredients: [],
            appliance: [],
            utensils: [],
            main: [],
        }
    );
}
export function remove_SStorage() {
    return sessionStorage.removeItem("filters");
}