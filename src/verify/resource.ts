/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Resource
 */

import { SudoRPCHandlerContext, SudoRPCMiddlewareHandlerHelper, SudoRPCMiddlewareResource } from "@sudorpc/core";
import { fixSudoRPCMixinJWTAuthenticationVerifyConfig, SudoRPCMixinJWTAuthenticationVerifyConfig } from "./declare";

export const createSudoRPCMixinJWTAuthenticationVerifyResource = <Metadata, Payload, FailResult>(
    config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>,
): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> => {

    const fixedConfig: SudoRPCMixinJWTAuthenticationVerifyConfig = fixSudoRPCMixinJWTAuthenticationVerifyConfig(config);

    return SudoRPCMiddlewareResource.create(
        fixedConfig.resourceName,
        (
            context: SudoRPCHandlerContext<Metadata, Payload>,
            helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>,
        ) => {

            return helper.createShouldContinueReturn();
        },
        {
            satisfies: [
                fixedConfig.dependencyName,
            ],
        },
    );
};
