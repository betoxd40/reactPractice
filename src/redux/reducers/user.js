// Actions
const CHANGE_HANDLER = 'CHANGE_HANDLER';
const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
const CLEAR_INPUT_DATA = 'CLEAR_INPUT_DATA';

const initialState = {
    name: '',
    surname: '',
    country: 'Countries',
    birthday: null,
    people: [],
    countriesFetch: [],
    birthdayAux: null,
};

export default function reducer( state = initialState, action = {} ) {
    switch ( action.type ) {
        case CHANGE_HANDLER: {
            localStorage.setItem(action.payload.name, action.payload.value);
            return { ...state, [action.payload.name]: action.payload.value,  };
        }
        case CLEAR_INPUT_DATA:
            return { ...state, name: '', surname: '', country: 'Countries', birthday: null, birthdayAux: null,};
        case HANDLE_SUBMIT:
            return { ...state, people: state.people.concat(action.payload), };
        case ITEMS_FETCH_DATA_SUCCESS:
            return { ...state, countriesFetch: action.payload, };
        default:
            return state;
    }
}

// Actions Creators

export function handleChange( change ) {
    return {
        type: CHANGE_HANDLER,
        payload: change,
    };
}

export function clearInputData( ) {
    return {
        type: CLEAR_INPUT_DATA,
    };
}

export function handleSubmit( user ) {
    return {
        type: HANDLE_SUBMIT,
        payload: user,
    };
}

export function itemsFetchDataSuccess(countries) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        payload: countries,
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
    };
}