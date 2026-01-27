
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model CyberCenter
 * 
 */
export type CyberCenter = $Result.DefaultSelection<Prisma.$CyberCenterPayload>
/**
 * Model Computer
 * 
 */
export type Computer = $Result.DefaultSelection<Prisma.$ComputerPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Pricing
 * 
 */
export type Pricing = $Result.DefaultSelection<Prisma.$PricingPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Command
 * 
 */
export type Command = $Result.DefaultSelection<Prisma.$CommandPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ComputerStatus: {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  LOCKED: 'LOCKED',
  OFFLINE: 'OFFLINE',
  ERROR: 'ERROR'
};

export type ComputerStatus = (typeof ComputerStatus)[keyof typeof ComputerStatus]


export const SessionStatus: {
  CREATED: 'CREATED',
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]


export const UserRole: {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const EventType: {
  COMPUTER_CONNECTED: 'COMPUTER_CONNECTED',
  COMPUTER_DISCONNECTED: 'COMPUTER_DISCONNECTED',
  COMPUTER_STATUS_CHANGED: 'COMPUTER_STATUS_CHANGED',
  SESSION_STARTED: 'SESSION_STARTED',
  SESSION_ACTIVATED: 'SESSION_ACTIVATED',
  SESSION_ENDED: 'SESSION_ENDED',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  COMMAND_CREATED: 'COMMAND_CREATED',
  COMMAND_SENT: 'COMMAND_SENT',
  COMMAND_ACKED: 'COMMAND_ACKED'
};

export type EventType = (typeof EventType)[keyof typeof EventType]

}

export type ComputerStatus = $Enums.ComputerStatus

