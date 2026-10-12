import { Agent } from "https";
import * as soap from "soap";
import { SoapClientFacade } from "../../../src/soap/soap-client-facade";
import {
  ARCA_TLS_CIPHERS,
  getArcaHttpsAgent,
} from "../../../src/soap/arca-https-agent";
import { WsdlPathEnum } from "../../../src/soap/wsdl-path.enum";

jest.mock("soap", () => ({
  ...jest.requireActual("soap"),
  createClientAsync: jest.fn().mockResolvedValue({}),
}));

const createClientAsync = soap.createClientAsync as jest.Mock;
const requestAgent = () =>
  createClientAsync.mock.calls[0][1].request.defaults.httpsAgent as Agent;

describe("SoapClientFacade.create", () => {
  beforeEach(() => createClientAsync.mockClear());

  it("uses the library's agent, which accepts ARCA's 1024-bit DH key", async () => {
    await SoapClientFacade.create({ wsdl: WsdlPathEnum.WSFE });

    expect(requestAgent()).toBe(getArcaHttpsAgent());
    expect(requestAgent().options.ciphers).toBe(ARCA_TLS_CIPHERS);
    expect(getArcaHttpsAgent()).toBe(getArcaHttpsAgent());
  });

  it("uses the agent given in the context instead", async () => {
    const agent = new Agent();
    await SoapClientFacade.create({ wsdl: WsdlPathEnum.WSFE, httpsAgent: agent });

    expect(requestAgent()).toBe(agent);
  });

  it("keeps an explicit request client and the rest of the options", async () => {
    const request = { custom: true };
    await SoapClientFacade.create({
      wsdl: WsdlPathEnum.WSFE,
      options: { disableCache: true, request: request as never },
    });

    const options = createClientAsync.mock.calls[0][1];
    expect(options.request).toBe(request);
    expect(options.disableCache).toBe(true);
  });
});
