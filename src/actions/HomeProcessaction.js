import { actionTypes } from '../Constants/Constants.js';

export const getAuthTokenRequest = (authData) => {
    return {
        type: actionTypes.GET_AUTH_TOKEN_REQUEST,
        payload:{
            auth_data: authData
        },
        isAuthTokenLoading: true
    }
};

export const getAuthTokenSuccess = (authToken) => {
    return {
        type: actionTypes.GET_AUTH_TOKEN_SUCCESS,
        user_auth_token: authToken,
        isAuthTokenLoading: false
    }
};

export const getServicesError = (error) => {
    return {
        type: actionTypes.FETCH_SERVICES_ERROR,
        ServiceDataFetchError: error
    }
};

export const getAuftragDataRequest = (auftragData, process) =>{
    return {
        type : actionTypes.GET_AUFTRAG_DATA_REQUEST,
        payload:{
            auftrag_data : auftragData,
            process: process
        },
        isAuftragDataLoading: true
    }
};

export const getAuftragDataSuccess = (auftragData) => {
    return {
        type: actionTypes.GET_AUFTRAG_DATA_SUCCESS,
        auftrag_data: auftragData,
        isAuftragDataLoading: false
    }
};

export const getFirstWeightDataRequest = (yardTicket, auth_token) => {
    return {
        type : actionTypes.GET_FIRST_WEIGHT_DATA_REQUEST,
        payload:{
            yard_ticket : yardTicket,
            auth_token: auth_token
        },
        isFirstWeightDataLoading: true
    }
};

export const getFirstWeightDataSuccess = (firstWeightData) => {
    return {
        type: actionTypes.GET_FIRST_WEIGHT_DATA_SUCCESS,
        first_weight_data: firstWeightData,
        isFirstWeightDataLoading: false
    }
};

export const saveSecondOrderDetailDataRequest = (orderDetailSecondData) => {
    return {
        type: actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_REQUEST,
        payload:{
            order_detail_data: orderDetailSecondData
        },
        isSecondOrderDetailDataLoading: true
    }
};

export const saveSecondOrderDetailDataSuccess = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_SUCCESS,
        order_second_detail_data: orderDetailData,
        isSecondOrderDetailDataLoading: false
    }
};

export const saveOrderDetailDataRequest = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_ORDER_DETAIL_DATA_REQUEST,
        payload:{
            order_detail_data: orderDetailData
        },
        isOrderDetailDataLoading: true
    }
};

export const saveOrderDetailDataSuccess = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_ORDER_DETAIL_DATA_SUCCESS,
        order_detail_data: orderDetailData,
        isOrderDetailDataLoading: false
    }
};

export const getVehicalIdRequest = (licencePlate) =>{
    return{
        type: actionTypes.GET_VEHICAL_ID_REQUEST,
        payload:{
            licence_place: licencePlate
        },
        isVehicalIdRequestLoading : true
    }
}

export const getVehicalIdSuccess = (vehicalIdData) =>{
    return{
        type: actionTypes.GET_VEHICAL_ID_SUCCESS,
        vehical_id_data: vehicalIdData,
        isVehicalIdRequestLoading: false
    }
};

export const saveTransactionDataRequest = (transactionData) =>{
    return{
        type: actionTypes.SAVE_TRANSACTION_DATA_REQUEST,
        payload:{
            transaction_data: transactionData
        },
        isTransactionDataRequestLoading : true
    }
}

export const saveTransactionDataSuccess = (transactionData) =>{
    return{
        type: actionTypes.SAVE_TRANSACTION_DATA_SUCCESS,
        transaction_data: transactionData,
        isTransactionDataRequestLoading: false
    }
};

export const getPdfDataRequest = (transportNumber, process) =>{
    return{
        type: actionTypes.GET_PDF_DATA_REQUEST,
        payload:{
            transport_number: transportNumber,
            process: process
        },
        isPdfDataRequestLoading : true
    }
};

export const getPdfDataSuccess = (pdfData) =>{
    return{
        type: actionTypes.GET_PDF_DATA_SUCCESS,
        pdf_data: pdfData,
        isPdfDataRequestLoading: false
    }
};

export const getVehicalListRequest = (transportNumber) => {
    return{
        type: actionTypes.GET_VEHICAL_LIST_REQUEST,
        payload:{
            transport_number: transportNumber
        },
        isVehicalListRequestLoading : true
    }
};

export const getVehicalListSuccess = (vehicalList) =>{
    return{
        type: actionTypes.GET_VEHICAL_LIST_SUCCESS,
        vehical_list: vehicalList,
        isVehicalListRequestLoading: false
    }
};

export const getTransactionIdRequest = (transporianNumber) => {
    return{
        type: actionTypes.GET_TRANSACTION_ID_REQUEST,
        payload: {
            transporian_number: transporianNumber
        },
        isTransactionIdReqLoading: true
    }
};

export const getTransactionIdSuccess = (transactionIdData) =>{
    return{
        type: actionTypes.GET_TRANSACTION_ID_SUCCESS,
        transaction_id: transactionIdData,
        isTransactionIdReqLoading: false
    }
};

export const saveSecondTransactionDataRequest = (transactionData) =>{
    return{
        type: actionTypes.SAVE_SECOND_TRANSACTION_DATA_REQUEST,
        payload:{
            transaction_data: transactionData
        },
        isSecondTransactionDataRequestLoading : true
    }
}

export const saveSecondTransactionDataSuccess = (transactionData) =>{
    return{
        type: actionTypes.SAVE_SECOND_TRANSACTION_DATA_SUCCESS,
        transaction_data: transactionData,
        isSecondTransactionDataRequestLoading: false
    }
};

export const savePdfDataToTransporianRequest = (pdfData) =>{
    return{
        type: actionTypes.SAVE_PDF_DATA_TO_TRANSPORIAN_REQUEST,
        payload: {
            pdf_data : pdfData
        },
        isPdfDataSavetoTransporianLoading: true
    }
};

export const savePdfDataToTransporianSuccess = (savedResponse) =>{
    return{
        type: actionTypes.SAVE_PDF_DATA_TO_TRANSPORIAN_SUCCESS,
        pdfSaveResponse: savedResponse,
        isPdfDataSavetoTransporianLoading: false
    }
};