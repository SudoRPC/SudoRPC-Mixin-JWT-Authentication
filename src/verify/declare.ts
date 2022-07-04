/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Declare
 */

import { JWTToken } from "@sudoo/jwt";
import { SudoRPCHandlerContext } from "@sudorpc/core";

export const SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName = "sudorpc-mixin-jwt-authentication-verify";
export const SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName = "sudorpc-mixin-jwt-authentication-verify";

export type SudoRPCMixinJWTAuthenticationVerifyConfig = {

    readonly resourceName: string;
    readonly dependencyName: string;

    readonly getCurrentTimeMethod: () => Date;

    readonly retrieveAuthenticationMethod: (
        context: SudoRPCHandlerContext<any, any>,
    ) => string | undefined;
    readonly placeTokenMethod: (
        context: SudoRPCHandlerContext<any, any>,
        token: JWTToken,
    ) => void;
};

export const fixSudoRPCMixinJWTAuthenticationVerifyConfig = (config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>): SudoRPCMixinJWTAuthenticationVerifyConfig => {

    const defaultConfig: SudoRPCMixinJWTAuthenticationVerifyConfig = {

        resourceName: SudoRPCMixinJWTAuthenticationVerifyDefaultResourceName,
        dependencyName: SudoRPCMixinJWTAuthenticationVerifyDefaultDependencyName,

        getCurrentTimeMethod: () => {
            return new Date();
        },

        retrieveAuthenticationMethod: (
            context: SudoRPCHandlerContext<any, any>,
        ) => {
            return context.getMetadataKey("authentication");
        },
        placeTokenMethod: (
            context: SudoRPCHandlerContext<any, any>,
            token: JWTToken,
        ) => {
            context.setDefaultContext("token", token);
            return;
        },
    };

    return {
        ...defaultConfig,
        ...config,
    };
};
