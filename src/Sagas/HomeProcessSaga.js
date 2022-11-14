import { call, put } from 'redux-saga/effects';
import {
    fetchUserAuthentication,
    fetchAuftragData,
    saveOderDetailDataToDB,
    fetchFirstWeightData,
    saveSecondOderDetailDataToDB,
    getVehicalIdDataFromDB,
    saveTransactionDataToDB,
    getVehicalListFromDB,
    getpdfFromDB,
    fetchTransactionIdData,
    saveSecondTransactionDataToDB,
    savePdfDataToTransporian
} from '../api/HomeProcessApi';

import * as actions from '../actions/index';

/***************** - GET AUTH CODE SAGA - *************************/
export function* fetchUserAuthTokenSaga(action) {
    try {
        // const authCode = yield call(fetchUserAuthentication, action.payload.auth_data);
        const authCode = yield call(fetchUserAuthentication, action.payload.auth_data);
        yield put(actions.getAuthTokenSuccess(authCode));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET AUFTRAG SAGA - *************************/
export function* fetchAuftragSaga(action) {
    try {
        const AuftragData = yield call(fetchAuftragData, action.payload.auftrag_data, action.payload.process);
        yield put(actions.getAuftragDataSuccess(AuftragData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET FIRST WEIGHT DATA SAGA - *************************/
export function* fetchFirstWeightDataSaga(action) {
    try {
        const FirstWeightgData = yield call(fetchFirstWeightData, action.payload.yard_ticket, action.payload.auth_token);
        yield put(actions.getFirstWeightDataSuccess(FirstWeightgData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE ORDER DETAIL SAGA - *************************/
export function* saveOrderDetailSaga(action) {
    try {
        const orderDetailStatus = yield call(saveOderDetailDataToDB, action.payload.order_detail_data);
        yield put(actions.saveOrderDetailDataSuccess(orderDetailStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE SECOND ORDER DETAIL SAGA - *************************/
export function* saveSecondOrderDetailSaga(action) {
    try {
        const orderDetailStatus = yield call(saveSecondOderDetailDataToDB, action.payload.order_detail_data);
        yield put(actions.saveSecondOrderDetailDataSuccess(orderDetailStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET VEHICAL ID SAGA - *************************/
export function* getVehicalIDSaga(action) {
    try {
        const vehicalIDdata = yield call(getVehicalIdDataFromDB, action.payload.licence_place);
        yield put(actions.getVehicalIdSuccess(vehicalIDdata));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE TRANSACTION DATA SAGA - *************************/
export function* saveTransactionDataSaga(action) {
    try {
        const transactionDataStatus = yield call(saveTransactionDataToDB, action.payload.transaction_data);
        yield put(actions.saveTransactionDataSuccess(transactionDataStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET PDF DATA SAGA - *************************/
export function* getPdfDataSaga(action) {
    try {
        const pdfdata = yield call(getpdfFromDB, action.payload.transport_number, action.payload.process);
        yield put(actions.getPdfDataSuccess(pdfdata));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET VEHICAL LIST DATA SAGA - *************************/
export function* getVehicalListDataSaga(action) {
    try {
        const vehicalListData = yield call(getVehicalListFromDB, action.payload.transport_number);
        yield put(actions.getVehicalListSuccess(vehicalListData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET TRANSACTION ID DATA SAGA - *************************/
export function* getTransactionIdDataSaga(action) {
    try {
        const transactionIdData = yield call(fetchTransactionIdData, action.payload.transporian_number);
        yield put(actions.getTransactionIdSuccess(transactionIdData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE TRANSACTION DATA SAGA - *************************/
export function* saveSecondTransactionDataSaga(action) {
    try {
        const transactionDataStatus = yield call(saveSecondTransactionDataToDB, action.payload.transaction_data);
        yield put(actions.saveSecondTransactionDataSuccess(transactionDataStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE PDF DATA TO TRANSPORIAN SAGA - *************************/
export function* savePdfDataToTransporianSaga(action) {
    try {
        const pdfDataStatus = yield call(savePdfDataToTransporian, action.payload.pdf_data);
        yield put(actions.savePdfDataToTransporianSuccess(pdfDataStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}