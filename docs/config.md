# ⚙️ Contexto

### Contexto de Afip:

La clase `Afip` recibe un objeto de tipo `Context` como parámetro, el cual proporciona los datos básicos necesarios para utilizar los servicios web de AFIP, así como también cómo deben comportarse:

```ts
const instancia = new Afip(Contexto);
```

- `Contexto`:
  - `production` <small>(booleano)</small>: Flag que permite especificar si se utilizarán los servicios de producción o de homologación (pruebas).
  - `cert` <small>\*(cadena)</small>: Contenido del certificado `(.crt)`.
  - `key` <small>\*(cadena)</small>: Contenido de la llave privada.
  - `cuit` <small>\*(número)</small>: CUIT del usuario que se utilizará.
  - `credentials` <small>(WSAuthTokens)</small>: Un objeto de tipo WSAuthTokens ([Ver](https://github.com/valiulab/afip.ts/blob/main/src/auth/types.ts#L5)). Aquí es donde se asignan los tokens de autenticación si ya se tienen guardados.
  - `handleTicket` <small>(booleano)</small>: Flag que indica si los tickets de autenticación son gestionados automáticamente por el paquete o si serán proporcionados por el desarrollador (más adelante se explicará cómo hacer inicio de sesión y luego pasar los tokens antes de llamar al servicio web deseado). Esto es útil cuando se desea utilizar el paquete en una función `lambda` o en algun lugar que no se tenga almacenamiento.
  - `ticketPath` <small>(cadena)</small>: La ruta preferida donde se desean guardar los tokens obtenidos del servicio WSAA si no se desea utilizar la carpeta predeterminada.
  - `httpsAgent` <small>(https.Agent)</small>: Agente HTTPS para los pedidos a ARCA (por ejemplo, para salir por un proxy). Si no se indica, el paquete usa su propio agente, que acepta la clave Diffie-Hellman de 1024 bits que todavía usan los servicios de ARCA y que Node 24+ (OpenSSL 3.5) rechaza con `dh key too small`. Si pasás tu propio agente y usás Node 24+, configurale `ciphers: ARCA_TLS_CIPHERS` (exportado por el paquete). Desde 3.3.0 el paquete ya no usa el agente global de Node (`https.globalAgent`).

<br/>
Context Type:

```ts
type Context = {
  /**
   * Flag for production or testing environment
   *
   * @var boolean
   **/
  production?: boolean;

  /**
   * Content file for the X.509 certificate in PEM format
   *
   * @var string
   **/
  cert: string;

  /**
   * Content file for the private key corresponding to CERT (PEM)
   *
   * @var string
   **/
  key: string;

  /**
   * The CUIT to use
   *
   * @var int
   **/
  cuit: number;

  /**
   * Tokens object if you have one created before
   *
   * @var credentials
   **/
  credentials?: ILoginCredentials;

  /**
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * The path of the auth obj if the package is auto managed
   */
  ticketPath?: string;

  /**
   * HTTPS agent for the requests to ARCA (proxies, custom TLS). By default the library uses its own agent,
   * which accepts the 1024-bit DH key ARCA's services still use (rejected by OpenSSL 3.5 / Node 24+).
   */
  httpsAgent?: Agent;
};
```

<br>