/**
 * @author WMXPY
 * @namespace Service
 * @description Echoer
 * @override Mock
 */

import { JWTToken } from "@sudoo/jwt";
import { SudoRPCEndpointHandlerHelper, SudoRPCEndpointResource, SudoRPCEndpointResourceHandlerReturn, SudoRPCHandlerContext, SudoRPCService } from "@sudorpc/core";
import { createSudoRPCMixinJWTAuthentication, SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName } from "../../src";

export const createEchoerService = (publicKey: string): SudoRPCService<any, any, any, any> => {

    const service: SudoRPCService<any, any, any, any> = SudoRPCService.create("echoer");

    service.useMixin(
        createSudoRPCMixinJWTAuthentication(publicKey),
    );

    service.register(
        SudoRPCEndpointResource.create("echo", (
            context: SudoRPCHandlerContext<any, any>,
            helper: SudoRPCEndpointHandlerHelper<any, any, any, any>,
        ): SudoRPCEndpointResourceHandlerReturn<any, any> => {

            const token: JWTToken = context.getDefaultContext("token");

            return helper.createSuccessReturn(
                {
                    token: token.rawToken,
                },
            );
        }, {
            dependencies: [
                SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName,
            ],
            exposed: true,
        }),
    );

    return service;
};
