// helper function for adding 2 decimal places
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // calculate item price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + (item.price * item.qty), 0
        )
    );

    // calculate shipping price: 
    // "If order is > $100, shipping is free; else, $10 shipping"
    state.shippingPrice = addDecimals(
        state.itemsPrice > 100 ? 0 : 10
    );

    // calculate tax price: 15%
    state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
    );

    // calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // save to local storage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};