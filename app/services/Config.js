/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


mainApp.constant('cfg', {
    url: "http://localhost:8080/SpringDataSchool",
    httpTimeout: 5000,
    ROLES: {
        admin: 'SYS_ADMIN',
        user: 'SYS_USER',
        guest: 'SYS_GUEST'
    },
    LOGIN_TYPE: {
        facebook: 'FACEBOOK',
        gmail: 'GMAIL',
        twitter: 'TWITTER',
        registered: 'REGISTERED'
    },
    VENDOR_TYPE: {
        photographer: 'PHOTOGRAPHER',
        caterer: 'CATERER',
        dressdesigner: 'DRESSDESIGNER'
    },
    USER_TYPE: {
        consumer: 'CONSUMER',
        vendor: 'VENDOR'
    }
    //global constants

});