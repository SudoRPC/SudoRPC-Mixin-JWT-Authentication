/**
 * @author WMXPY
 * @namespace Service
 * @description Echoer
 * @override Mock
 */

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

            return helper.createSuccessReturn(
                context.getDefaultContextMap(),
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