export const ComputerStatus: typeof $Enums.ComputerStatus

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cyberCenter`: Exposes CRUD operations for the **CyberCenter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CyberCenters
    * const cyberCenters = await prisma.cyberCenter.findMany()
    * ```
    */
  get cyberCenter(): Prisma.CyberCenterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.computer`: Exposes CRUD operations for the **Computer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Computers
    * const computers = await prisma.computer.findMany()
    * ```
    */
  get computer(): Prisma.ComputerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pricing`: Exposes CRUD operations for the **Pricing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pricings
    * const pricings = await prisma.pricing.findMany()
    * ```
    */
  get pricing(): Prisma.PricingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.command`: Exposes CRUD operations for the **Command** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commands
    * const commands = await prisma.command.findMany()
    * ```
    */
  get command(): Prisma.CommandDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    CyberCenter: 'CyberCenter',
    Computer: 'Computer',
    Session: 'Session',
    Pricing: 'Pricing',
    User: 'User',
    Event: 'Event',
    Command: 'Command'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "cyberCenter" | "computer" | "session" | "pricing" | "user" | "event" | "command"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      CyberCenter: {
        payload: Prisma.$CyberCenterPayload<ExtArgs>
        fields: Prisma.CyberCenterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CyberCenterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CyberCenterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          findFirst: {
            args: Prisma.CyberCenterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CyberCenterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          findMany: {
            args: Prisma.CyberCenterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>[]
          }
          create: {
            args: Prisma.CyberCenterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          createMany: {
            args: Prisma.CyberCenterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CyberCenterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>[]
          }
          delete: {
            args: Prisma.CyberCenterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          update: {
            args: Prisma.CyberCenterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          deleteMany: {
            args: Prisma.CyberCenterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CyberCenterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CyberCenterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>[]
          }
          upsert: {
            args: Prisma.CyberCenterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CyberCenterPayload>
          }
          aggregate: {
            args: Prisma.CyberCenterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCyberCenter>
          }
          groupBy: {
            args: Prisma.CyberCenterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CyberCenterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CyberCenterCountArgs<ExtArgs>
            result: $Utils.Optional<CyberCenterCountAggregateOutputType> | number
          }
        }
      }
      Computer: {
        payload: Prisma.$ComputerPayload<ExtArgs>
        fields: Prisma.ComputerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComputerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComputerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          findFirst: {
            args: Prisma.ComputerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComputerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          findMany: {
            args: Prisma.ComputerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>[]
          }
          create: {
            args: Prisma.ComputerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          createMany: {
            args: Prisma.ComputerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComputerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>[]
          }
          delete: {
            args: Prisma.ComputerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          update: {
            args: Prisma.ComputerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          deleteMany: {
            args: Prisma.ComputerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComputerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComputerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>[]
          }
          upsert: {
            args: Prisma.ComputerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComputerPayload>
          }
          aggregate: {
            args: Prisma.ComputerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComputer>
          }
          groupBy: {
            args: Prisma.ComputerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComputerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComputerCountArgs<ExtArgs>
            result: $Utils.Optional<ComputerCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Pricing: {
        payload: Prisma.$PricingPayload<ExtArgs>
        fields: Prisma.PricingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          findFirst: {
            args: Prisma.PricingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          findMany: {
            args: Prisma.PricingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          create: {
            args: Prisma.PricingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          createMany: {
            args: Prisma.PricingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PricingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          delete: {
            args: Prisma.PricingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          update: {
            args: Prisma.PricingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          deleteMany: {
            args: Prisma.PricingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PricingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          upsert: {
            args: Prisma.PricingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          aggregate: {
            args: Prisma.PricingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricing>
          }
          groupBy: {
            args: Prisma.PricingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingCountArgs<ExtArgs>
            result: $Utils.Optional<PricingCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Command: {
        payload: Prisma.$CommandPayload<ExtArgs>
        fields: Prisma.CommandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          findFirst: {
            args: Prisma.CommandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          findMany: {
            args: Prisma.CommandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>[]
          }
          create: {
            args: Prisma.CommandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          createMany: {
            args: Prisma.CommandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>[]
          }
          delete: {
            args: Prisma.CommandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          update: {
            args: Prisma.CommandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          deleteMany: {
            args: Prisma.CommandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>[]
          }
          upsert: {
            args: Prisma.CommandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommandPayload>
          }
          aggregate: {
            args: Prisma.CommandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommand>
          }
          groupBy: {
            args: Prisma.CommandGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommandGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommandCountArgs<ExtArgs>
            result: $Utils.Optional<CommandCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    cyberCenter?: CyberCenterOmit
    computer?: ComputerOmit
    session?: SessionOmit
    pricing?: PricingOmit
    user?: UserOmit
    event?: EventOmit
    command?: CommandOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    cyberCenters: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenters?: boolean | OrganizationCountOutputTypeCountCyberCentersArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCyberCentersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CyberCenterWhereInput
  }


  /**
   * Count Type CyberCenterCountOutputType
   */

  export type CyberCenterCountOutputType = {
    computers: number
    sessions: number
    users: number
  }

  export type CyberCenterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computers?: boolean | CyberCenterCountOutputTypeCountComputersArgs
    sessions?: boolean | CyberCenterCountOutputTypeCountSessionsArgs
    users?: boolean | CyberCenterCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CyberCenterCountOutputType without action
   */
  export type CyberCenterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenterCountOutputType
     */
    select?: CyberCenterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CyberCenterCountOutputType without action
   */
  export type CyberCenterCountOutputTypeCountComputersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComputerWhereInput
  }

  /**
   * CyberCenterCountOutputType without action
   */
  export type CyberCenterCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * CyberCenterCountOutputType without action
   */
  export type CyberCenterCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ComputerCountOutputType
   */

  export type ComputerCountOutputType = {
    sessions: number
    events: number
    commands: number
  }

  export type ComputerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | ComputerCountOutputTypeCountSessionsArgs
    events?: boolean | ComputerCountOutputTypeCountEventsArgs
    commands?: boolean | ComputerCountOutputTypeCountCommandsArgs
  }

  // Custom InputTypes
  /**
   * ComputerCountOutputType without action
   */
  export type ComputerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComputerCountOutputType
     */
    select?: ComputerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComputerCountOutputType without action
   */
  export type ComputerCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * ComputerCountOutputType without action
   */
  export type ComputerCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * ComputerCountOutputType without action
   */
  export type ComputerCountOutputTypeCountCommandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommandWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    events: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    cyberCenters?: boolean | Organization$cyberCentersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenters?: boolean | Organization$cyberCentersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      cyberCenters: Prisma.$CyberCenterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cyberCenters<T extends Organization$cyberCentersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$cyberCentersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.cyberCenters
   */
  export type Organization$cyberCentersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    where?: CyberCenterWhereInput
    orderBy?: CyberCenterOrderByWithRelationInput | CyberCenterOrderByWithRelationInput[]
    cursor?: CyberCenterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CyberCenterScalarFieldEnum | CyberCenterScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model CyberCenter
   */

  export type AggregateCyberCenter = {
    _count: CyberCenterCountAggregateOutputType | null
    _min: CyberCenterMinAggregateOutputType | null
    _max: CyberCenterMaxAggregateOutputType | null
  }

  export type CyberCenterMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    organizationId: string | null
    createdAt: Date | null
  }

  export type CyberCenterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    organizationId: string | null
    createdAt: Date | null
  }

  export type CyberCenterCountAggregateOutputType = {
    id: number
    name: number
    location: number
    organizationId: number
    createdAt: number
    _all: number
  }


  export type CyberCenterMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    organizationId?: true
    createdAt?: true
  }

  export type CyberCenterMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    organizationId?: true
    createdAt?: true
  }

  export type CyberCenterCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    organizationId?: true
    createdAt?: true
    _all?: true
  }

  export type CyberCenterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CyberCenter to aggregate.
     */
    where?: CyberCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CyberCenters to fetch.
     */
    orderBy?: CyberCenterOrderByWithRelationInput | CyberCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CyberCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CyberCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CyberCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CyberCenters
    **/
    _count?: true | CyberCenterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CyberCenterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CyberCenterMaxAggregateInputType
  }

  export type GetCyberCenterAggregateType<T extends CyberCenterAggregateArgs> = {
        [P in keyof T & keyof AggregateCyberCenter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCyberCenter[P]>
      : GetScalarType<T[P], AggregateCyberCenter[P]>
  }




  export type CyberCenterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CyberCenterWhereInput
    orderBy?: CyberCenterOrderByWithAggregationInput | CyberCenterOrderByWithAggregationInput[]
    by: CyberCenterScalarFieldEnum[] | CyberCenterScalarFieldEnum
    having?: CyberCenterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CyberCenterCountAggregateInputType | true
    _min?: CyberCenterMinAggregateInputType
    _max?: CyberCenterMaxAggregateInputType
  }

  export type CyberCenterGroupByOutputType = {
    id: string
    name: string
    location: string | null
    organizationId: string
    createdAt: Date
    _count: CyberCenterCountAggregateOutputType | null
    _min: CyberCenterMinAggregateOutputType | null
    _max: CyberCenterMaxAggregateOutputType | null
  }

  type GetCyberCenterGroupByPayload<T extends CyberCenterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CyberCenterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CyberCenterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CyberCenterGroupByOutputType[P]>
            : GetScalarType<T[P], CyberCenterGroupByOutputType[P]>
        }
      >
    >


  export type CyberCenterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    organizationId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    computers?: boolean | CyberCenter$computersArgs<ExtArgs>
    sessions?: boolean | CyberCenter$sessionsArgs<ExtArgs>
    users?: boolean | CyberCenter$usersArgs<ExtArgs>
    _count?: boolean | CyberCenterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cyberCenter"]>

  export type CyberCenterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    organizationId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cyberCenter"]>

  export type CyberCenterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    organizationId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cyberCenter"]>

  export type CyberCenterSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    organizationId?: boolean
    createdAt?: boolean
  }

  export type CyberCenterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "organizationId" | "createdAt", ExtArgs["result"]["cyberCenter"]>
  export type CyberCenterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    computers?: boolean | CyberCenter$computersArgs<ExtArgs>
    sessions?: boolean | CyberCenter$sessionsArgs<ExtArgs>
    users?: boolean | CyberCenter$usersArgs<ExtArgs>
    _count?: boolean | CyberCenterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CyberCenterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type CyberCenterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $CyberCenterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CyberCenter"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      computers: Prisma.$ComputerPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string | null
      organizationId: string
      createdAt: Date
    }, ExtArgs["result"]["cyberCenter"]>
    composites: {}
  }

  type CyberCenterGetPayload<S extends boolean | null | undefined | CyberCenterDefaultArgs> = $Result.GetResult<Prisma.$CyberCenterPayload, S>

  type CyberCenterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CyberCenterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CyberCenterCountAggregateInputType | true
    }

  export interface CyberCenterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CyberCenter'], meta: { name: 'CyberCenter' } }
    /**
     * Find zero or one CyberCenter that matches the filter.
     * @param {CyberCenterFindUniqueArgs} args - Arguments to find a CyberCenter
     * @example
     * // Get one CyberCenter
     * const cyberCenter = await prisma.cyberCenter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CyberCenterFindUniqueArgs>(args: SelectSubset<T, CyberCenterFindUniqueArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CyberCenter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CyberCenterFindUniqueOrThrowArgs} args - Arguments to find a CyberCenter
     * @example
     * // Get one CyberCenter
     * const cyberCenter = await prisma.cyberCenter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CyberCenterFindUniqueOrThrowArgs>(args: SelectSubset<T, CyberCenterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CyberCenter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterFindFirstArgs} args - Arguments to find a CyberCenter
     * @example
     * // Get one CyberCenter
     * const cyberCenter = await prisma.cyberCenter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CyberCenterFindFirstArgs>(args?: SelectSubset<T, CyberCenterFindFirstArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CyberCenter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterFindFirstOrThrowArgs} args - Arguments to find a CyberCenter
     * @example
     * // Get one CyberCenter
     * const cyberCenter = await prisma.cyberCenter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CyberCenterFindFirstOrThrowArgs>(args?: SelectSubset<T, CyberCenterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CyberCenters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CyberCenters
     * const cyberCenters = await prisma.cyberCenter.findMany()
     * 
     * // Get first 10 CyberCenters
     * const cyberCenters = await prisma.cyberCenter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cyberCenterWithIdOnly = await prisma.cyberCenter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CyberCenterFindManyArgs>(args?: SelectSubset<T, CyberCenterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CyberCenter.
     * @param {CyberCenterCreateArgs} args - Arguments to create a CyberCenter.
     * @example
     * // Create one CyberCenter
     * const CyberCenter = await prisma.cyberCenter.create({
     *   data: {
     *     // ... data to create a CyberCenter
     *   }
     * })
     * 
     */
    create<T extends CyberCenterCreateArgs>(args: SelectSubset<T, CyberCenterCreateArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CyberCenters.
     * @param {CyberCenterCreateManyArgs} args - Arguments to create many CyberCenters.
     * @example
     * // Create many CyberCenters
     * const cyberCenter = await prisma.cyberCenter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CyberCenterCreateManyArgs>(args?: SelectSubset<T, CyberCenterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CyberCenters and returns the data saved in the database.
     * @param {CyberCenterCreateManyAndReturnArgs} args - Arguments to create many CyberCenters.
     * @example
     * // Create many CyberCenters
     * const cyberCenter = await prisma.cyberCenter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CyberCenters and only return the `id`
     * const cyberCenterWithIdOnly = await prisma.cyberCenter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CyberCenterCreateManyAndReturnArgs>(args?: SelectSubset<T, CyberCenterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CyberCenter.
     * @param {CyberCenterDeleteArgs} args - Arguments to delete one CyberCenter.
     * @example
     * // Delete one CyberCenter
     * const CyberCenter = await prisma.cyberCenter.delete({
     *   where: {
     *     // ... filter to delete one CyberCenter
     *   }
     * })
     * 
     */
    delete<T extends CyberCenterDeleteArgs>(args: SelectSubset<T, CyberCenterDeleteArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CyberCenter.
     * @param {CyberCenterUpdateArgs} args - Arguments to update one CyberCenter.
     * @example
     * // Update one CyberCenter
     * const cyberCenter = await prisma.cyberCenter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CyberCenterUpdateArgs>(args: SelectSubset<T, CyberCenterUpdateArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CyberCenters.
     * @param {CyberCenterDeleteManyArgs} args - Arguments to filter CyberCenters to delete.
     * @example
     * // Delete a few CyberCenters
     * const { count } = await prisma.cyberCenter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CyberCenterDeleteManyArgs>(args?: SelectSubset<T, CyberCenterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CyberCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CyberCenters
     * const cyberCenter = await prisma.cyberCenter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CyberCenterUpdateManyArgs>(args: SelectSubset<T, CyberCenterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CyberCenters and returns the data updated in the database.
     * @param {CyberCenterUpdateManyAndReturnArgs} args - Arguments to update many CyberCenters.
     * @example
     * // Update many CyberCenters
     * const cyberCenter = await prisma.cyberCenter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CyberCenters and only return the `id`
     * const cyberCenterWithIdOnly = await prisma.cyberCenter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CyberCenterUpdateManyAndReturnArgs>(args: SelectSubset<T, CyberCenterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CyberCenter.
     * @param {CyberCenterUpsertArgs} args - Arguments to update or create a CyberCenter.
     * @example
     * // Update or create a CyberCenter
     * const cyberCenter = await prisma.cyberCenter.upsert({
     *   create: {
     *     // ... data to create a CyberCenter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CyberCenter we want to update
     *   }
     * })
     */
    upsert<T extends CyberCenterUpsertArgs>(args: SelectSubset<T, CyberCenterUpsertArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CyberCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterCountArgs} args - Arguments to filter CyberCenters to count.
     * @example
     * // Count the number of CyberCenters
     * const count = await prisma.cyberCenter.count({
     *   where: {
     *     // ... the filter for the CyberCenters we want to count
     *   }
     * })
    **/
    count<T extends CyberCenterCountArgs>(
      args?: Subset<T, CyberCenterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CyberCenterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CyberCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CyberCenterAggregateArgs>(args: Subset<T, CyberCenterAggregateArgs>): Prisma.PrismaPromise<GetCyberCenterAggregateType<T>>

    /**
     * Group by CyberCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CyberCenterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CyberCenterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CyberCenterGroupByArgs['orderBy'] }
        : { orderBy?: CyberCenterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CyberCenterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCyberCenterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CyberCenter model
   */
  readonly fields: CyberCenterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CyberCenter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CyberCenterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    computers<T extends CyberCenter$computersArgs<ExtArgs> = {}>(args?: Subset<T, CyberCenter$computersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends CyberCenter$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, CyberCenter$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends CyberCenter$usersArgs<ExtArgs> = {}>(args?: Subset<T, CyberCenter$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CyberCenter model
   */
  interface CyberCenterFieldRefs {
    readonly id: FieldRef<"CyberCenter", 'String'>
    readonly name: FieldRef<"CyberCenter", 'String'>
    readonly location: FieldRef<"CyberCenter", 'String'>
    readonly organizationId: FieldRef<"CyberCenter", 'String'>
    readonly createdAt: FieldRef<"CyberCenter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CyberCenter findUnique
   */
  export type CyberCenterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter, which CyberCenter to fetch.
     */
    where: CyberCenterWhereUniqueInput
  }

  /**
   * CyberCenter findUniqueOrThrow
   */
  export type CyberCenterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter, which CyberCenter to fetch.
     */
    where: CyberCenterWhereUniqueInput
  }

  /**
   * CyberCenter findFirst
   */
  export type CyberCenterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter, which CyberCenter to fetch.
     */
    where?: CyberCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CyberCenters to fetch.
     */
    orderBy?: CyberCenterOrderByWithRelationInput | CyberCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CyberCenters.
     */
    cursor?: CyberCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CyberCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CyberCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CyberCenters.
     */
    distinct?: CyberCenterScalarFieldEnum | CyberCenterScalarFieldEnum[]
  }

  /**
   * CyberCenter findFirstOrThrow
   */
  export type CyberCenterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter, which CyberCenter to fetch.
     */
    where?: CyberCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CyberCenters to fetch.
     */
    orderBy?: CyberCenterOrderByWithRelationInput | CyberCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CyberCenters.
     */
    cursor?: CyberCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CyberCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CyberCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CyberCenters.
     */
    distinct?: CyberCenterScalarFieldEnum | CyberCenterScalarFieldEnum[]
  }

  /**
   * CyberCenter findMany
   */
  export type CyberCenterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter, which CyberCenters to fetch.
     */
    where?: CyberCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CyberCenters to fetch.
     */
    orderBy?: CyberCenterOrderByWithRelationInput | CyberCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CyberCenters.
     */
    cursor?: CyberCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CyberCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CyberCenters.
     */
    skip?: number
    distinct?: CyberCenterScalarFieldEnum | CyberCenterScalarFieldEnum[]
  }

  /**
   * CyberCenter create
   */
  export type CyberCenterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * The data needed to create a CyberCenter.
     */
    data: XOR<CyberCenterCreateInput, CyberCenterUncheckedCreateInput>
  }

  /**
   * CyberCenter createMany
   */
  export type CyberCenterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CyberCenters.
     */
    data: CyberCenterCreateManyInput | CyberCenterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CyberCenter createManyAndReturn
   */
  export type CyberCenterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * The data used to create many CyberCenters.
     */
    data: CyberCenterCreateManyInput | CyberCenterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CyberCenter update
   */
  export type CyberCenterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * The data needed to update a CyberCenter.
     */
    data: XOR<CyberCenterUpdateInput, CyberCenterUncheckedUpdateInput>
    /**
     * Choose, which CyberCenter to update.
     */
    where: CyberCenterWhereUniqueInput
  }

  /**
   * CyberCenter updateMany
   */
  export type CyberCenterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CyberCenters.
     */
    data: XOR<CyberCenterUpdateManyMutationInput, CyberCenterUncheckedUpdateManyInput>
    /**
     * Filter which CyberCenters to update
     */
    where?: CyberCenterWhereInput
    /**
     * Limit how many CyberCenters to update.
     */
    limit?: number
  }

  /**
   * CyberCenter updateManyAndReturn
   */
  export type CyberCenterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * The data used to update CyberCenters.
     */
    data: XOR<CyberCenterUpdateManyMutationInput, CyberCenterUncheckedUpdateManyInput>
    /**
     * Filter which CyberCenters to update
     */
    where?: CyberCenterWhereInput
    /**
     * Limit how many CyberCenters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CyberCenter upsert
   */
  export type CyberCenterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * The filter to search for the CyberCenter to update in case it exists.
     */
    where: CyberCenterWhereUniqueInput
    /**
     * In case the CyberCenter found by the `where` argument doesn't exist, create a new CyberCenter with this data.
     */
    create: XOR<CyberCenterCreateInput, CyberCenterUncheckedCreateInput>
    /**
     * In case the CyberCenter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CyberCenterUpdateInput, CyberCenterUncheckedUpdateInput>
  }

  /**
   * CyberCenter delete
   */
  export type CyberCenterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    /**
     * Filter which CyberCenter to delete.
     */
    where: CyberCenterWhereUniqueInput
  }

  /**
   * CyberCenter deleteMany
   */
  export type CyberCenterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CyberCenters to delete
     */
    where?: CyberCenterWhereInput
    /**
     * Limit how many CyberCenters to delete.
     */
    limit?: number
  }

  /**
   * CyberCenter.computers
   */
  export type CyberCenter$computersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    where?: ComputerWhereInput
    orderBy?: ComputerOrderByWithRelationInput | ComputerOrderByWithRelationInput[]
    cursor?: ComputerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComputerScalarFieldEnum | ComputerScalarFieldEnum[]
  }

  /**
   * CyberCenter.sessions
   */
  export type CyberCenter$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * CyberCenter.users
   */
  export type CyberCenter$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * CyberCenter without action
   */
  export type CyberCenterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
  }


  /**
   * Model Computer
   */

  export type AggregateComputer = {
    _count: ComputerCountAggregateOutputType | null
    _min: ComputerMinAggregateOutputType | null
    _max: ComputerMaxAggregateOutputType | null
  }

  export type ComputerMinAggregateOutputType = {
    id: string | null
    name: string | null
    deviceToken: string | null
    status: $Enums.ComputerStatus | null
    lastSeenAt: Date | null
    cyberCenterId: string | null
    createdAt: Date | null
  }

  export type ComputerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    deviceToken: string | null
    status: $Enums.ComputerStatus | null
    lastSeenAt: Date | null
    cyberCenterId: string | null
    createdAt: Date | null
  }

  export type ComputerCountAggregateOutputType = {
    id: number
    name: number
    deviceToken: number
    status: number
    lastSeenAt: number
    cyberCenterId: number
    createdAt: number
    _all: number
  }


  export type ComputerMinAggregateInputType = {
    id?: true
    name?: true
    deviceToken?: true
    status?: true
    lastSeenAt?: true
    cyberCenterId?: true
    createdAt?: true
  }

  export type ComputerMaxAggregateInputType = {
    id?: true
    name?: true
    deviceToken?: true
    status?: true
    lastSeenAt?: true
    cyberCenterId?: true
    createdAt?: true
  }

  export type ComputerCountAggregateInputType = {
    id?: true
    name?: true
    deviceToken?: true
    status?: true
    lastSeenAt?: true
    cyberCenterId?: true
    createdAt?: true
    _all?: true
  }

  export type ComputerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Computer to aggregate.
     */
    where?: ComputerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Computers to fetch.
     */
    orderBy?: ComputerOrderByWithRelationInput | ComputerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComputerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Computers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Computers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Computers
    **/
    _count?: true | ComputerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComputerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComputerMaxAggregateInputType
  }

  export type GetComputerAggregateType<T extends ComputerAggregateArgs> = {
        [P in keyof T & keyof AggregateComputer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComputer[P]>
      : GetScalarType<T[P], AggregateComputer[P]>
  }




  export type ComputerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComputerWhereInput
    orderBy?: ComputerOrderByWithAggregationInput | ComputerOrderByWithAggregationInput[]
    by: ComputerScalarFieldEnum[] | ComputerScalarFieldEnum
    having?: ComputerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComputerCountAggregateInputType | true
    _min?: ComputerMinAggregateInputType
    _max?: ComputerMaxAggregateInputType
  }

  export type ComputerGroupByOutputType = {
    id: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt: Date | null
    cyberCenterId: string | null
    createdAt: Date
    _count: ComputerCountAggregateOutputType | null
    _min: ComputerMinAggregateOutputType | null
    _max: ComputerMaxAggregateOutputType | null
  }

  type GetComputerGroupByPayload<T extends ComputerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComputerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComputerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComputerGroupByOutputType[P]>
            : GetScalarType<T[P], ComputerGroupByOutputType[P]>
        }
      >
    >


  export type ComputerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deviceToken?: boolean
    status?: boolean
    lastSeenAt?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
    sessions?: boolean | Computer$sessionsArgs<ExtArgs>
    events?: boolean | Computer$eventsArgs<ExtArgs>
    commands?: boolean | Computer$commandsArgs<ExtArgs>
    _count?: boolean | ComputerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["computer"]>

  export type ComputerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deviceToken?: boolean
    status?: boolean
    lastSeenAt?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
  }, ExtArgs["result"]["computer"]>

  export type ComputerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deviceToken?: boolean
    status?: boolean
    lastSeenAt?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
  }, ExtArgs["result"]["computer"]>

  export type ComputerSelectScalar = {
    id?: boolean
    name?: boolean
    deviceToken?: boolean
    status?: boolean
    lastSeenAt?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
  }

  export type ComputerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "deviceToken" | "status" | "lastSeenAt" | "cyberCenterId" | "createdAt", ExtArgs["result"]["computer"]>
  export type ComputerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
    sessions?: boolean | Computer$sessionsArgs<ExtArgs>
    events?: boolean | Computer$eventsArgs<ExtArgs>
    commands?: boolean | Computer$commandsArgs<ExtArgs>
    _count?: boolean | ComputerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComputerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
  }
  export type ComputerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | Computer$cyberCenterArgs<ExtArgs>
  }

  export type $ComputerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Computer"
    objects: {
      cyberCenter: Prisma.$CyberCenterPayload<ExtArgs> | null
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      commands: Prisma.$CommandPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      deviceToken: string
      status: $Enums.ComputerStatus
      lastSeenAt: Date | null
      cyberCenterId: string | null
      createdAt: Date
    }, ExtArgs["result"]["computer"]>
    composites: {}
  }

  type ComputerGetPayload<S extends boolean | null | undefined | ComputerDefaultArgs> = $Result.GetResult<Prisma.$ComputerPayload, S>

  type ComputerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComputerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComputerCountAggregateInputType | true
    }

  export interface ComputerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Computer'], meta: { name: 'Computer' } }
    /**
     * Find zero or one Computer that matches the filter.
     * @param {ComputerFindUniqueArgs} args - Arguments to find a Computer
     * @example
     * // Get one Computer
     * const computer = await prisma.computer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComputerFindUniqueArgs>(args: SelectSubset<T, ComputerFindUniqueArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Computer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComputerFindUniqueOrThrowArgs} args - Arguments to find a Computer
     * @example
     * // Get one Computer
     * const computer = await prisma.computer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComputerFindUniqueOrThrowArgs>(args: SelectSubset<T, ComputerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Computer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerFindFirstArgs} args - Arguments to find a Computer
     * @example
     * // Get one Computer
     * const computer = await prisma.computer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComputerFindFirstArgs>(args?: SelectSubset<T, ComputerFindFirstArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Computer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerFindFirstOrThrowArgs} args - Arguments to find a Computer
     * @example
     * // Get one Computer
     * const computer = await prisma.computer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComputerFindFirstOrThrowArgs>(args?: SelectSubset<T, ComputerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Computers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Computers
     * const computers = await prisma.computer.findMany()
     * 
     * // Get first 10 Computers
     * const computers = await prisma.computer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const computerWithIdOnly = await prisma.computer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComputerFindManyArgs>(args?: SelectSubset<T, ComputerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Computer.
     * @param {ComputerCreateArgs} args - Arguments to create a Computer.
     * @example
     * // Create one Computer
     * const Computer = await prisma.computer.create({
     *   data: {
     *     // ... data to create a Computer
     *   }
     * })
     * 
     */
    create<T extends ComputerCreateArgs>(args: SelectSubset<T, ComputerCreateArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Computers.
     * @param {ComputerCreateManyArgs} args - Arguments to create many Computers.
     * @example
     * // Create many Computers
     * const computer = await prisma.computer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComputerCreateManyArgs>(args?: SelectSubset<T, ComputerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Computers and returns the data saved in the database.
     * @param {ComputerCreateManyAndReturnArgs} args - Arguments to create many Computers.
     * @example
     * // Create many Computers
     * const computer = await prisma.computer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Computers and only return the `id`
     * const computerWithIdOnly = await prisma.computer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComputerCreateManyAndReturnArgs>(args?: SelectSubset<T, ComputerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Computer.
     * @param {ComputerDeleteArgs} args - Arguments to delete one Computer.
     * @example
     * // Delete one Computer
     * const Computer = await prisma.computer.delete({
     *   where: {
     *     // ... filter to delete one Computer
     *   }
     * })
     * 
     */
    delete<T extends ComputerDeleteArgs>(args: SelectSubset<T, ComputerDeleteArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Computer.
     * @param {ComputerUpdateArgs} args - Arguments to update one Computer.
     * @example
     * // Update one Computer
     * const computer = await prisma.computer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComputerUpdateArgs>(args: SelectSubset<T, ComputerUpdateArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Computers.
     * @param {ComputerDeleteManyArgs} args - Arguments to filter Computers to delete.
     * @example
     * // Delete a few Computers
     * const { count } = await prisma.computer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComputerDeleteManyArgs>(args?: SelectSubset<T, ComputerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Computers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Computers
     * const computer = await prisma.computer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComputerUpdateManyArgs>(args: SelectSubset<T, ComputerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Computers and returns the data updated in the database.
     * @param {ComputerUpdateManyAndReturnArgs} args - Arguments to update many Computers.
     * @example
     * // Update many Computers
     * const computer = await prisma.computer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Computers and only return the `id`
     * const computerWithIdOnly = await prisma.computer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComputerUpdateManyAndReturnArgs>(args: SelectSubset<T, ComputerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Computer.
     * @param {ComputerUpsertArgs} args - Arguments to update or create a Computer.
     * @example
     * // Update or create a Computer
     * const computer = await prisma.computer.upsert({
     *   create: {
     *     // ... data to create a Computer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Computer we want to update
     *   }
     * })
     */
    upsert<T extends ComputerUpsertArgs>(args: SelectSubset<T, ComputerUpsertArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Computers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerCountArgs} args - Arguments to filter Computers to count.
     * @example
     * // Count the number of Computers
     * const count = await prisma.computer.count({
     *   where: {
     *     // ... the filter for the Computers we want to count
     *   }
     * })
    **/
    count<T extends ComputerCountArgs>(
      args?: Subset<T, ComputerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComputerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Computer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComputerAggregateArgs>(args: Subset<T, ComputerAggregateArgs>): Prisma.PrismaPromise<GetComputerAggregateType<T>>

    /**
     * Group by Computer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComputerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComputerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComputerGroupByArgs['orderBy'] }
        : { orderBy?: ComputerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComputerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComputerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Computer model
   */
  readonly fields: ComputerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Computer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComputerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cyberCenter<T extends Computer$cyberCenterArgs<ExtArgs> = {}>(args?: Subset<T, Computer$cyberCenterArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends Computer$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Computer$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Computer$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Computer$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commands<T extends Computer$commandsArgs<ExtArgs> = {}>(args?: Subset<T, Computer$commandsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Computer model
   */
  interface ComputerFieldRefs {
    readonly id: FieldRef<"Computer", 'String'>
    readonly name: FieldRef<"Computer", 'String'>
    readonly deviceToken: FieldRef<"Computer", 'String'>
    readonly status: FieldRef<"Computer", 'ComputerStatus'>
    readonly lastSeenAt: FieldRef<"Computer", 'DateTime'>
    readonly cyberCenterId: FieldRef<"Computer", 'String'>
    readonly createdAt: FieldRef<"Computer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Computer findUnique
   */
  export type ComputerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter, which Computer to fetch.
     */
    where: ComputerWhereUniqueInput
  }

  /**
   * Computer findUniqueOrThrow
   */
  export type ComputerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter, which Computer to fetch.
     */
    where: ComputerWhereUniqueInput
  }

  /**
   * Computer findFirst
   */
  export type ComputerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter, which Computer to fetch.
     */
    where?: ComputerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Computers to fetch.
     */
    orderBy?: ComputerOrderByWithRelationInput | ComputerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Computers.
     */
    cursor?: ComputerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Computers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Computers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Computers.
     */
    distinct?: ComputerScalarFieldEnum | ComputerScalarFieldEnum[]
  }

  /**
   * Computer findFirstOrThrow
   */
  export type ComputerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter, which Computer to fetch.
     */
    where?: ComputerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Computers to fetch.
     */
    orderBy?: ComputerOrderByWithRelationInput | ComputerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Computers.
     */
    cursor?: ComputerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Computers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Computers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Computers.
     */
    distinct?: ComputerScalarFieldEnum | ComputerScalarFieldEnum[]
  }

  /**
   * Computer findMany
   */
  export type ComputerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter, which Computers to fetch.
     */
    where?: ComputerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Computers to fetch.
     */
    orderBy?: ComputerOrderByWithRelationInput | ComputerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Computers.
     */
    cursor?: ComputerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Computers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Computers.
     */
    skip?: number
    distinct?: ComputerScalarFieldEnum | ComputerScalarFieldEnum[]
  }

  /**
   * Computer create
   */
  export type ComputerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * The data needed to create a Computer.
     */
    data: XOR<ComputerCreateInput, ComputerUncheckedCreateInput>
  }

  /**
   * Computer createMany
   */
  export type ComputerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Computers.
     */
    data: ComputerCreateManyInput | ComputerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Computer createManyAndReturn
   */
  export type ComputerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * The data used to create many Computers.
     */
    data: ComputerCreateManyInput | ComputerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Computer update
   */
  export type ComputerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * The data needed to update a Computer.
     */
    data: XOR<ComputerUpdateInput, ComputerUncheckedUpdateInput>
    /**
     * Choose, which Computer to update.
     */
    where: ComputerWhereUniqueInput
  }

  /**
   * Computer updateMany
   */
  export type ComputerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Computers.
     */
    data: XOR<ComputerUpdateManyMutationInput, ComputerUncheckedUpdateManyInput>
    /**
     * Filter which Computers to update
     */
    where?: ComputerWhereInput
    /**
     * Limit how many Computers to update.
     */
    limit?: number
  }

  /**
   * Computer updateManyAndReturn
   */
  export type ComputerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * The data used to update Computers.
     */
    data: XOR<ComputerUpdateManyMutationInput, ComputerUncheckedUpdateManyInput>
    /**
     * Filter which Computers to update
     */
    where?: ComputerWhereInput
    /**
     * Limit how many Computers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Computer upsert
   */
  export type ComputerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * The filter to search for the Computer to update in case it exists.
     */
    where: ComputerWhereUniqueInput
    /**
     * In case the Computer found by the `where` argument doesn't exist, create a new Computer with this data.
     */
    create: XOR<ComputerCreateInput, ComputerUncheckedCreateInput>
    /**
     * In case the Computer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComputerUpdateInput, ComputerUncheckedUpdateInput>
  }

  /**
   * Computer delete
   */
  export type ComputerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    /**
     * Filter which Computer to delete.
     */
    where: ComputerWhereUniqueInput
  }

  /**
   * Computer deleteMany
   */
  export type ComputerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Computers to delete
     */
    where?: ComputerWhereInput
    /**
     * Limit how many Computers to delete.
     */
    limit?: number
  }

  /**
   * Computer.cyberCenter
   */
  export type Computer$cyberCenterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    where?: CyberCenterWhereInput
  }

  /**
   * Computer.sessions
   */
  export type Computer$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Computer.events
   */
  export type Computer$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Computer.commands
   */
  export type Computer$commandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    where?: CommandWhereInput
    orderBy?: CommandOrderByWithRelationInput | CommandOrderByWithRelationInput[]
    cursor?: CommandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommandScalarFieldEnum | CommandScalarFieldEnum[]
  }

  /**
   * Computer without action
   */
  export type ComputerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    pricePerMinute: number | null
    totalCost: number | null
  }

  export type SessionSumAggregateOutputType = {
    pricePerMinute: number | null
    totalCost: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    computerId: string | null
    cyberCenterId: string | null
    userId: string | null
    startedAt: Date | null
    endedAt: Date | null
    status: $Enums.SessionStatus | null
    pricePerMinute: number | null
    totalCost: number | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    computerId: string | null
    cyberCenterId: string | null
    userId: string | null
    startedAt: Date | null
    endedAt: Date | null
    status: $Enums.SessionStatus | null
    pricePerMinute: number | null
    totalCost: number | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    computerId: number
    cyberCenterId: number
    userId: number
    startedAt: number
    endedAt: number
    status: number
    pricePerMinute: number
    totalCost: number
    createdAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    pricePerMinute?: true
    totalCost?: true
  }

  export type SessionSumAggregateInputType = {
    pricePerMinute?: true
    totalCost?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    computerId?: true
    cyberCenterId?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    pricePerMinute?: true
    totalCost?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    computerId?: true
    cyberCenterId?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    pricePerMinute?: true
    totalCost?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    computerId?: true
    cyberCenterId?: true
    userId?: true
    startedAt?: true
    endedAt?: true
    status?: true
    pricePerMinute?: true
    totalCost?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    computerId: string
    cyberCenterId: string | null
    userId: string | null
    startedAt: Date | null
    endedAt: Date | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost: number | null
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    cyberCenterId?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    pricePerMinute?: boolean
    totalCost?: boolean
    createdAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    cyberCenterId?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    pricePerMinute?: boolean
    totalCost?: boolean
    createdAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    cyberCenterId?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    pricePerMinute?: boolean
    totalCost?: boolean
    createdAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    computerId?: boolean
    cyberCenterId?: boolean
    userId?: boolean
    startedAt?: boolean
    endedAt?: boolean
    status?: boolean
    pricePerMinute?: boolean
    totalCost?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "computerId" | "cyberCenterId" | "userId" | "startedAt" | "endedAt" | "status" | "pricePerMinute" | "totalCost" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
    cyberCenter?: boolean | Session$cyberCenterArgs<ExtArgs>
    user?: boolean | Session$userArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      computer: Prisma.$ComputerPayload<ExtArgs>
      cyberCenter: Prisma.$CyberCenterPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      computerId: string
      cyberCenterId: string | null
      userId: string | null
      startedAt: Date | null
      endedAt: Date | null
      status: $Enums.SessionStatus
      pricePerMinute: number
      totalCost: number | null
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    computer<T extends ComputerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComputerDefaultArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cyberCenter<T extends Session$cyberCenterArgs<ExtArgs> = {}>(args?: Subset<T, Session$cyberCenterArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends Session$userArgs<ExtArgs> = {}>(args?: Subset<T, Session$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly computerId: FieldRef<"Session", 'String'>
    readonly cyberCenterId: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly startedAt: FieldRef<"Session", 'DateTime'>
    readonly endedAt: FieldRef<"Session", 'DateTime'>
    readonly status: FieldRef<"Session", 'SessionStatus'>
    readonly pricePerMinute: FieldRef<"Session", 'Int'>
    readonly totalCost: FieldRef<"Session", 'Int'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.cyberCenter
   */
  export type Session$cyberCenterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    where?: CyberCenterWhereInput
  }

  /**
   * Session.user
   */
  export type Session$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Pricing
   */

  export type AggregatePricing = {
    _count: PricingCountAggregateOutputType | null
    _avg: PricingAvgAggregateOutputType | null
    _sum: PricingSumAggregateOutputType | null
    _min: PricingMinAggregateOutputType | null
    _max: PricingMaxAggregateOutputType | null
  }

  export type PricingAvgAggregateOutputType = {
    pricePerMinute: number | null
  }

  export type PricingSumAggregateOutputType = {
    pricePerMinute: number | null
  }

  export type PricingMinAggregateOutputType = {
    id: string | null
    pricePerMinute: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PricingMaxAggregateOutputType = {
    id: string | null
    pricePerMinute: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type PricingCountAggregateOutputType = {
    id: number
    pricePerMinute: number
    active: number
    createdAt: number
    _all: number
  }


  export type PricingAvgAggregateInputType = {
    pricePerMinute?: true
  }

  export type PricingSumAggregateInputType = {
    pricePerMinute?: true
  }

  export type PricingMinAggregateInputType = {
    id?: true
    pricePerMinute?: true
    active?: true
    createdAt?: true
  }

  export type PricingMaxAggregateInputType = {
    id?: true
    pricePerMinute?: true
    active?: true
    createdAt?: true
  }

  export type PricingCountAggregateInputType = {
    id?: true
    pricePerMinute?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type PricingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pricing to aggregate.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pricings
    **/
    _count?: true | PricingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingMaxAggregateInputType
  }

  export type GetPricingAggregateType<T extends PricingAggregateArgs> = {
        [P in keyof T & keyof AggregatePricing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricing[P]>
      : GetScalarType<T[P], AggregatePricing[P]>
  }




  export type PricingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingWhereInput
    orderBy?: PricingOrderByWithAggregationInput | PricingOrderByWithAggregationInput[]
    by: PricingScalarFieldEnum[] | PricingScalarFieldEnum
    having?: PricingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingCountAggregateInputType | true
    _avg?: PricingAvgAggregateInputType
    _sum?: PricingSumAggregateInputType
    _min?: PricingMinAggregateInputType
    _max?: PricingMaxAggregateInputType
  }

  export type PricingGroupByOutputType = {
    id: string
    pricePerMinute: number
    active: boolean
    createdAt: Date
    _count: PricingCountAggregateOutputType | null
    _avg: PricingAvgAggregateOutputType | null
    _sum: PricingSumAggregateOutputType | null
    _min: PricingMinAggregateOutputType | null
    _max: PricingMaxAggregateOutputType | null
  }

  type GetPricingGroupByPayload<T extends PricingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingGroupByOutputType[P]>
            : GetScalarType<T[P], PricingGroupByOutputType[P]>
        }
      >
    >


  export type PricingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pricePerMinute?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pricePerMinute?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pricePerMinute?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectScalar = {
    id?: boolean
    pricePerMinute?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type PricingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pricePerMinute" | "active" | "createdAt", ExtArgs["result"]["pricing"]>

  export type $PricingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pricing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pricePerMinute: number
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["pricing"]>
    composites: {}
  }

  type PricingGetPayload<S extends boolean | null | undefined | PricingDefaultArgs> = $Result.GetResult<Prisma.$PricingPayload, S>

  type PricingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PricingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PricingCountAggregateInputType | true
    }

  export interface PricingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pricing'], meta: { name: 'Pricing' } }
    /**
     * Find zero or one Pricing that matches the filter.
     * @param {PricingFindUniqueArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingFindUniqueArgs>(args: SelectSubset<T, PricingFindUniqueArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pricing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PricingFindUniqueOrThrowArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pricing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindFirstArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingFindFirstArgs>(args?: SelectSubset<T, PricingFindFirstArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pricing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindFirstOrThrowArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pricings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pricings
     * const pricings = await prisma.pricing.findMany()
     * 
     * // Get first 10 Pricings
     * const pricings = await prisma.pricing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingWithIdOnly = await prisma.pricing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingFindManyArgs>(args?: SelectSubset<T, PricingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pricing.
     * @param {PricingCreateArgs} args - Arguments to create a Pricing.
     * @example
     * // Create one Pricing
     * const Pricing = await prisma.pricing.create({
     *   data: {
     *     // ... data to create a Pricing
     *   }
     * })
     * 
     */
    create<T extends PricingCreateArgs>(args: SelectSubset<T, PricingCreateArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pricings.
     * @param {PricingCreateManyArgs} args - Arguments to create many Pricings.
     * @example
     * // Create many Pricings
     * const pricing = await prisma.pricing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingCreateManyArgs>(args?: SelectSubset<T, PricingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pricings and returns the data saved in the database.
     * @param {PricingCreateManyAndReturnArgs} args - Arguments to create many Pricings.
     * @example
     * // Create many Pricings
     * const pricing = await prisma.pricing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pricings and only return the `id`
     * const pricingWithIdOnly = await prisma.pricing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PricingCreateManyAndReturnArgs>(args?: SelectSubset<T, PricingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pricing.
     * @param {PricingDeleteArgs} args - Arguments to delete one Pricing.
     * @example
     * // Delete one Pricing
     * const Pricing = await prisma.pricing.delete({
     *   where: {
     *     // ... filter to delete one Pricing
     *   }
     * })
     * 
     */
    delete<T extends PricingDeleteArgs>(args: SelectSubset<T, PricingDeleteArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pricing.
     * @param {PricingUpdateArgs} args - Arguments to update one Pricing.
     * @example
     * // Update one Pricing
     * const pricing = await prisma.pricing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingUpdateArgs>(args: SelectSubset<T, PricingUpdateArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pricings.
     * @param {PricingDeleteManyArgs} args - Arguments to filter Pricings to delete.
     * @example
     * // Delete a few Pricings
     * const { count } = await prisma.pricing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingDeleteManyArgs>(args?: SelectSubset<T, PricingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pricings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pricings
     * const pricing = await prisma.pricing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingUpdateManyArgs>(args: SelectSubset<T, PricingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pricings and returns the data updated in the database.
     * @param {PricingUpdateManyAndReturnArgs} args - Arguments to update many Pricings.
     * @example
     * // Update many Pricings
     * const pricing = await prisma.pricing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pricings and only return the `id`
     * const pricingWithIdOnly = await prisma.pricing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PricingUpdateManyAndReturnArgs>(args: SelectSubset<T, PricingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pricing.
     * @param {PricingUpsertArgs} args - Arguments to update or create a Pricing.
     * @example
     * // Update or create a Pricing
     * const pricing = await prisma.pricing.upsert({
     *   create: {
     *     // ... data to create a Pricing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pricing we want to update
     *   }
     * })
     */
    upsert<T extends PricingUpsertArgs>(args: SelectSubset<T, PricingUpsertArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pricings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingCountArgs} args - Arguments to filter Pricings to count.
     * @example
     * // Count the number of Pricings
     * const count = await prisma.pricing.count({
     *   where: {
     *     // ... the filter for the Pricings we want to count
     *   }
     * })
    **/
    count<T extends PricingCountArgs>(
      args?: Subset<T, PricingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pricing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingAggregateArgs>(args: Subset<T, PricingAggregateArgs>): Prisma.PrismaPromise<GetPricingAggregateType<T>>

    /**
     * Group by Pricing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingGroupByArgs['orderBy'] }
        : { orderBy?: PricingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pricing model
   */
  readonly fields: PricingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pricing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pricing model
   */
  interface PricingFieldRefs {
    readonly id: FieldRef<"Pricing", 'String'>
    readonly pricePerMinute: FieldRef<"Pricing", 'Int'>
    readonly active: FieldRef<"Pricing", 'Boolean'>
    readonly createdAt: FieldRef<"Pricing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pricing findUnique
   */
  export type PricingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing findUniqueOrThrow
   */
  export type PricingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing findFirst
   */
  export type PricingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pricings.
     */
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing findFirstOrThrow
   */
  export type PricingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pricings.
     */
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing findMany
   */
  export type PricingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter, which Pricings to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing create
   */
  export type PricingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data needed to create a Pricing.
     */
    data: XOR<PricingCreateInput, PricingUncheckedCreateInput>
  }

  /**
   * Pricing createMany
   */
  export type PricingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pricings.
     */
    data: PricingCreateManyInput | PricingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pricing createManyAndReturn
   */
  export type PricingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data used to create many Pricings.
     */
    data: PricingCreateManyInput | PricingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pricing update
   */
  export type PricingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data needed to update a Pricing.
     */
    data: XOR<PricingUpdateInput, PricingUncheckedUpdateInput>
    /**
     * Choose, which Pricing to update.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing updateMany
   */
  export type PricingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pricings.
     */
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyInput>
    /**
     * Filter which Pricings to update
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to update.
     */
    limit?: number
  }

  /**
   * Pricing updateManyAndReturn
   */
  export type PricingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data used to update Pricings.
     */
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyInput>
    /**
     * Filter which Pricings to update
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to update.
     */
    limit?: number
  }

  /**
   * Pricing upsert
   */
  export type PricingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The filter to search for the Pricing to update in case it exists.
     */
    where: PricingWhereUniqueInput
    /**
     * In case the Pricing found by the `where` argument doesn't exist, create a new Pricing with this data.
     */
    create: XOR<PricingCreateInput, PricingUncheckedCreateInput>
    /**
     * In case the Pricing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingUpdateInput, PricingUncheckedUpdateInput>
  }

  /**
   * Pricing delete
   */
  export type PricingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Filter which Pricing to delete.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing deleteMany
   */
  export type PricingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pricings to delete
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to delete.
     */
    limit?: number
  }

  /**
   * Pricing without action
   */
  export type PricingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    balance: number | null
  }

  export type UserSumAggregateOutputType = {
    balance: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    balance: number | null
    cyberCenterId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    balance: number | null
    cyberCenterId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    balance: number
    cyberCenterId: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    balance?: true
  }

  export type UserSumAggregateInputType = {
    balance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    balance?: true
    cyberCenterId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    balance?: true
    cyberCenterId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    balance?: true
    cyberCenterId?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance: number
    cyberCenterId: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    balance?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    balance?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    balance?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    balance?: boolean
    cyberCenterId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "balance" | "cyberCenterId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cyberCenter?: boolean | User$cyberCenterArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cyberCenter: Prisma.$CyberCenterPayload<ExtArgs> | null
      events: Prisma.$EventPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      balance: number
      cyberCenterId: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cyberCenter<T extends User$cyberCenterArgs<ExtArgs> = {}>(args?: Subset<T, User$cyberCenterArgs<ExtArgs>>): Prisma__CyberCenterClient<$Result.GetResult<Prisma.$CyberCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly balance: FieldRef<"User", 'Int'>
    readonly cyberCenterId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cyberCenter
   */
  export type User$cyberCenterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CyberCenter
     */
    select?: CyberCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CyberCenter
     */
    omit?: CyberCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CyberCenterInclude<ExtArgs> | null
    where?: CyberCenterWhereInput
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    type: $Enums.EventType | null
    createdAt: Date | null
    userId: string | null
    computerId: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    type: $Enums.EventType | null
    createdAt: Date | null
    userId: string | null
    computerId: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    type: number
    payload: number
    createdAt: number
    userId: number
    computerId: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    userId?: true
    computerId?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    userId?: true
    computerId?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    type?: true
    payload?: true
    createdAt?: true
    userId?: true
    computerId?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    type: $Enums.EventType
    payload: JsonValue | null
    createdAt: Date
    userId: string | null
    computerId: string | null
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    payload?: boolean
    createdAt?: boolean
    userId?: boolean
    computerId?: boolean
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    payload?: boolean
    createdAt?: boolean
    userId?: boolean
    computerId?: boolean
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    payload?: boolean
    createdAt?: boolean
    userId?: boolean
    computerId?: boolean
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    type?: boolean
    payload?: boolean
    createdAt?: boolean
    userId?: boolean
    computerId?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "payload" | "createdAt" | "userId" | "computerId", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Event$userArgs<ExtArgs>
    computer?: boolean | Event$computerArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      computer: Prisma.$ComputerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.EventType
      payload: Prisma.JsonValue | null
      createdAt: Date
      userId: string | null
      computerId: string | null
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Event$userArgs<ExtArgs> = {}>(args?: Subset<T, Event$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    computer<T extends Event$computerArgs<ExtArgs> = {}>(args?: Subset<T, Event$computerArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly type: FieldRef<"Event", 'EventType'>
    readonly payload: FieldRef<"Event", 'Json'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly userId: FieldRef<"Event", 'String'>
    readonly computerId: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.user
   */
  export type Event$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Event.computer
   */
  export type Event$computerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Computer
     */
    select?: ComputerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Computer
     */
    omit?: ComputerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComputerInclude<ExtArgs> | null
    where?: ComputerWhereInput
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Command
   */

  export type AggregateCommand = {
    _count: CommandCountAggregateOutputType | null
    _min: CommandMinAggregateOutputType | null
    _max: CommandMaxAggregateOutputType | null
  }

  export type CommandMinAggregateOutputType = {
    id: string | null
    computerId: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
    sentAt: Date | null
    ackedAt: Date | null
  }

  export type CommandMaxAggregateOutputType = {
    id: string | null
    computerId: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
    sentAt: Date | null
    ackedAt: Date | null
  }

  export type CommandCountAggregateOutputType = {
    id: number
    computerId: number
    type: number
    status: number
    createdAt: number
    sentAt: number
    ackedAt: number
    _all: number
  }


  export type CommandMinAggregateInputType = {
    id?: true
    computerId?: true
    type?: true
    status?: true
    createdAt?: true
    sentAt?: true
    ackedAt?: true
  }

  export type CommandMaxAggregateInputType = {
    id?: true
    computerId?: true
    type?: true
    status?: true
    createdAt?: true
    sentAt?: true
    ackedAt?: true
  }

  export type CommandCountAggregateInputType = {
    id?: true
    computerId?: true
    type?: true
    status?: true
    createdAt?: true
    sentAt?: true
    ackedAt?: true
    _all?: true
  }

  export type CommandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Command to aggregate.
     */
    where?: CommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commands to fetch.
     */
    orderBy?: CommandOrderByWithRelationInput | CommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commands
    **/
    _count?: true | CommandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommandMaxAggregateInputType
  }

  export type GetCommandAggregateType<T extends CommandAggregateArgs> = {
        [P in keyof T & keyof AggregateCommand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommand[P]>
      : GetScalarType<T[P], AggregateCommand[P]>
  }




  export type CommandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommandWhereInput
    orderBy?: CommandOrderByWithAggregationInput | CommandOrderByWithAggregationInput[]
    by: CommandScalarFieldEnum[] | CommandScalarFieldEnum
    having?: CommandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommandCountAggregateInputType | true
    _min?: CommandMinAggregateInputType
    _max?: CommandMaxAggregateInputType
  }

  export type CommandGroupByOutputType = {
    id: string
    computerId: string
    type: string
    status: string
    createdAt: Date
    sentAt: Date | null
    ackedAt: Date | null
    _count: CommandCountAggregateOutputType | null
    _min: CommandMinAggregateOutputType | null
    _max: CommandMaxAggregateOutputType | null
  }

  type GetCommandGroupByPayload<T extends CommandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommandGroupByOutputType[P]>
            : GetScalarType<T[P], CommandGroupByOutputType[P]>
        }
      >
    >


  export type CommandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    sentAt?: boolean
    ackedAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["command"]>

  export type CommandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    sentAt?: boolean
    ackedAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["command"]>

  export type CommandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    computerId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    sentAt?: boolean
    ackedAt?: boolean
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["command"]>

  export type CommandSelectScalar = {
    id?: boolean
    computerId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    sentAt?: boolean
    ackedAt?: boolean
  }

  export type CommandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "computerId" | "type" | "status" | "createdAt" | "sentAt" | "ackedAt", ExtArgs["result"]["command"]>
  export type CommandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }
  export type CommandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }
  export type CommandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    computer?: boolean | ComputerDefaultArgs<ExtArgs>
  }

  export type $CommandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Command"
    objects: {
      computer: Prisma.$ComputerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      computerId: string
      type: string
      status: string
      createdAt: Date
      sentAt: Date | null
      ackedAt: Date | null
    }, ExtArgs["result"]["command"]>
    composites: {}
  }

  type CommandGetPayload<S extends boolean | null | undefined | CommandDefaultArgs> = $Result.GetResult<Prisma.$CommandPayload, S>

  type CommandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommandCountAggregateInputType | true
    }

  export interface CommandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Command'], meta: { name: 'Command' } }
    /**
     * Find zero or one Command that matches the filter.
     * @param {CommandFindUniqueArgs} args - Arguments to find a Command
     * @example
     * // Get one Command
     * const command = await prisma.command.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommandFindUniqueArgs>(args: SelectSubset<T, CommandFindUniqueArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Command that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommandFindUniqueOrThrowArgs} args - Arguments to find a Command
     * @example
     * // Get one Command
     * const command = await prisma.command.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommandFindUniqueOrThrowArgs>(args: SelectSubset<T, CommandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Command that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandFindFirstArgs} args - Arguments to find a Command
     * @example
     * // Get one Command
     * const command = await prisma.command.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommandFindFirstArgs>(args?: SelectSubset<T, CommandFindFirstArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Command that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandFindFirstOrThrowArgs} args - Arguments to find a Command
     * @example
     * // Get one Command
     * const command = await prisma.command.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommandFindFirstOrThrowArgs>(args?: SelectSubset<T, CommandFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commands
     * const commands = await prisma.command.findMany()
     * 
     * // Get first 10 Commands
     * const commands = await prisma.command.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commandWithIdOnly = await prisma.command.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommandFindManyArgs>(args?: SelectSubset<T, CommandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Command.
     * @param {CommandCreateArgs} args - Arguments to create a Command.
     * @example
     * // Create one Command
     * const Command = await prisma.command.create({
     *   data: {
     *     // ... data to create a Command
     *   }
     * })
     * 
     */
    create<T extends CommandCreateArgs>(args: SelectSubset<T, CommandCreateArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commands.
     * @param {CommandCreateManyArgs} args - Arguments to create many Commands.
     * @example
     * // Create many Commands
     * const command = await prisma.command.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommandCreateManyArgs>(args?: SelectSubset<T, CommandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commands and returns the data saved in the database.
     * @param {CommandCreateManyAndReturnArgs} args - Arguments to create many Commands.
     * @example
     * // Create many Commands
     * const command = await prisma.command.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commands and only return the `id`
     * const commandWithIdOnly = await prisma.command.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommandCreateManyAndReturnArgs>(args?: SelectSubset<T, CommandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Command.
     * @param {CommandDeleteArgs} args - Arguments to delete one Command.
     * @example
     * // Delete one Command
     * const Command = await prisma.command.delete({
     *   where: {
     *     // ... filter to delete one Command
     *   }
     * })
     * 
     */
    delete<T extends CommandDeleteArgs>(args: SelectSubset<T, CommandDeleteArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Command.
     * @param {CommandUpdateArgs} args - Arguments to update one Command.
     * @example
     * // Update one Command
     * const command = await prisma.command.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommandUpdateArgs>(args: SelectSubset<T, CommandUpdateArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commands.
     * @param {CommandDeleteManyArgs} args - Arguments to filter Commands to delete.
     * @example
     * // Delete a few Commands
     * const { count } = await prisma.command.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommandDeleteManyArgs>(args?: SelectSubset<T, CommandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commands
     * const command = await prisma.command.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommandUpdateManyArgs>(args: SelectSubset<T, CommandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commands and returns the data updated in the database.
     * @param {CommandUpdateManyAndReturnArgs} args - Arguments to update many Commands.
     * @example
     * // Update many Commands
     * const command = await prisma.command.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commands and only return the `id`
     * const commandWithIdOnly = await prisma.command.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommandUpdateManyAndReturnArgs>(args: SelectSubset<T, CommandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Command.
     * @param {CommandUpsertArgs} args - Arguments to update or create a Command.
     * @example
     * // Update or create a Command
     * const command = await prisma.command.upsert({
     *   create: {
     *     // ... data to create a Command
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Command we want to update
     *   }
     * })
     */
    upsert<T extends CommandUpsertArgs>(args: SelectSubset<T, CommandUpsertArgs<ExtArgs>>): Prisma__CommandClient<$Result.GetResult<Prisma.$CommandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandCountArgs} args - Arguments to filter Commands to count.
     * @example
     * // Count the number of Commands
     * const count = await prisma.command.count({
     *   where: {
     *     // ... the filter for the Commands we want to count
     *   }
     * })
    **/
    count<T extends CommandCountArgs>(
      args?: Subset<T, CommandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Command.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommandAggregateArgs>(args: Subset<T, CommandAggregateArgs>): Prisma.PrismaPromise<GetCommandAggregateType<T>>

    /**
     * Group by Command.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommandGroupByArgs['orderBy'] }
        : { orderBy?: CommandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Command model
   */
  readonly fields: CommandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Command.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    computer<T extends ComputerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComputerDefaultArgs<ExtArgs>>): Prisma__ComputerClient<$Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Command model
   */
  interface CommandFieldRefs {
    readonly id: FieldRef<"Command", 'String'>
    readonly computerId: FieldRef<"Command", 'String'>
    readonly type: FieldRef<"Command", 'String'>
    readonly status: FieldRef<"Command", 'String'>
    readonly createdAt: FieldRef<"Command", 'DateTime'>
    readonly sentAt: FieldRef<"Command", 'DateTime'>
    readonly ackedAt: FieldRef<"Command", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Command findUnique
   */
  export type CommandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter, which Command to fetch.
     */
    where: CommandWhereUniqueInput
  }

  /**
   * Command findUniqueOrThrow
   */
  export type CommandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter, which Command to fetch.
     */
    where: CommandWhereUniqueInput
  }

  /**
   * Command findFirst
   */
  export type CommandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter, which Command to fetch.
     */
    where?: CommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commands to fetch.
     */
    orderBy?: CommandOrderByWithRelationInput | CommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commands.
     */
    cursor?: CommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commands.
     */
    distinct?: CommandScalarFieldEnum | CommandScalarFieldEnum[]
  }

  /**
   * Command findFirstOrThrow
   */
  export type CommandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter, which Command to fetch.
     */
    where?: CommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commands to fetch.
     */
    orderBy?: CommandOrderByWithRelationInput | CommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commands.
     */
    cursor?: CommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commands.
     */
    distinct?: CommandScalarFieldEnum | CommandScalarFieldEnum[]
  }

  /**
   * Command findMany
   */
  export type CommandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter, which Commands to fetch.
     */
    where?: CommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commands to fetch.
     */
    orderBy?: CommandOrderByWithRelationInput | CommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commands.
     */
    cursor?: CommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commands.
     */
    skip?: number
    distinct?: CommandScalarFieldEnum | CommandScalarFieldEnum[]
  }

  /**
   * Command create
   */
  export type CommandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * The data needed to create a Command.
     */
    data: XOR<CommandCreateInput, CommandUncheckedCreateInput>
  }

  /**
   * Command createMany
   */
  export type CommandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commands.
     */
    data: CommandCreateManyInput | CommandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Command createManyAndReturn
   */
  export type CommandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * The data used to create many Commands.
     */
    data: CommandCreateManyInput | CommandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Command update
   */
  export type CommandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * The data needed to update a Command.
     */
    data: XOR<CommandUpdateInput, CommandUncheckedUpdateInput>
    /**
     * Choose, which Command to update.
     */
    where: CommandWhereUniqueInput
  }

  /**
   * Command updateMany
   */
  export type CommandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commands.
     */
    data: XOR<CommandUpdateManyMutationInput, CommandUncheckedUpdateManyInput>
    /**
     * Filter which Commands to update
     */
    where?: CommandWhereInput
    /**
     * Limit how many Commands to update.
     */
    limit?: number
  }

  /**
   * Command updateManyAndReturn
   */
  export type CommandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * The data used to update Commands.
     */
    data: XOR<CommandUpdateManyMutationInput, CommandUncheckedUpdateManyInput>
    /**
     * Filter which Commands to update
     */
    where?: CommandWhereInput
    /**
     * Limit how many Commands to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Command upsert
   */
  export type CommandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * The filter to search for the Command to update in case it exists.
     */
    where: CommandWhereUniqueInput
    /**
     * In case the Command found by the `where` argument doesn't exist, create a new Command with this data.
     */
    create: XOR<CommandCreateInput, CommandUncheckedCreateInput>
    /**
     * In case the Command was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommandUpdateInput, CommandUncheckedUpdateInput>
  }

  /**
   * Command delete
   */
  export type CommandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
    /**
     * Filter which Command to delete.
     */
    where: CommandWhereUniqueInput
  }

  /**
   * Command deleteMany
   */
  export type CommandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commands to delete
     */
    where?: CommandWhereInput
    /**
     * Limit how many Commands to delete.
     */
    limit?: number
  }

  /**
   * Command without action
   */
  export type CommandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Command
     */
    select?: CommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Command
     */
    omit?: CommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommandInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const CyberCenterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    organizationId: 'organizationId',
    createdAt: 'createdAt'
  };

  export type CyberCenterScalarFieldEnum = (typeof CyberCenterScalarFieldEnum)[keyof typeof CyberCenterScalarFieldEnum]


  export const ComputerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    deviceToken: 'deviceToken',
    status: 'status',
    lastSeenAt: 'lastSeenAt',
    cyberCenterId: 'cyberCenterId',
    createdAt: 'createdAt'
  };

  export type ComputerScalarFieldEnum = (typeof ComputerScalarFieldEnum)[keyof typeof ComputerScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    computerId: 'computerId',
    cyberCenterId: 'cyberCenterId',
    userId: 'userId',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    status: 'status',
    pricePerMinute: 'pricePerMinute',
    totalCost: 'totalCost',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const PricingScalarFieldEnum: {
    id: 'id',
    pricePerMinute: 'pricePerMinute',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type PricingScalarFieldEnum = (typeof PricingScalarFieldEnum)[keyof typeof PricingScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    balance: 'balance',
    cyberCenterId: 'cyberCenterId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    type: 'type',
    payload: 'payload',
    createdAt: 'createdAt',
    userId: 'userId',
    computerId: 'computerId'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const CommandScalarFieldEnum: {
    id: 'id',
    computerId: 'computerId',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt',
    sentAt: 'sentAt',
    ackedAt: 'ackedAt'
  };

  export type CommandScalarFieldEnum = (typeof CommandScalarFieldEnum)[keyof typeof CommandScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ComputerStatus'
   */
  export type EnumComputerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerStatus'>
    


  /**
   * Reference to a field of type 'ComputerStatus[]'
   */
  export type ListEnumComputerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerStatus[]'>
    


  /**
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'SessionStatus[]'
   */
  export type ListEnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    cyberCenters?: CyberCenterListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    cyberCenters?: CyberCenterOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    cyberCenters?: CyberCenterListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type CyberCenterWhereInput = {
    AND?: CyberCenterWhereInput | CyberCenterWhereInput[]
    OR?: CyberCenterWhereInput[]
    NOT?: CyberCenterWhereInput | CyberCenterWhereInput[]
    id?: StringFilter<"CyberCenter"> | string
    name?: StringFilter<"CyberCenter"> | string
    location?: StringNullableFilter<"CyberCenter"> | string | null
    organizationId?: StringFilter<"CyberCenter"> | string
    createdAt?: DateTimeFilter<"CyberCenter"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    computers?: ComputerListRelationFilter
    sessions?: SessionListRelationFilter
    users?: UserListRelationFilter
  }

  export type CyberCenterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    computers?: ComputerOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type CyberCenterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CyberCenterWhereInput | CyberCenterWhereInput[]
    OR?: CyberCenterWhereInput[]
    NOT?: CyberCenterWhereInput | CyberCenterWhereInput[]
    name?: StringFilter<"CyberCenter"> | string
    location?: StringNullableFilter<"CyberCenter"> | string | null
    organizationId?: StringFilter<"CyberCenter"> | string
    createdAt?: DateTimeFilter<"CyberCenter"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    computers?: ComputerListRelationFilter
    sessions?: SessionListRelationFilter
    users?: UserListRelationFilter
  }, "id">

  export type CyberCenterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
    _count?: CyberCenterCountOrderByAggregateInput
    _max?: CyberCenterMaxOrderByAggregateInput
    _min?: CyberCenterMinOrderByAggregateInput
  }

  export type CyberCenterScalarWhereWithAggregatesInput = {
    AND?: CyberCenterScalarWhereWithAggregatesInput | CyberCenterScalarWhereWithAggregatesInput[]
    OR?: CyberCenterScalarWhereWithAggregatesInput[]
    NOT?: CyberCenterScalarWhereWithAggregatesInput | CyberCenterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CyberCenter"> | string
    name?: StringWithAggregatesFilter<"CyberCenter"> | string
    location?: StringNullableWithAggregatesFilter<"CyberCenter"> | string | null
    organizationId?: StringWithAggregatesFilter<"CyberCenter"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CyberCenter"> | Date | string
  }

  export type ComputerWhereInput = {
    AND?: ComputerWhereInput | ComputerWhereInput[]
    OR?: ComputerWhereInput[]
    NOT?: ComputerWhereInput | ComputerWhereInput[]
    id?: StringFilter<"Computer"> | string
    name?: StringFilter<"Computer"> | string
    deviceToken?: StringFilter<"Computer"> | string
    status?: EnumComputerStatusFilter<"Computer"> | $Enums.ComputerStatus
    lastSeenAt?: DateTimeNullableFilter<"Computer"> | Date | string | null
    cyberCenterId?: StringNullableFilter<"Computer"> | string | null
    createdAt?: DateTimeFilter<"Computer"> | Date | string
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    sessions?: SessionListRelationFilter
    events?: EventListRelationFilter
    commands?: CommandListRelationFilter
  }

  export type ComputerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    deviceToken?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cyberCenter?: CyberCenterOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    commands?: CommandOrderByRelationAggregateInput
  }

  export type ComputerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deviceToken?: string
    AND?: ComputerWhereInput | ComputerWhereInput[]
    OR?: ComputerWhereInput[]
    NOT?: ComputerWhereInput | ComputerWhereInput[]
    name?: StringFilter<"Computer"> | string
    status?: EnumComputerStatusFilter<"Computer"> | $Enums.ComputerStatus
    lastSeenAt?: DateTimeNullableFilter<"Computer"> | Date | string | null
    cyberCenterId?: StringNullableFilter<"Computer"> | string | null
    createdAt?: DateTimeFilter<"Computer"> | Date | string
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    sessions?: SessionListRelationFilter
    events?: EventListRelationFilter
    commands?: CommandListRelationFilter
  }, "id" | "deviceToken">

  export type ComputerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    deviceToken?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ComputerCountOrderByAggregateInput
    _max?: ComputerMaxOrderByAggregateInput
    _min?: ComputerMinOrderByAggregateInput
  }

  export type ComputerScalarWhereWithAggregatesInput = {
    AND?: ComputerScalarWhereWithAggregatesInput | ComputerScalarWhereWithAggregatesInput[]
    OR?: ComputerScalarWhereWithAggregatesInput[]
    NOT?: ComputerScalarWhereWithAggregatesInput | ComputerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Computer"> | string
    name?: StringWithAggregatesFilter<"Computer"> | string
    deviceToken?: StringWithAggregatesFilter<"Computer"> | string
    status?: EnumComputerStatusWithAggregatesFilter<"Computer"> | $Enums.ComputerStatus
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Computer"> | Date | string | null
    cyberCenterId?: StringNullableWithAggregatesFilter<"Computer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Computer"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    computerId?: StringFilter<"Session"> | string
    cyberCenterId?: StringNullableFilter<"Session"> | string | null
    userId?: StringNullableFilter<"Session"> | string | null
    startedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    pricePerMinute?: IntFilter<"Session"> | number
    totalCost?: IntNullableFilter<"Session"> | number | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    computer?: XOR<ComputerScalarRelationFilter, ComputerWhereInput>
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    computerId?: SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    pricePerMinute?: SortOrder
    totalCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    computer?: ComputerOrderByWithRelationInput
    cyberCenter?: CyberCenterOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    computerId?: StringFilter<"Session"> | string
    cyberCenterId?: StringNullableFilter<"Session"> | string | null
    userId?: StringNullableFilter<"Session"> | string | null
    startedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    pricePerMinute?: IntFilter<"Session"> | number
    totalCost?: IntNullableFilter<"Session"> | number | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    computer?: XOR<ComputerScalarRelationFilter, ComputerWhereInput>
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    computerId?: SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    pricePerMinute?: SortOrder
    totalCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    computerId?: StringWithAggregatesFilter<"Session"> | string
    cyberCenterId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    status?: EnumSessionStatusWithAggregatesFilter<"Session"> | $Enums.SessionStatus
    pricePerMinute?: IntWithAggregatesFilter<"Session"> | number
    totalCost?: IntNullableWithAggregatesFilter<"Session"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type PricingWhereInput = {
    AND?: PricingWhereInput | PricingWhereInput[]
    OR?: PricingWhereInput[]
    NOT?: PricingWhereInput | PricingWhereInput[]
    id?: StringFilter<"Pricing"> | string
    pricePerMinute?: IntFilter<"Pricing"> | number
    active?: BoolFilter<"Pricing"> | boolean
    createdAt?: DateTimeFilter<"Pricing"> | Date | string
  }

  export type PricingOrderByWithRelationInput = {
    id?: SortOrder
    pricePerMinute?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PricingWhereInput | PricingWhereInput[]
    OR?: PricingWhereInput[]
    NOT?: PricingWhereInput | PricingWhereInput[]
    pricePerMinute?: IntFilter<"Pricing"> | number
    active?: BoolFilter<"Pricing"> | boolean
    createdAt?: DateTimeFilter<"Pricing"> | Date | string
  }, "id">

  export type PricingOrderByWithAggregationInput = {
    id?: SortOrder
    pricePerMinute?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: PricingCountOrderByAggregateInput
    _avg?: PricingAvgOrderByAggregateInput
    _max?: PricingMaxOrderByAggregateInput
    _min?: PricingMinOrderByAggregateInput
    _sum?: PricingSumOrderByAggregateInput
  }

  export type PricingScalarWhereWithAggregatesInput = {
    AND?: PricingScalarWhereWithAggregatesInput | PricingScalarWhereWithAggregatesInput[]
    OR?: PricingScalarWhereWithAggregatesInput[]
    NOT?: PricingScalarWhereWithAggregatesInput | PricingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pricing"> | string
    pricePerMinute?: IntWithAggregatesFilter<"Pricing"> | number
    active?: BoolWithAggregatesFilter<"Pricing"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Pricing"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    balance?: IntFilter<"User"> | number
    cyberCenterId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    events?: EventListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cyberCenter?: CyberCenterOrderByWithRelationInput
    events?: EventOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    balance?: IntFilter<"User"> | number
    cyberCenterId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    cyberCenter?: XOR<CyberCenterNullableScalarRelationFilter, CyberCenterWhereInput> | null
    events?: EventListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    cyberCenterId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    balance?: IntWithAggregatesFilter<"User"> | number
    cyberCenterId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    payload?: JsonNullableFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    userId?: StringNullableFilter<"Event"> | string | null
    computerId?: StringNullableFilter<"Event"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    computer?: XOR<ComputerNullableScalarRelationFilter, ComputerWhereInput> | null
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    computerId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    computer?: ComputerOrderByWithRelationInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    payload?: JsonNullableFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    userId?: StringNullableFilter<"Event"> | string | null
    computerId?: StringNullableFilter<"Event"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    computer?: XOR<ComputerNullableScalarRelationFilter, ComputerWhereInput> | null
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    computerId?: SortOrderInput | SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    type?: EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType
    payload?: JsonNullableWithAggregatesFilter<"Event">
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    computerId?: StringNullableWithAggregatesFilter<"Event"> | string | null
  }

  export type CommandWhereInput = {
    AND?: CommandWhereInput | CommandWhereInput[]
    OR?: CommandWhereInput[]
    NOT?: CommandWhereInput | CommandWhereInput[]
    id?: StringFilter<"Command"> | string
    computerId?: StringFilter<"Command"> | string
    type?: StringFilter<"Command"> | string
    status?: StringFilter<"Command"> | string
    createdAt?: DateTimeFilter<"Command"> | Date | string
    sentAt?: DateTimeNullableFilter<"Command"> | Date | string | null
    ackedAt?: DateTimeNullableFilter<"Command"> | Date | string | null
    computer?: XOR<ComputerScalarRelationFilter, ComputerWhereInput>
  }

  export type CommandOrderByWithRelationInput = {
    id?: SortOrder
    computerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    ackedAt?: SortOrderInput | SortOrder
    computer?: ComputerOrderByWithRelationInput
  }

  export type CommandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommandWhereInput | CommandWhereInput[]
    OR?: CommandWhereInput[]
    NOT?: CommandWhereInput | CommandWhereInput[]
    computerId?: StringFilter<"Command"> | string
    type?: StringFilter<"Command"> | string
    status?: StringFilter<"Command"> | string
    createdAt?: DateTimeFilter<"Command"> | Date | string
    sentAt?: DateTimeNullableFilter<"Command"> | Date | string | null
    ackedAt?: DateTimeNullableFilter<"Command"> | Date | string | null
    computer?: XOR<ComputerScalarRelationFilter, ComputerWhereInput>
  }, "id">

  export type CommandOrderByWithAggregationInput = {
    id?: SortOrder
    computerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    ackedAt?: SortOrderInput | SortOrder
    _count?: CommandCountOrderByAggregateInput
    _max?: CommandMaxOrderByAggregateInput
    _min?: CommandMinOrderByAggregateInput
  }

  export type CommandScalarWhereWithAggregatesInput = {
    AND?: CommandScalarWhereWithAggregatesInput | CommandScalarWhereWithAggregatesInput[]
    OR?: CommandScalarWhereWithAggregatesInput[]
    NOT?: CommandScalarWhereWithAggregatesInput | CommandScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Command"> | string
    computerId?: StringWithAggregatesFilter<"Command"> | string
    type?: StringWithAggregatesFilter<"Command"> | string
    status?: StringWithAggregatesFilter<"Command"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Command"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"Command"> | Date | string | null
    ackedAt?: DateTimeNullableWithAggregatesFilter<"Command"> | Date | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    cyberCenters?: CyberCenterCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    cyberCenters?: CyberCenterUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenters?: CyberCenterUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenters?: CyberCenterUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CyberCenterCreateInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCyberCentersInput
    computers?: ComputerCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionCreateNestedManyWithoutCyberCenterInput
    users?: UserCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUncheckedCreateInput = {
    id?: string
    name: string
    location?: string | null
    organizationId: string
    createdAt?: Date | string
    computers?: ComputerUncheckedCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionUncheckedCreateNestedManyWithoutCyberCenterInput
    users?: UserUncheckedCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCyberCentersNestedInput
    computers?: ComputerUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUpdateManyWithoutCyberCenterNestedInput
    users?: UserUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computers?: ComputerUncheckedUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutCyberCenterNestedInput
    users?: UserUncheckedUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterCreateManyInput = {
    id?: string
    name: string
    location?: string | null
    organizationId: string
    createdAt?: Date | string
  }

  export type CyberCenterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CyberCenterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComputerCreateInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutComputersInput
    sessions?: SessionCreateNestedManyWithoutComputerInput
    events?: EventCreateNestedManyWithoutComputerInput
    commands?: CommandCreateNestedManyWithoutComputerInput
  }

  export type ComputerUncheckedCreateInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    cyberCenterId?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutComputerInput
    events?: EventUncheckedCreateNestedManyWithoutComputerInput
    commands?: CommandUncheckedCreateNestedManyWithoutComputerInput
  }

  export type ComputerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutComputersNestedInput
    sessions?: SessionUpdateManyWithoutComputerNestedInput
    events?: EventUpdateManyWithoutComputerNestedInput
    commands?: CommandUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutComputerNestedInput
    events?: EventUncheckedUpdateManyWithoutComputerNestedInput
    commands?: CommandUncheckedUpdateManyWithoutComputerNestedInput
  }

  export type ComputerCreateManyInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    cyberCenterId?: string | null
    createdAt?: Date | string
  }

  export type ComputerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComputerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
    computer: ComputerCreateNestedOneWithoutSessionsInput
    cyberCenter?: CyberCenterCreateNestedOneWithoutSessionsInput
    user?: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    computerId: string
    cyberCenterId?: string | null
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computer?: ComputerUpdateOneRequiredWithoutSessionsNestedInput
    cyberCenter?: CyberCenterUpdateOneWithoutSessionsNestedInput
    user?: UserUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    computerId: string
    cyberCenterId?: string | null
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingCreateInput = {
    id?: string
    pricePerMinute: number
    active?: boolean
    createdAt?: Date | string
  }

  export type PricingUncheckedCreateInput = {
    id?: string
    pricePerMinute: number
    active?: boolean
    createdAt?: Date | string
  }

  export type PricingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingCreateManyInput = {
    id?: string
    pricePerMinute: number
    active?: boolean
    createdAt?: Date | string
  }

  export type PricingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    cyberCenterId?: string | null
    createdAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    cyberCenterId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutEventsInput
    computer?: ComputerCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    computerId?: string | null
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutEventsNestedInput
    computer?: ComputerUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    computerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateManyInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
    computerId?: string | null
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    computerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommandCreateInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
    computer: ComputerCreateNestedOneWithoutCommandsInput
  }

  export type CommandUncheckedCreateInput = {
    id?: string
    computerId: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
  }

  export type CommandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    computer?: ComputerUpdateOneRequiredWithoutCommandsNestedInput
  }

  export type CommandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommandCreateManyInput = {
    id?: string
    computerId: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
  }

  export type CommandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CyberCenterListRelationFilter = {
    every?: CyberCenterWhereInput
    some?: CyberCenterWhereInput
    none?: CyberCenterWhereInput
  }

  export type CyberCenterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type ComputerListRelationFilter = {
    every?: ComputerWhereInput
    some?: ComputerWhereInput
    none?: ComputerWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ComputerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CyberCenterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CyberCenterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CyberCenterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumComputerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComputerStatus | EnumComputerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComputerStatusFilter<$PrismaModel> | $Enums.ComputerStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CyberCenterNullableScalarRelationFilter = {
    is?: CyberCenterWhereInput | null
    isNot?: CyberCenterWhereInput | null
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type CommandListRelationFilter = {
    every?: CommandWhereInput
    some?: CommandWhereInput
    none?: CommandWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComputerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deviceToken?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type ComputerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deviceToken?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type ComputerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deviceToken?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumComputerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComputerStatus | EnumComputerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComputerStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComputerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComputerStatusFilter<$PrismaModel>
    _max?: NestedEnumComputerStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ComputerScalarRelationFilter = {
    is?: ComputerWhereInput
    isNot?: ComputerWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    cyberCenterId?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    pricePerMinute?: SortOrder
    totalCost?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    pricePerMinute?: SortOrder
    totalCost?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    cyberCenterId?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    pricePerMinute?: SortOrder
    totalCost?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    cyberCenterId?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    pricePerMinute?: SortOrder
    totalCost?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    pricePerMinute?: SortOrder
    totalCost?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PricingCountOrderByAggregateInput = {
    id?: SortOrder
    pricePerMinute?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingAvgOrderByAggregateInput = {
    pricePerMinute?: SortOrder
  }

  export type PricingMaxOrderByAggregateInput = {
    id?: SortOrder
    pricePerMinute?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingMinOrderByAggregateInput = {
    id?: SortOrder
    pricePerMinute?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingSumOrderByAggregateInput = {
    pricePerMinute?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    cyberCenterId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ComputerNullableScalarRelationFilter = {
    is?: ComputerWhereInput | null
    isNot?: ComputerWhereInput | null
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    computerId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    computerId?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    computerId?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CommandCountOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
    ackedAt?: SortOrder
  }

  export type CommandMaxOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
    ackedAt?: SortOrder
  }

  export type CommandMinOrderByAggregateInput = {
    id?: SortOrder
    computerId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
    ackedAt?: SortOrder
  }

  export type CyberCenterCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput> | CyberCenterCreateWithoutOrganizationInput[] | CyberCenterUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CyberCenterCreateOrConnectWithoutOrganizationInput | CyberCenterCreateOrConnectWithoutOrganizationInput[]
    createMany?: CyberCenterCreateManyOrganizationInputEnvelope
    connect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
  }

  export type CyberCenterUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput> | CyberCenterCreateWithoutOrganizationInput[] | CyberCenterUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CyberCenterCreateOrConnectWithoutOrganizationInput | CyberCenterCreateOrConnectWithoutOrganizationInput[]
    createMany?: CyberCenterCreateManyOrganizationInputEnvelope
    connect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CyberCenterUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput> | CyberCenterCreateWithoutOrganizationInput[] | CyberCenterUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CyberCenterCreateOrConnectWithoutOrganizationInput | CyberCenterCreateOrConnectWithoutOrganizationInput[]
    upsert?: CyberCenterUpsertWithWhereUniqueWithoutOrganizationInput | CyberCenterUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CyberCenterCreateManyOrganizationInputEnvelope
    set?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    disconnect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    delete?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    connect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    update?: CyberCenterUpdateWithWhereUniqueWithoutOrganizationInput | CyberCenterUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CyberCenterUpdateManyWithWhereWithoutOrganizationInput | CyberCenterUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CyberCenterScalarWhereInput | CyberCenterScalarWhereInput[]
  }

  export type CyberCenterUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput> | CyberCenterCreateWithoutOrganizationInput[] | CyberCenterUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CyberCenterCreateOrConnectWithoutOrganizationInput | CyberCenterCreateOrConnectWithoutOrganizationInput[]
    upsert?: CyberCenterUpsertWithWhereUniqueWithoutOrganizationInput | CyberCenterUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CyberCenterCreateManyOrganizationInputEnvelope
    set?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    disconnect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    delete?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    connect?: CyberCenterWhereUniqueInput | CyberCenterWhereUniqueInput[]
    update?: CyberCenterUpdateWithWhereUniqueWithoutOrganizationInput | CyberCenterUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CyberCenterUpdateManyWithWhereWithoutOrganizationInput | CyberCenterUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CyberCenterScalarWhereInput | CyberCenterScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutCyberCentersInput = {
    create?: XOR<OrganizationCreateWithoutCyberCentersInput, OrganizationUncheckedCreateWithoutCyberCentersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCyberCentersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ComputerCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput> | ComputerCreateWithoutCyberCenterInput[] | ComputerUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: ComputerCreateOrConnectWithoutCyberCenterInput | ComputerCreateOrConnectWithoutCyberCenterInput[]
    createMany?: ComputerCreateManyCyberCenterInputEnvelope
    connect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput> | SessionCreateWithoutCyberCenterInput[] | SessionUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutCyberCenterInput | SessionCreateOrConnectWithoutCyberCenterInput[]
    createMany?: SessionCreateManyCyberCenterInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput> | UserCreateWithoutCyberCenterInput[] | UserUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCyberCenterInput | UserCreateOrConnectWithoutCyberCenterInput[]
    createMany?: UserCreateManyCyberCenterInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ComputerUncheckedCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput> | ComputerCreateWithoutCyberCenterInput[] | ComputerUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: ComputerCreateOrConnectWithoutCyberCenterInput | ComputerCreateOrConnectWithoutCyberCenterInput[]
    createMany?: ComputerCreateManyCyberCenterInputEnvelope
    connect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput> | SessionCreateWithoutCyberCenterInput[] | SessionUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutCyberCenterInput | SessionCreateOrConnectWithoutCyberCenterInput[]
    createMany?: SessionCreateManyCyberCenterInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCyberCenterInput = {
    create?: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput> | UserCreateWithoutCyberCenterInput[] | UserUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCyberCenterInput | UserCreateOrConnectWithoutCyberCenterInput[]
    createMany?: UserCreateManyCyberCenterInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type OrganizationUpdateOneRequiredWithoutCyberCentersNestedInput = {
    create?: XOR<OrganizationCreateWithoutCyberCentersInput, OrganizationUncheckedCreateWithoutCyberCentersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCyberCentersInput
    upsert?: OrganizationUpsertWithoutCyberCentersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCyberCentersInput, OrganizationUpdateWithoutCyberCentersInput>, OrganizationUncheckedUpdateWithoutCyberCentersInput>
  }

  export type ComputerUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput> | ComputerCreateWithoutCyberCenterInput[] | ComputerUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: ComputerCreateOrConnectWithoutCyberCenterInput | ComputerCreateOrConnectWithoutCyberCenterInput[]
    upsert?: ComputerUpsertWithWhereUniqueWithoutCyberCenterInput | ComputerUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: ComputerCreateManyCyberCenterInputEnvelope
    set?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    disconnect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    delete?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    connect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    update?: ComputerUpdateWithWhereUniqueWithoutCyberCenterInput | ComputerUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: ComputerUpdateManyWithWhereWithoutCyberCenterInput | ComputerUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: ComputerScalarWhereInput | ComputerScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput> | SessionCreateWithoutCyberCenterInput[] | SessionUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutCyberCenterInput | SessionCreateOrConnectWithoutCyberCenterInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutCyberCenterInput | SessionUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: SessionCreateManyCyberCenterInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutCyberCenterInput | SessionUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutCyberCenterInput | SessionUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput> | UserCreateWithoutCyberCenterInput[] | UserUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCyberCenterInput | UserCreateOrConnectWithoutCyberCenterInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCyberCenterInput | UserUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: UserCreateManyCyberCenterInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCyberCenterInput | UserUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCyberCenterInput | UserUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ComputerUncheckedUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput> | ComputerCreateWithoutCyberCenterInput[] | ComputerUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: ComputerCreateOrConnectWithoutCyberCenterInput | ComputerCreateOrConnectWithoutCyberCenterInput[]
    upsert?: ComputerUpsertWithWhereUniqueWithoutCyberCenterInput | ComputerUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: ComputerCreateManyCyberCenterInputEnvelope
    set?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    disconnect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    delete?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    connect?: ComputerWhereUniqueInput | ComputerWhereUniqueInput[]
    update?: ComputerUpdateWithWhereUniqueWithoutCyberCenterInput | ComputerUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: ComputerUpdateManyWithWhereWithoutCyberCenterInput | ComputerUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: ComputerScalarWhereInput | ComputerScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput> | SessionCreateWithoutCyberCenterInput[] | SessionUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutCyberCenterInput | SessionCreateOrConnectWithoutCyberCenterInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutCyberCenterInput | SessionUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: SessionCreateManyCyberCenterInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutCyberCenterInput | SessionUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutCyberCenterInput | SessionUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCyberCenterNestedInput = {
    create?: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput> | UserCreateWithoutCyberCenterInput[] | UserUncheckedCreateWithoutCyberCenterInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCyberCenterInput | UserCreateOrConnectWithoutCyberCenterInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCyberCenterInput | UserUpsertWithWhereUniqueWithoutCyberCenterInput[]
    createMany?: UserCreateManyCyberCenterInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCyberCenterInput | UserUpdateWithWhereUniqueWithoutCyberCenterInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCyberCenterInput | UserUpdateManyWithWhereWithoutCyberCenterInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CyberCenterCreateNestedOneWithoutComputersInput = {
    create?: XOR<CyberCenterCreateWithoutComputersInput, CyberCenterUncheckedCreateWithoutComputersInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutComputersInput
    connect?: CyberCenterWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutComputerInput = {
    create?: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput> | SessionCreateWithoutComputerInput[] | SessionUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutComputerInput | SessionCreateOrConnectWithoutComputerInput[]
    createMany?: SessionCreateManyComputerInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutComputerInput = {
    create?: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput> | EventCreateWithoutComputerInput[] | EventUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutComputerInput | EventCreateOrConnectWithoutComputerInput[]
    createMany?: EventCreateManyComputerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CommandCreateNestedManyWithoutComputerInput = {
    create?: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput> | CommandCreateWithoutComputerInput[] | CommandUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: CommandCreateOrConnectWithoutComputerInput | CommandCreateOrConnectWithoutComputerInput[]
    createMany?: CommandCreateManyComputerInputEnvelope
    connect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutComputerInput = {
    create?: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput> | SessionCreateWithoutComputerInput[] | SessionUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutComputerInput | SessionCreateOrConnectWithoutComputerInput[]
    createMany?: SessionCreateManyComputerInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutComputerInput = {
    create?: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput> | EventCreateWithoutComputerInput[] | EventUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutComputerInput | EventCreateOrConnectWithoutComputerInput[]
    createMany?: EventCreateManyComputerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CommandUncheckedCreateNestedManyWithoutComputerInput = {
    create?: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput> | CommandCreateWithoutComputerInput[] | CommandUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: CommandCreateOrConnectWithoutComputerInput | CommandCreateOrConnectWithoutComputerInput[]
    createMany?: CommandCreateManyComputerInputEnvelope
    connect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
  }

  export type EnumComputerStatusFieldUpdateOperationsInput = {
    set?: $Enums.ComputerStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CyberCenterUpdateOneWithoutComputersNestedInput = {
    create?: XOR<CyberCenterCreateWithoutComputersInput, CyberCenterUncheckedCreateWithoutComputersInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutComputersInput
    upsert?: CyberCenterUpsertWithoutComputersInput
    disconnect?: CyberCenterWhereInput | boolean
    delete?: CyberCenterWhereInput | boolean
    connect?: CyberCenterWhereUniqueInput
    update?: XOR<XOR<CyberCenterUpdateToOneWithWhereWithoutComputersInput, CyberCenterUpdateWithoutComputersInput>, CyberCenterUncheckedUpdateWithoutComputersInput>
  }

  export type SessionUpdateManyWithoutComputerNestedInput = {
    create?: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput> | SessionCreateWithoutComputerInput[] | SessionUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutComputerInput | SessionCreateOrConnectWithoutComputerInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutComputerInput | SessionUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: SessionCreateManyComputerInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutComputerInput | SessionUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutComputerInput | SessionUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EventUpdateManyWithoutComputerNestedInput = {
    create?: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput> | EventCreateWithoutComputerInput[] | EventUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutComputerInput | EventCreateOrConnectWithoutComputerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutComputerInput | EventUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: EventCreateManyComputerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutComputerInput | EventUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutComputerInput | EventUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CommandUpdateManyWithoutComputerNestedInput = {
    create?: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput> | CommandCreateWithoutComputerInput[] | CommandUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: CommandCreateOrConnectWithoutComputerInput | CommandCreateOrConnectWithoutComputerInput[]
    upsert?: CommandUpsertWithWhereUniqueWithoutComputerInput | CommandUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: CommandCreateManyComputerInputEnvelope
    set?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    disconnect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    delete?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    connect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    update?: CommandUpdateWithWhereUniqueWithoutComputerInput | CommandUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: CommandUpdateManyWithWhereWithoutComputerInput | CommandUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: CommandScalarWhereInput | CommandScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput> | SessionCreateWithoutComputerInput[] | SessionUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutComputerInput | SessionCreateOrConnectWithoutComputerInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutComputerInput | SessionUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: SessionCreateManyComputerInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutComputerInput | SessionUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutComputerInput | SessionUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput> | EventCreateWithoutComputerInput[] | EventUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutComputerInput | EventCreateOrConnectWithoutComputerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutComputerInput | EventUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: EventCreateManyComputerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutComputerInput | EventUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutComputerInput | EventUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CommandUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput> | CommandCreateWithoutComputerInput[] | CommandUncheckedCreateWithoutComputerInput[]
    connectOrCreate?: CommandCreateOrConnectWithoutComputerInput | CommandCreateOrConnectWithoutComputerInput[]
    upsert?: CommandUpsertWithWhereUniqueWithoutComputerInput | CommandUpsertWithWhereUniqueWithoutComputerInput[]
    createMany?: CommandCreateManyComputerInputEnvelope
    set?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    disconnect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    delete?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    connect?: CommandWhereUniqueInput | CommandWhereUniqueInput[]
    update?: CommandUpdateWithWhereUniqueWithoutComputerInput | CommandUpdateWithWhereUniqueWithoutComputerInput[]
    updateMany?: CommandUpdateManyWithWhereWithoutComputerInput | CommandUpdateManyWithWhereWithoutComputerInput[]
    deleteMany?: CommandScalarWhereInput | CommandScalarWhereInput[]
  }

  export type ComputerCreateNestedOneWithoutSessionsInput = {
    create?: XOR<ComputerCreateWithoutSessionsInput, ComputerUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutSessionsInput
    connect?: ComputerWhereUniqueInput
  }

  export type CyberCenterCreateNestedOneWithoutSessionsInput = {
    create?: XOR<CyberCenterCreateWithoutSessionsInput, CyberCenterUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutSessionsInput
    connect?: CyberCenterWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComputerUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<ComputerCreateWithoutSessionsInput, ComputerUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutSessionsInput
    upsert?: ComputerUpsertWithoutSessionsInput
    connect?: ComputerWhereUniqueInput
    update?: XOR<XOR<ComputerUpdateToOneWithWhereWithoutSessionsInput, ComputerUpdateWithoutSessionsInput>, ComputerUncheckedUpdateWithoutSessionsInput>
  }

  export type CyberCenterUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<CyberCenterCreateWithoutSessionsInput, CyberCenterUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutSessionsInput
    upsert?: CyberCenterUpsertWithoutSessionsInput
    disconnect?: CyberCenterWhereInput | boolean
    delete?: CyberCenterWhereInput | boolean
    connect?: CyberCenterWhereUniqueInput
    update?: XOR<XOR<CyberCenterUpdateToOneWithWhereWithoutSessionsInput, CyberCenterUpdateWithoutSessionsInput>, CyberCenterUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CyberCenterCreateNestedOneWithoutUsersInput = {
    create?: XOR<CyberCenterCreateWithoutUsersInput, CyberCenterUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutUsersInput
    connect?: CyberCenterWhereUniqueInput
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type CyberCenterUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CyberCenterCreateWithoutUsersInput, CyberCenterUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CyberCenterCreateOrConnectWithoutUsersInput
    upsert?: CyberCenterUpsertWithoutUsersInput
    disconnect?: CyberCenterWhereInput | boolean
    delete?: CyberCenterWhereInput | boolean
    connect?: CyberCenterWhereUniqueInput
    update?: XOR<XOR<CyberCenterUpdateToOneWithWhereWithoutUsersInput, CyberCenterUpdateWithoutUsersInput>, CyberCenterUncheckedUpdateWithoutUsersInput>
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type ComputerCreateNestedOneWithoutEventsInput = {
    create?: XOR<ComputerCreateWithoutEventsInput, ComputerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutEventsInput
    connect?: ComputerWhereUniqueInput
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type UserUpdateOneWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type ComputerUpdateOneWithoutEventsNestedInput = {
    create?: XOR<ComputerCreateWithoutEventsInput, ComputerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutEventsInput
    upsert?: ComputerUpsertWithoutEventsInput
    disconnect?: ComputerWhereInput | boolean
    delete?: ComputerWhereInput | boolean
    connect?: ComputerWhereUniqueInput
    update?: XOR<XOR<ComputerUpdateToOneWithWhereWithoutEventsInput, ComputerUpdateWithoutEventsInput>, ComputerUncheckedUpdateWithoutEventsInput>
  }

  export type ComputerCreateNestedOneWithoutCommandsInput = {
    create?: XOR<ComputerCreateWithoutCommandsInput, ComputerUncheckedCreateWithoutCommandsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutCommandsInput
    connect?: ComputerWhereUniqueInput
  }

  export type ComputerUpdateOneRequiredWithoutCommandsNestedInput = {
    create?: XOR<ComputerCreateWithoutCommandsInput, ComputerUncheckedCreateWithoutCommandsInput>
    connectOrCreate?: ComputerCreateOrConnectWithoutCommandsInput
    upsert?: ComputerUpsertWithoutCommandsInput
    connect?: ComputerWhereUniqueInput
    update?: XOR<XOR<ComputerUpdateToOneWithWhereWithoutCommandsInput, ComputerUpdateWithoutCommandsInput>, ComputerUncheckedUpdateWithoutCommandsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumComputerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ComputerStatus | EnumComputerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComputerStatusFilter<$PrismaModel> | $Enums.ComputerStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumComputerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComputerStatus | EnumComputerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ComputerStatus[] | ListEnumComputerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumComputerStatusWithAggregatesFilter<$PrismaModel> | $Enums.ComputerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumComputerStatusFilter<$PrismaModel>
    _max?: NestedEnumComputerStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CyberCenterCreateWithoutOrganizationInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    computers?: ComputerCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionCreateNestedManyWithoutCyberCenterInput
    users?: UserCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    computers?: ComputerUncheckedCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionUncheckedCreateNestedManyWithoutCyberCenterInput
    users?: UserUncheckedCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterCreateOrConnectWithoutOrganizationInput = {
    where: CyberCenterWhereUniqueInput
    create: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput>
  }

  export type CyberCenterCreateManyOrganizationInputEnvelope = {
    data: CyberCenterCreateManyOrganizationInput | CyberCenterCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CyberCenterUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CyberCenterWhereUniqueInput
    update: XOR<CyberCenterUpdateWithoutOrganizationInput, CyberCenterUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CyberCenterCreateWithoutOrganizationInput, CyberCenterUncheckedCreateWithoutOrganizationInput>
  }

  export type CyberCenterUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CyberCenterWhereUniqueInput
    data: XOR<CyberCenterUpdateWithoutOrganizationInput, CyberCenterUncheckedUpdateWithoutOrganizationInput>
  }

  export type CyberCenterUpdateManyWithWhereWithoutOrganizationInput = {
    where: CyberCenterScalarWhereInput
    data: XOR<CyberCenterUpdateManyMutationInput, CyberCenterUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CyberCenterScalarWhereInput = {
    AND?: CyberCenterScalarWhereInput | CyberCenterScalarWhereInput[]
    OR?: CyberCenterScalarWhereInput[]
    NOT?: CyberCenterScalarWhereInput | CyberCenterScalarWhereInput[]
    id?: StringFilter<"CyberCenter"> | string
    name?: StringFilter<"CyberCenter"> | string
    location?: StringNullableFilter<"CyberCenter"> | string | null
    organizationId?: StringFilter<"CyberCenter"> | string
    createdAt?: DateTimeFilter<"CyberCenter"> | Date | string
  }

  export type OrganizationCreateWithoutCyberCentersInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type OrganizationUncheckedCreateWithoutCyberCentersInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type OrganizationCreateOrConnectWithoutCyberCentersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCyberCentersInput, OrganizationUncheckedCreateWithoutCyberCentersInput>
  }

  export type ComputerCreateWithoutCyberCenterInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutComputerInput
    events?: EventCreateNestedManyWithoutComputerInput
    commands?: CommandCreateNestedManyWithoutComputerInput
  }

  export type ComputerUncheckedCreateWithoutCyberCenterInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutComputerInput
    events?: EventUncheckedCreateNestedManyWithoutComputerInput
    commands?: CommandUncheckedCreateNestedManyWithoutComputerInput
  }

  export type ComputerCreateOrConnectWithoutCyberCenterInput = {
    where: ComputerWhereUniqueInput
    create: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput>
  }

  export type ComputerCreateManyCyberCenterInputEnvelope = {
    data: ComputerCreateManyCyberCenterInput | ComputerCreateManyCyberCenterInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutCyberCenterInput = {
    id?: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
    computer: ComputerCreateNestedOneWithoutSessionsInput
    user?: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutCyberCenterInput = {
    id?: string
    computerId: string
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutCyberCenterInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput>
  }

  export type SessionCreateManyCyberCenterInputEnvelope = {
    data: SessionCreateManyCyberCenterInput | SessionCreateManyCyberCenterInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCyberCenterInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCyberCenterInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCyberCenterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput>
  }

  export type UserCreateManyCyberCenterInputEnvelope = {
    data: UserCreateManyCyberCenterInput | UserCreateManyCyberCenterInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutCyberCentersInput = {
    update: XOR<OrganizationUpdateWithoutCyberCentersInput, OrganizationUncheckedUpdateWithoutCyberCentersInput>
    create: XOR<OrganizationCreateWithoutCyberCentersInput, OrganizationUncheckedCreateWithoutCyberCentersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCyberCentersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCyberCentersInput, OrganizationUncheckedUpdateWithoutCyberCentersInput>
  }

  export type OrganizationUpdateWithoutCyberCentersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateWithoutCyberCentersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComputerUpsertWithWhereUniqueWithoutCyberCenterInput = {
    where: ComputerWhereUniqueInput
    update: XOR<ComputerUpdateWithoutCyberCenterInput, ComputerUncheckedUpdateWithoutCyberCenterInput>
    create: XOR<ComputerCreateWithoutCyberCenterInput, ComputerUncheckedCreateWithoutCyberCenterInput>
  }

  export type ComputerUpdateWithWhereUniqueWithoutCyberCenterInput = {
    where: ComputerWhereUniqueInput
    data: XOR<ComputerUpdateWithoutCyberCenterInput, ComputerUncheckedUpdateWithoutCyberCenterInput>
  }

  export type ComputerUpdateManyWithWhereWithoutCyberCenterInput = {
    where: ComputerScalarWhereInput
    data: XOR<ComputerUpdateManyMutationInput, ComputerUncheckedUpdateManyWithoutCyberCenterInput>
  }

  export type ComputerScalarWhereInput = {
    AND?: ComputerScalarWhereInput | ComputerScalarWhereInput[]
    OR?: ComputerScalarWhereInput[]
    NOT?: ComputerScalarWhereInput | ComputerScalarWhereInput[]
    id?: StringFilter<"Computer"> | string
    name?: StringFilter<"Computer"> | string
    deviceToken?: StringFilter<"Computer"> | string
    status?: EnumComputerStatusFilter<"Computer"> | $Enums.ComputerStatus
    lastSeenAt?: DateTimeNullableFilter<"Computer"> | Date | string | null
    cyberCenterId?: StringNullableFilter<"Computer"> | string | null
    createdAt?: DateTimeFilter<"Computer"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutCyberCenterInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutCyberCenterInput, SessionUncheckedUpdateWithoutCyberCenterInput>
    create: XOR<SessionCreateWithoutCyberCenterInput, SessionUncheckedCreateWithoutCyberCenterInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutCyberCenterInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutCyberCenterInput, SessionUncheckedUpdateWithoutCyberCenterInput>
  }

  export type SessionUpdateManyWithWhereWithoutCyberCenterInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutCyberCenterInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    computerId?: StringFilter<"Session"> | string
    cyberCenterId?: StringNullableFilter<"Session"> | string | null
    userId?: StringNullableFilter<"Session"> | string | null
    startedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    pricePerMinute?: IntFilter<"Session"> | number
    totalCost?: IntNullableFilter<"Session"> | number | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutCyberCenterInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCyberCenterInput, UserUncheckedUpdateWithoutCyberCenterInput>
    create: XOR<UserCreateWithoutCyberCenterInput, UserUncheckedCreateWithoutCyberCenterInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCyberCenterInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCyberCenterInput, UserUncheckedUpdateWithoutCyberCenterInput>
  }

  export type UserUpdateManyWithWhereWithoutCyberCenterInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCyberCenterInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    balance?: IntFilter<"User"> | number
    cyberCenterId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type CyberCenterCreateWithoutComputersInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCyberCentersInput
    sessions?: SessionCreateNestedManyWithoutCyberCenterInput
    users?: UserCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUncheckedCreateWithoutComputersInput = {
    id?: string
    name: string
    location?: string | null
    organizationId: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutCyberCenterInput
    users?: UserUncheckedCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterCreateOrConnectWithoutComputersInput = {
    where: CyberCenterWhereUniqueInput
    create: XOR<CyberCenterCreateWithoutComputersInput, CyberCenterUncheckedCreateWithoutComputersInput>
  }

  export type SessionCreateWithoutComputerInput = {
    id?: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutSessionsInput
    user?: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutComputerInput = {
    id?: string
    cyberCenterId?: string | null
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutComputerInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput>
  }

  export type SessionCreateManyComputerInputEnvelope = {
    data: SessionCreateManyComputerInput | SessionCreateManyComputerInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutComputerInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutComputerInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
  }

  export type EventCreateOrConnectWithoutComputerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput>
  }

  export type EventCreateManyComputerInputEnvelope = {
    data: EventCreateManyComputerInput | EventCreateManyComputerInput[]
    skipDuplicates?: boolean
  }

  export type CommandCreateWithoutComputerInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
  }

  export type CommandUncheckedCreateWithoutComputerInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
  }

  export type CommandCreateOrConnectWithoutComputerInput = {
    where: CommandWhereUniqueInput
    create: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput>
  }

  export type CommandCreateManyComputerInputEnvelope = {
    data: CommandCreateManyComputerInput | CommandCreateManyComputerInput[]
    skipDuplicates?: boolean
  }

  export type CyberCenterUpsertWithoutComputersInput = {
    update: XOR<CyberCenterUpdateWithoutComputersInput, CyberCenterUncheckedUpdateWithoutComputersInput>
    create: XOR<CyberCenterCreateWithoutComputersInput, CyberCenterUncheckedCreateWithoutComputersInput>
    where?: CyberCenterWhereInput
  }

  export type CyberCenterUpdateToOneWithWhereWithoutComputersInput = {
    where?: CyberCenterWhereInput
    data: XOR<CyberCenterUpdateWithoutComputersInput, CyberCenterUncheckedUpdateWithoutComputersInput>
  }

  export type CyberCenterUpdateWithoutComputersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCyberCentersNestedInput
    sessions?: SessionUpdateManyWithoutCyberCenterNestedInput
    users?: UserUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateWithoutComputersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutCyberCenterNestedInput
    users?: UserUncheckedUpdateManyWithoutCyberCenterNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutComputerInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutComputerInput, SessionUncheckedUpdateWithoutComputerInput>
    create: XOR<SessionCreateWithoutComputerInput, SessionUncheckedCreateWithoutComputerInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutComputerInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutComputerInput, SessionUncheckedUpdateWithoutComputerInput>
  }

  export type SessionUpdateManyWithWhereWithoutComputerInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutComputerInput>
  }

  export type EventUpsertWithWhereUniqueWithoutComputerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutComputerInput, EventUncheckedUpdateWithoutComputerInput>
    create: XOR<EventCreateWithoutComputerInput, EventUncheckedCreateWithoutComputerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutComputerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutComputerInput, EventUncheckedUpdateWithoutComputerInput>
  }

  export type EventUpdateManyWithWhereWithoutComputerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutComputerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    payload?: JsonNullableFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    userId?: StringNullableFilter<"Event"> | string | null
    computerId?: StringNullableFilter<"Event"> | string | null
  }

  export type CommandUpsertWithWhereUniqueWithoutComputerInput = {
    where: CommandWhereUniqueInput
    update: XOR<CommandUpdateWithoutComputerInput, CommandUncheckedUpdateWithoutComputerInput>
    create: XOR<CommandCreateWithoutComputerInput, CommandUncheckedCreateWithoutComputerInput>
  }

  export type CommandUpdateWithWhereUniqueWithoutComputerInput = {
    where: CommandWhereUniqueInput
    data: XOR<CommandUpdateWithoutComputerInput, CommandUncheckedUpdateWithoutComputerInput>
  }

  export type CommandUpdateManyWithWhereWithoutComputerInput = {
    where: CommandScalarWhereInput
    data: XOR<CommandUpdateManyMutationInput, CommandUncheckedUpdateManyWithoutComputerInput>
  }

  export type CommandScalarWhereInput = {
    AND?: CommandScalarWhereInput | CommandScalarWhereInput[]
    OR?: CommandScalarWhereInput[]
    NOT?: CommandScalarWhereInput | CommandScalarWhereInput[]
    id?: StringFilter<"Command"> | string
    computerId?: StringFilter<"Command"> | string
    type?: StringFilter<"Command"> | string
    status?: StringFilter<"Command"> | string
    createdAt?: DateTimeFilter<"Command"> | Date | string
    sentAt?: DateTimeNullableFilter<"Command"> | Date | string | null
    ackedAt?: DateTimeNullableFilter<"Command"> | Date | string | null
  }

  export type ComputerCreateWithoutSessionsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutComputersInput
    events?: EventCreateNestedManyWithoutComputerInput
    commands?: CommandCreateNestedManyWithoutComputerInput
  }

  export type ComputerUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    cyberCenterId?: string | null
    createdAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutComputerInput
    commands?: CommandUncheckedCreateNestedManyWithoutComputerInput
  }

  export type ComputerCreateOrConnectWithoutSessionsInput = {
    where: ComputerWhereUniqueInput
    create: XOR<ComputerCreateWithoutSessionsInput, ComputerUncheckedCreateWithoutSessionsInput>
  }

  export type CyberCenterCreateWithoutSessionsInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCyberCentersInput
    computers?: ComputerCreateNestedManyWithoutCyberCenterInput
    users?: UserCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    location?: string | null
    organizationId: string
    createdAt?: Date | string
    computers?: ComputerUncheckedCreateNestedManyWithoutCyberCenterInput
    users?: UserUncheckedCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterCreateOrConnectWithoutSessionsInput = {
    where: CyberCenterWhereUniqueInput
    create: XOR<CyberCenterCreateWithoutSessionsInput, CyberCenterUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutUsersInput
    events?: EventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    cyberCenterId?: string | null
    createdAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type ComputerUpsertWithoutSessionsInput = {
    update: XOR<ComputerUpdateWithoutSessionsInput, ComputerUncheckedUpdateWithoutSessionsInput>
    create: XOR<ComputerCreateWithoutSessionsInput, ComputerUncheckedCreateWithoutSessionsInput>
    where?: ComputerWhereInput
  }

  export type ComputerUpdateToOneWithWhereWithoutSessionsInput = {
    where?: ComputerWhereInput
    data: XOR<ComputerUpdateWithoutSessionsInput, ComputerUncheckedUpdateWithoutSessionsInput>
  }

  export type ComputerUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutComputersNestedInput
    events?: EventUpdateManyWithoutComputerNestedInput
    commands?: CommandUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutComputerNestedInput
    commands?: CommandUncheckedUpdateManyWithoutComputerNestedInput
  }

  export type CyberCenterUpsertWithoutSessionsInput = {
    update: XOR<CyberCenterUpdateWithoutSessionsInput, CyberCenterUncheckedUpdateWithoutSessionsInput>
    create: XOR<CyberCenterCreateWithoutSessionsInput, CyberCenterUncheckedCreateWithoutSessionsInput>
    where?: CyberCenterWhereInput
  }

  export type CyberCenterUpdateToOneWithWhereWithoutSessionsInput = {
    where?: CyberCenterWhereInput
    data: XOR<CyberCenterUpdateWithoutSessionsInput, CyberCenterUncheckedUpdateWithoutSessionsInput>
  }

  export type CyberCenterUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCyberCentersNestedInput
    computers?: ComputerUpdateManyWithoutCyberCenterNestedInput
    users?: UserUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computers?: ComputerUncheckedUpdateManyWithoutCyberCenterNestedInput
    users?: UserUncheckedUpdateManyWithoutCyberCenterNestedInput
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CyberCenterCreateWithoutUsersInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCyberCentersInput
    computers?: ComputerCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    location?: string | null
    organizationId: string
    createdAt?: Date | string
    computers?: ComputerUncheckedCreateNestedManyWithoutCyberCenterInput
    sessions?: SessionUncheckedCreateNestedManyWithoutCyberCenterInput
  }

  export type CyberCenterCreateOrConnectWithoutUsersInput = {
    where: CyberCenterWhereUniqueInput
    create: XOR<CyberCenterCreateWithoutUsersInput, CyberCenterUncheckedCreateWithoutUsersInput>
  }

  export type EventCreateWithoutUserInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    computer?: ComputerCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    computerId?: string | null
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
    computer: ComputerCreateNestedOneWithoutSessionsInput
    cyberCenter?: CyberCenterCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    computerId: string
    cyberCenterId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CyberCenterUpsertWithoutUsersInput = {
    update: XOR<CyberCenterUpdateWithoutUsersInput, CyberCenterUncheckedUpdateWithoutUsersInput>
    create: XOR<CyberCenterCreateWithoutUsersInput, CyberCenterUncheckedCreateWithoutUsersInput>
    where?: CyberCenterWhereInput
  }

  export type CyberCenterUpdateToOneWithWhereWithoutUsersInput = {
    where?: CyberCenterWhereInput
    data: XOR<CyberCenterUpdateWithoutUsersInput, CyberCenterUncheckedUpdateWithoutUsersInput>
  }

  export type CyberCenterUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCyberCentersNestedInput
    computers?: ComputerUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computers?: ComputerUncheckedUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutCyberCenterNestedInput
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    cyberCenterId?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type ComputerCreateWithoutEventsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutComputersInput
    sessions?: SessionCreateNestedManyWithoutComputerInput
    commands?: CommandCreateNestedManyWithoutComputerInput
  }

  export type ComputerUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    cyberCenterId?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutComputerInput
    commands?: CommandUncheckedCreateNestedManyWithoutComputerInput
  }

  export type ComputerCreateOrConnectWithoutEventsInput = {
    where: ComputerWhereUniqueInput
    create: XOR<ComputerCreateWithoutEventsInput, ComputerUncheckedCreateWithoutEventsInput>
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ComputerUpsertWithoutEventsInput = {
    update: XOR<ComputerUpdateWithoutEventsInput, ComputerUncheckedUpdateWithoutEventsInput>
    create: XOR<ComputerCreateWithoutEventsInput, ComputerUncheckedCreateWithoutEventsInput>
    where?: ComputerWhereInput
  }

  export type ComputerUpdateToOneWithWhereWithoutEventsInput = {
    where?: ComputerWhereInput
    data: XOR<ComputerUpdateWithoutEventsInput, ComputerUncheckedUpdateWithoutEventsInput>
  }

  export type ComputerUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutComputersNestedInput
    sessions?: SessionUpdateManyWithoutComputerNestedInput
    commands?: CommandUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutComputerNestedInput
    commands?: CommandUncheckedUpdateManyWithoutComputerNestedInput
  }

  export type ComputerCreateWithoutCommandsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    cyberCenter?: CyberCenterCreateNestedOneWithoutComputersInput
    sessions?: SessionCreateNestedManyWithoutComputerInput
    events?: EventCreateNestedManyWithoutComputerInput
  }

  export type ComputerUncheckedCreateWithoutCommandsInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    cyberCenterId?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutComputerInput
    events?: EventUncheckedCreateNestedManyWithoutComputerInput
  }

  export type ComputerCreateOrConnectWithoutCommandsInput = {
    where: ComputerWhereUniqueInput
    create: XOR<ComputerCreateWithoutCommandsInput, ComputerUncheckedCreateWithoutCommandsInput>
  }

  export type ComputerUpsertWithoutCommandsInput = {
    update: XOR<ComputerUpdateWithoutCommandsInput, ComputerUncheckedUpdateWithoutCommandsInput>
    create: XOR<ComputerCreateWithoutCommandsInput, ComputerUncheckedCreateWithoutCommandsInput>
    where?: ComputerWhereInput
  }

  export type ComputerUpdateToOneWithWhereWithoutCommandsInput = {
    where?: ComputerWhereInput
    data: XOR<ComputerUpdateWithoutCommandsInput, ComputerUncheckedUpdateWithoutCommandsInput>
  }

  export type ComputerUpdateWithoutCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutComputersNestedInput
    sessions?: SessionUpdateManyWithoutComputerNestedInput
    events?: EventUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateWithoutCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutComputerNestedInput
    events?: EventUncheckedUpdateManyWithoutComputerNestedInput
  }

  export type CyberCenterCreateManyOrganizationInput = {
    id?: string
    name: string
    location?: string | null
    createdAt?: Date | string
  }

  export type CyberCenterUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computers?: ComputerUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUpdateManyWithoutCyberCenterNestedInput
    users?: UserUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computers?: ComputerUncheckedUpdateManyWithoutCyberCenterNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutCyberCenterNestedInput
    users?: UserUncheckedUpdateManyWithoutCyberCenterNestedInput
  }

  export type CyberCenterUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComputerCreateManyCyberCenterInput = {
    id?: string
    name: string
    deviceToken: string
    status: $Enums.ComputerStatus
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionCreateManyCyberCenterInput = {
    id?: string
    computerId: string
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type UserCreateManyCyberCenterInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    balance?: number
    createdAt?: Date | string
  }

  export type ComputerUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutComputerNestedInput
    events?: EventUpdateManyWithoutComputerNestedInput
    commands?: CommandUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutComputerNestedInput
    events?: EventUncheckedUpdateManyWithoutComputerNestedInput
    commands?: CommandUncheckedUpdateManyWithoutComputerNestedInput
  }

  export type ComputerUncheckedUpdateManyWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceToken?: StringFieldUpdateOperationsInput | string
    status?: EnumComputerStatusFieldUpdateOperationsInput | $Enums.ComputerStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computer?: ComputerUpdateOneRequiredWithoutSessionsNestedInput
    user?: UserUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCyberCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    balance?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyComputerInput = {
    id?: string
    cyberCenterId?: string | null
    userId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type EventCreateManyComputerInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    userId?: string | null
  }

  export type CommandCreateManyComputerInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
    sentAt?: Date | string | null
    ackedAt?: Date | string | null
  }

  export type SessionUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cyberCenter?: CyberCenterUpdateOneWithoutSessionsNestedInput
    user?: UserUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateManyWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommandUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommandUncheckedUpdateWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommandUncheckedUpdateManyWithoutComputerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ackedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventCreateManyUserInput = {
    id?: string
    type: $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    computerId?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    computerId: string
    cyberCenterId?: string | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    status: $Enums.SessionStatus
    pricePerMinute: number
    totalCost?: number | null
    createdAt?: Date | string
  }

  export type EventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computer?: ComputerUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    computer?: ComputerUpdateOneRequiredWithoutSessionsNestedInput
    cyberCenter?: CyberCenterUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    computerId?: StringFieldUpdateOperationsInput | string
    cyberCenterId?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    pricePerMinute?: IntFieldUpdateOperationsInput | number
    totalCost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}