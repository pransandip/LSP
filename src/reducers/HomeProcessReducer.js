import { actionTypes } from '../Constants/Constants';

const initialState = {
    isLoading: false,
};

export const HomeProcessReducers = (state = initialState, action) => {
    switch (action.type) {

        /***************** - get Auth Code Reducer - *************************/
        case actionTypes.GET_AUTH_TOKEN_REQUEST:
            return { ...state, isAuthTokenLoading: action.isAuthTokenLoading };

        case actionTypes.GET_AUTH_TOKEN_SUCCESS:
            return {
                ...state,
                user_auth_token: action.user_auth_token,
                isAuthTokenLoading: false
            };

        /***************** - get Auftrag value Reducer - *************************/
        case actionTypes.GET_AUFTRAG_DATA_REQUEST:
            return { ...state, isAuftragDataLoading: action.isAuftragDataLoading };

        case actionTypes.GET_AUFTRAG_DATA_SUCCESS:
            return {
                ...state,
                auftrag_data: action.auftrag_data,
                isAuftragDataLoading: false
            };

        /***************** - get First Weight Data Reducer - *************************/
        case actionTypes.GET_FIRST_WEIGHT_DATA_REQUEST:
            return { ...state, isFirstWeightDataLoading: action.isFirstWeightDataLoading };

        case actionTypes.GET_FIRST_WEIGHT_DATA_SUCCESS:
            return {
                ...state,
                first_weight_data: action.first_weight_data,
                isFirstWeightDataLoading: false
            };

        /***************** - save Order detail status Reducer - *************************/
        case actionTypes.SAVE_ORDER_DETAIL_DATA_REQUEST:
            return { ...state, isOrderDetailDataLoading: action.isOrderDetailDataLoading };

        case actionTypes.SAVE_ORDER_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                order_detail_data: action.order_detail_data,
                isOrderDetailDataLoading: false
            };

        /***************** - save Second Order detail status Reducer - *************************/
        case actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_REQUEST:
            return { ...state, isSecondOrderDetailDataLoading: action.isSecondOrderDetailDataLoading };

        case actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                order_second_detail_data: action.order_second_detail_data,
                isSecondOrderDetailDataLoading: false
            };

        /***************** - get vehical ID data Reducer - *************************/
        case actionTypes.GET_VEHICAL_ID_REQUEST:
            return { ...state, isVehicalIdRequestLoading: action.isVehicalIdRequestLoading };

        case actionTypes.GET_VEHICAL_ID_SUCCESS:
            return {
                ...state,
                vehical_id_data: action.vehical_id_data,
                isVehicalIdRequestLoading: false
            };

        /***************** - save transaction data Reducer - *************************/
        case actionTypes.SAVE_TRANSACTION_DATA_REQUEST:
            return { ...state, isTransactionDataRequestLoading: action.isTransactionDataRequestLoading };

        case actionTypes.SAVE_TRANSACTION_DATA_SUCCESS:
            return {
                ...state,
                transaction_data: action.transaction_data,
                isTransactionDataRequestLoading: false
            };

        /***************** - get pdf data Reducer - *************************/
        case actionTypes.GET_PDF_DATA_REQUEST:
            return { ...state, isPdfDataRequestLoading: action.isPdfDataRequestLoading };

        case actionTypes.GET_PDF_DATA_SUCCESS:
            return {
                ...state,
                pdf_data: action.pdf_data,
                isPdfDataRequestLoading: false
            };

        /***************** - get vehical data Reducer - *************************/
        case actionTypes.GET_VEHICAL_LIST_REQUEST:
            return { ...state, isVehicalListRequestLoading: action.isVehicalListRequestLoading };

        case actionTypes.GET_VEHICAL_LIST_SUCCESS:
            return {
                ...state,
                vehical_list: action.vehical_list,
                isVehicalListRequestLoading: false
            };

        /***************** - get transaction id Reducer - *************************/
        case actionTypes.GET_TRANSACTION_ID_REQUEST:
            return { ...state, isTransactionIdReqLoading: action.isTransactionIdReqLoading };

        case actionTypes.GET_TRANSACTION_ID_SUCCESS:
            return {
                ...state,
                transaction_id: action.transaction_id,
                isTransactionIdReqLoading: false
            };

        /***************** - save second transaction data Reducer - *************************/
        case actionTypes.SAVE_SECOND_TRANSACTION_DATA_REQUEST:
            return { ...state, isSecondTransactionDataRequestLoading: action.isSecondTransactionDataRequestLoading };

        case actionTypes.SAVE_SECOND_TRANSACTION_DATA_SUCCESS:
            return {
                ...state,
                transaction_data: action.transaction_data,
                isSecondTransactionDataRequestLoading: false
            };

        /***************** - save PDF data to transporian Reducer - *************************/
        case actionTypes.SAVE_PDF_DATA_TO_TRANSPORIAN_REQUEST:
            return { ...state, isPdfDataSavetoTransporianLoading: action.isPdfDataSavetoTransporianLoading };

        case actionTypes.SAVE_PDF_DATA_TO_TRANSPORIAN_SUCCESS:
            return {
                ...state,
                pdfSaveResponse: action.pdfSaveResponse,
                isPdfDataSavetoTransporianLoading: false
            };
        default:
            return state;
    }
};