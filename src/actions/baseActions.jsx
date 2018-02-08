export const increment = () => {
    return {
        type: 'INCREMENT'
    };
};

export const incrementAsync = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment());
        }, 2000);
    };
};