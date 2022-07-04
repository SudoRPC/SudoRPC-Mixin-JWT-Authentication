/**
 * @author WMXPY
 * @namespace JWTAuthentication
 * @description JWT Authentication
 */

import { ISudoRPCService, SudoRPCServiceMixin } from "@sudorpc/core";

export const createSudoRPCMixinJWTAuthentication = <Metadata, Payload, SuccessResult, FailResult>():
    SudoRPCServiceMixin<Metadata, Payload, SuccessResult, FailResult> => {

    return (
        service: ISudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
    ) => {


    };
};
