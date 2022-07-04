/**
 * @author WMXPY
 * @namespace JWTAuthentication
 * @description Echoer
 * @override Integration Test
 */

import { JWTCreator } from "@sudoo/jwt";
import { generateKeyPair, KeyPair } from "@sudoo/token";
import { SudoRPCCallManager } from "@sudorpc/core";
import { expect } from "chai";
import * as Chance from "chance";
import { createEchoerService } from "../mock/echoer";
import { MockLocalCallProxy } from "../mock/proxy/local-call";

describe('Given (Counter) Integration Test Scenario', (): void => {

    const keyPair: KeyPair = generateKeyPair();
    const tokenCreator: JWTCreator = JWTCreator.instantiate(keyPair.private);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('counter-counter');

    let callManager: SudoRPCCallManager<any, any, any, any> = undefined as any;

    beforeEach((): void => {
        callManager = SudoRPCCallManager.create(
            MockLocalCallProxy.create(createEchoerService(keyPair.public)),
        );
        callManager.ignite();
    });

    afterEach((): void => {
        callManager.dialDown();
    });

    it('should be able to execute echo', async (): Promise<void> => {

        const token: string = tokenCreator.create({
            header: {},
            body: {},
        });

        const result: any = await callManager.makeCall("echo", {
            "authentication": token,
        }, {});

        expect(result).to.be.deep.equal({
            token,
        });
    });
});
