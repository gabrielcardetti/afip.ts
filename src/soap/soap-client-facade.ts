import axios from "axios";
import { resolve } from "path";
import { Client, createClientAsync } from "soap";
import { SoapClientParams } from "../types";
import { getArcaHttpsAgent } from "./arca-https-agent";

export class SoapClientFacade {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private construct() {}

  /**
   * Geth the path for the WSDL file stored on the WSDL folder.
   *
   * @param wsdlFile
   * @param forceFolderPath
   * @returns Path of wsdl file
   */
  private static getWsdlPath(
    wsdlFile: string,
    forceFolderPath?: string
  ): string {
    return resolve(forceFolderPath ?? resolve(__dirname, "wsdl/"), wsdlFile);
  }

  /**
   * Requests go through the library's own HTTPS agent (see `getArcaHttpsAgent`), or the one given in the
   * context. An explicit `options.request` still takes precedence.
   */
  public static async create<T extends Client>({
    wsdl,
    options,
    httpsAgent,
  }: SoapClientParams): Promise<T> {
    return (await createClientAsync(SoapClientFacade.getWsdlPath(wsdl), {
      request: axios.create({ httpsAgent: httpsAgent ?? getArcaHttpsAgent() }),
      ...options,
    })) as T;
  }
}
