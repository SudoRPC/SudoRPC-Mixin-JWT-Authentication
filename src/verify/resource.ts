/**
 * @author WMXPY
 * @namespace JWTAuthentication_Verify
 * @description Resource
 */

import { JWTToken } from "@sudoo/jwt";
import { SudoRPCHandlerContext, SudoRPCMiddlewareHandlerHelper, SudoRPCMiddlewareResource } from "@sudorpc/core";
import { fixSudoRPCMixinJWTAuthenticationVerifyConfig, SudoRPCMixinJWTAuthenticationVerifyConfig } from "./declare";

export const createSudoRPCMixinJWTAuthenticationVerifyResource = <Metadata, Payload, FailResult>(
    publicKey: string,
    config?: Partial<SudoRPCMixinJWTAuthenticationVerifyConfig>,
): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> => {

    const fixedConfig: SudoRPCMixinJWTAuthenticationVerifyConfig = fixSudoRPCMixinJWTAuthenticationVerifyConfig(config);

    return SudoRPCMiddlewareResource.create(
        fixedConfig.resourceName,
        (
            context: SudoRPCHandlerContext<Metadata, Payload>,
            helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>,
        ) => {

            const authentication: string | undefined =
                fixedConfig.retrieveAuthenticationMethod(context);

            if (typeof authentication === "undefined") {

                return helper.createShouldAbortReturn(
                    "Authentication token not found",
                    "Authentication token not found",
                    {} as any,
                );
            }

            const instance: JWTToken | null =
                JWTToken.fromTokenOrNull(authentication);

            if (instance === null) {

                return helper.createShouldAbortReturn(
                    "Authentication token invalid",
                    "Authentication token invalid",
                    {} as any,
                );
            }

            const currentDate: Date = fixedConfig.getCurrentTimeMethod();

            const notExpired: boolean = instance.verifyExpiration(currentDate);

            if (!notExpired) {

                return helper.createShouldAbortReturn(
                    "Authentication token expired",
                    "Authentication token expired",
                    {} as any,
                );
            }

            const issued: boolean = instance.verifyIssueDate(currentDate);

            if (!issued) {

                return helper.createShouldAbortReturn(
                    "Authentication token issued date invalid",
                    "Authentication token issued date invalid",
                    {} as any,
                );
            }

            const valid: boolean = instance.verifyNotBefore(currentDate);

            if (!valid) {

                return helper.createShouldAbortReturn(
                    "Authentication token before valid",
                    "Authentication token before valid",
                    {} as any,
                );
            }

            const signed: boolean = instance.verifySignature(publicKey);

            if (!signed) {

                return helper.createShouldAbortReturn(
                    "Authentication token signature invalid",
                    "Authentication token signature invalid",
                    {} as any,
                );
            }

            return helper.createShouldContinueReturn();
        },
        {
            satisfies: [
                fixedConfig.dependencyName,
            ],
        },
    );
};
