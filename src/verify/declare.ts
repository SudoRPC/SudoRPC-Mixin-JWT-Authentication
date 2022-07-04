/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Declare
 */

import { SudoRPCHandlerContext, SudoRPCMiddlewareHandlerHelper, SudoRPCMiddlewareResource } from "@sudorpc/core";

export const SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName = "sudorpc-mixin-jwt-authentication-verify";
export const SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName = "sudorpc-mixin-jwt-authentication-verify";

export type SudoRPCMixinJWTAuthenticationVerifyConfig = {

    readonly resourceName: string;
    readonly dependencyName: string;
};

export const fixSudoRPCMixinJWTAuthenticationVerifyConfig = (config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>): SudoRPCMixinJWTAuthenticationVerifyConfig => {

    const defaultConfig: SudoRPCMixinJWTAuthenticationVerifyConfig = {

        resourceName: SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName,
        dependencyName: SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName,
    };

    return {
        ...defaultConfig,
        ...config,
    };
};
