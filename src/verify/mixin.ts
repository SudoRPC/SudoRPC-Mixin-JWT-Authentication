/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Mixin
 */

import { ISudoRPCService, SudoRPCMiddlewareResource, SudoRPCServiceMixin } from "@sudorpc/core";
import { SudoRPCMixinJWTAuthenticationVerifyConfig } from "./declare";
import { createSudoRPCMixinJWTAuthenticationVerifyResource } from "./resource";

export const createSudoRPCMixinJWTAuthentication = <Metadata, Payload, SuccessResult, FailResult>(
    publicKey: string,
    config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>,
):
    SudoRPCServiceMixin<Metadata, Payload, SuccessResult, FailResult> => {

    return (
        service: ISudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
    ): void => {

        const resource: SudoRPCMiddlewareResource<Metadata, Payload, FailResult> =
            createSudoRPCMixinJWTAuthenticationVerifyResource(publicKey, config);

        service.register(resource);
        return;
    };
};
