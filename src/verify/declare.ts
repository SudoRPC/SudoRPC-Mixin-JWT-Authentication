/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Declare
 */

import { SudoRPCHandlerContext } from "@sudorpc/core";

export const SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName = "sudorpc-mixin-jwt-authentication-verify";
export const SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName = "sudorpc-mixin-jwt-authentication-verify";

export type SudoRPCMixinJWTAuthenticationVerifyConfig = {

    readonly resourceName: string;
    readonly dependencyName: string;

    readonly retrieveToken: (context: SudoRPCHandlerContext<any, any>) => string | undefined;
};

export const fixSudoRPCMixinJWTAuthenticationVerifyConfig = (config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>): SudoRPCMixinJWTAuthenticationVerifyConfig => {

    const defaultConfig: SudoRPCMixinJWTAuthenticationVerifyConfig = {

        resourceName: SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName,
        dependencyName: SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName,

        retrieveToken: (context: SudoRPCHandlerContext<any, any>) => {
            return context.getMetadataKey("authentication");
        },
    };

    return {
        ...defaultConfig,
        ...config,
    };
};
