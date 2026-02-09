
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Quest
 * 
 */
export type Quest = $Result.DefaultSelection<Prisma.$QuestPayload>
/**
 * Model Result
 * 
 */
export type Result = $Result.DefaultSelection<Prisma.$ResultPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PendingUser
 * 
 */
export type PendingUser = $Result.DefaultSelection<Prisma.$PendingUserPayload>
/**
 * Model QuestionBank
 * 
 */
export type QuestionBank = $Result.DefaultSelection<Prisma.$QuestionBankPayload>
/**
 * Model CourseSyllabus
 * 
 */
export type CourseSyllabus = $Result.DefaultSelection<Prisma.$CourseSyllabusPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Quests
 * const quests = await prisma.quest.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Quests
   * const quests = await prisma.quest.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.quest`: Exposes CRUD operations for the **Quest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quests
    * const quests = await prisma.quest.findMany()
    * ```
    */
  get quest(): Prisma.QuestDelegate<ExtArgs>;

  /**
   * `prisma.result`: Exposes CRUD operations for the **Result** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Results
    * const results = await prisma.result.findMany()
    * ```
    */
  get result(): Prisma.ResultDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.pendingUser`: Exposes CRUD operations for the **PendingUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingUsers
    * const pendingUsers = await prisma.pendingUser.findMany()
    * ```
    */
  get pendingUser(): Prisma.PendingUserDelegate<ExtArgs>;

  /**
   * `prisma.questionBank`: Exposes CRUD operations for the **QuestionBank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionBanks
    * const questionBanks = await prisma.questionBank.findMany()
    * ```
    */
  get questionBank(): Prisma.QuestionBankDelegate<ExtArgs>;

  /**
   * `prisma.courseSyllabus`: Exposes CRUD operations for the **CourseSyllabus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseSyllabi
    * const courseSyllabi = await prisma.courseSyllabus.findMany()
    * ```
    */
  get courseSyllabus(): Prisma.CourseSyllabusDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Quest: 'Quest',
    Result: 'Result',
    User: 'User',
    PendingUser: 'PendingUser',
    QuestionBank: 'QuestionBank',
    CourseSyllabus: 'CourseSyllabus'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "quest" | "result" | "user" | "pendingUser" | "questionBank" | "courseSyllabus"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Quest: {
        payload: Prisma.$QuestPayload<ExtArgs>
        fields: Prisma.QuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          findFirst: {
            args: Prisma.QuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          findMany: {
            args: Prisma.QuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>[]
          }
          create: {
            args: Prisma.QuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          createMany: {
            args: Prisma.QuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>[]
          }
          delete: {
            args: Prisma.QuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          update: {
            args: Prisma.QuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          deleteMany: {
            args: Prisma.QuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestPayload>
          }
          aggregate: {
            args: Prisma.QuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuest>
          }
          groupBy: {
            args: Prisma.QuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestCountArgs<ExtArgs>
            result: $Utils.Optional<QuestCountAggregateOutputType> | number
          }
        }
      }
      Result: {
        payload: Prisma.$ResultPayload<ExtArgs>
        fields: Prisma.ResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findFirst: {
            args: Prisma.ResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findMany: {
            args: Prisma.ResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          create: {
            args: Prisma.ResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          createMany: {
            args: Prisma.ResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          delete: {
            args: Prisma.ResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          update: {
            args: Prisma.ResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          deleteMany: {
            args: Prisma.ResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          aggregate: {
            args: Prisma.ResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResult>
          }
          groupBy: {
            args: Prisma.ResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResultCountArgs<ExtArgs>
            result: $Utils.Optional<ResultCountAggregateOutputType> | number
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
      PendingUser: {
        payload: Prisma.$PendingUserPayload<ExtArgs>
        fields: Prisma.PendingUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          findFirst: {
            args: Prisma.PendingUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          findMany: {
            args: Prisma.PendingUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>[]
          }
          create: {
            args: Prisma.PendingUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          createMany: {
            args: Prisma.PendingUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>[]
          }
          delete: {
            args: Prisma.PendingUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          update: {
            args: Prisma.PendingUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          deleteMany: {
            args: Prisma.PendingUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PendingUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingUserPayload>
          }
          aggregate: {
            args: Prisma.PendingUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingUser>
          }
          groupBy: {
            args: Prisma.PendingUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingUserCountArgs<ExtArgs>
            result: $Utils.Optional<PendingUserCountAggregateOutputType> | number
          }
        }
      }
      QuestionBank: {
        payload: Prisma.$QuestionBankPayload<ExtArgs>
        fields: Prisma.QuestionBankFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionBankFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionBankFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          findFirst: {
            args: Prisma.QuestionBankFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionBankFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          findMany: {
            args: Prisma.QuestionBankFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>[]
          }
          create: {
            args: Prisma.QuestionBankCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          createMany: {
            args: Prisma.QuestionBankCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionBankCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>[]
          }
          delete: {
            args: Prisma.QuestionBankDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          update: {
            args: Prisma.QuestionBankUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          deleteMany: {
            args: Prisma.QuestionBankDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionBankUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionBankUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionBankPayload>
          }
          aggregate: {
            args: Prisma.QuestionBankAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionBank>
          }
          groupBy: {
            args: Prisma.QuestionBankGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionBankGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionBankCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionBankCountAggregateOutputType> | number
          }
        }
      }
      CourseSyllabus: {
        payload: Prisma.$CourseSyllabusPayload<ExtArgs>
        fields: Prisma.CourseSyllabusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseSyllabusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseSyllabusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          findFirst: {
            args: Prisma.CourseSyllabusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseSyllabusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          findMany: {
            args: Prisma.CourseSyllabusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>[]
          }
          create: {
            args: Prisma.CourseSyllabusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          createMany: {
            args: Prisma.CourseSyllabusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseSyllabusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>[]
          }
          delete: {
            args: Prisma.CourseSyllabusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          update: {
            args: Prisma.CourseSyllabusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          deleteMany: {
            args: Prisma.CourseSyllabusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseSyllabusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseSyllabusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseSyllabusPayload>
          }
          aggregate: {
            args: Prisma.CourseSyllabusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseSyllabus>
          }
          groupBy: {
            args: Prisma.CourseSyllabusGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseSyllabusGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseSyllabusCountArgs<ExtArgs>
            result: $Utils.Optional<CourseSyllabusCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type QuestCountOutputType
   */

  export type QuestCountOutputType = {
    results: number
  }

  export type QuestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | QuestCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * QuestCountOutputType without action
   */
  export type QuestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestCountOutputType
     */
    select?: QuestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestCountOutputType without action
   */
  export type QuestCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    quests: number
    results: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quests?: boolean | UserCountOutputTypeCountQuestsArgs
    results?: boolean | UserCountOutputTypeCountResultsArgs
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
  export type UserCountOutputTypeCountQuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Quest
   */

  export type AggregateQuest = {
    _count: QuestCountAggregateOutputType | null
    _min: QuestMinAggregateOutputType | null
    _max: QuestMaxAggregateOutputType | null
  }

  export type QuestMinAggregateOutputType = {
    id: string | null
    title: string | null
    subject: string | null
    grade: string | null
    creatorId: string | null
    questions: string | null
    createdAt: Date | null
  }

  export type QuestMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subject: string | null
    grade: string | null
    creatorId: string | null
    questions: string | null
    createdAt: Date | null
  }

  export type QuestCountAggregateOutputType = {
    id: number
    title: number
    subject: number
    grade: number
    creatorId: number
    questions: number
    createdAt: number
    _all: number
  }


  export type QuestMinAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    grade?: true
    creatorId?: true
    questions?: true
    createdAt?: true
  }

  export type QuestMaxAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    grade?: true
    creatorId?: true
    questions?: true
    createdAt?: true
  }

  export type QuestCountAggregateInputType = {
    id?: true
    title?: true
    subject?: true
    grade?: true
    creatorId?: true
    questions?: true
    createdAt?: true
    _all?: true
  }

  export type QuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quest to aggregate.
     */
    where?: QuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quests to fetch.
     */
    orderBy?: QuestOrderByWithRelationInput | QuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quests
    **/
    _count?: true | QuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestMaxAggregateInputType
  }

  export type GetQuestAggregateType<T extends QuestAggregateArgs> = {
        [P in keyof T & keyof AggregateQuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuest[P]>
      : GetScalarType<T[P], AggregateQuest[P]>
  }




  export type QuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestWhereInput
    orderBy?: QuestOrderByWithAggregationInput | QuestOrderByWithAggregationInput[]
    by: QuestScalarFieldEnum[] | QuestScalarFieldEnum
    having?: QuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestCountAggregateInputType | true
    _min?: QuestMinAggregateInputType
    _max?: QuestMaxAggregateInputType
  }

  export type QuestGroupByOutputType = {
    id: string
    title: string
    subject: string
    grade: string
    creatorId: string
    questions: string
    createdAt: Date
    _count: QuestCountAggregateOutputType | null
    _min: QuestMinAggregateOutputType | null
    _max: QuestMaxAggregateOutputType | null
  }

  type GetQuestGroupByPayload<T extends QuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestGroupByOutputType[P]>
            : GetScalarType<T[P], QuestGroupByOutputType[P]>
        }
      >
    >


  export type QuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subject?: boolean
    grade?: boolean
    creatorId?: boolean
    questions?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    results?: boolean | Quest$resultsArgs<ExtArgs>
    _count?: boolean | QuestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quest"]>

  export type QuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subject?: boolean
    grade?: boolean
    creatorId?: boolean
    questions?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quest"]>

  export type QuestSelectScalar = {
    id?: boolean
    title?: boolean
    subject?: boolean
    grade?: boolean
    creatorId?: boolean
    questions?: boolean
    createdAt?: boolean
  }

  export type QuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    results?: boolean | Quest$resultsArgs<ExtArgs>
    _count?: boolean | QuestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quest"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      results: Prisma.$ResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subject: string
      grade: string
      creatorId: string
      questions: string
      createdAt: Date
    }, ExtArgs["result"]["quest"]>
    composites: {}
  }

  type QuestGetPayload<S extends boolean | null | undefined | QuestDefaultArgs> = $Result.GetResult<Prisma.$QuestPayload, S>

  type QuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestCountAggregateInputType | true
    }

  export interface QuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quest'], meta: { name: 'Quest' } }
    /**
     * Find zero or one Quest that matches the filter.
     * @param {QuestFindUniqueArgs} args - Arguments to find a Quest
     * @example
     * // Get one Quest
     * const quest = await prisma.quest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestFindUniqueArgs>(args: SelectSubset<T, QuestFindUniqueArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Quest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestFindUniqueOrThrowArgs} args - Arguments to find a Quest
     * @example
     * // Get one Quest
     * const quest = await prisma.quest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Quest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestFindFirstArgs} args - Arguments to find a Quest
     * @example
     * // Get one Quest
     * const quest = await prisma.quest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestFindFirstArgs>(args?: SelectSubset<T, QuestFindFirstArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Quest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestFindFirstOrThrowArgs} args - Arguments to find a Quest
     * @example
     * // Get one Quest
     * const quest = await prisma.quest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Quests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quests
     * const quests = await prisma.quest.findMany()
     * 
     * // Get first 10 Quests
     * const quests = await prisma.quest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questWithIdOnly = await prisma.quest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestFindManyArgs>(args?: SelectSubset<T, QuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Quest.
     * @param {QuestCreateArgs} args - Arguments to create a Quest.
     * @example
     * // Create one Quest
     * const Quest = await prisma.quest.create({
     *   data: {
     *     // ... data to create a Quest
     *   }
     * })
     * 
     */
    create<T extends QuestCreateArgs>(args: SelectSubset<T, QuestCreateArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Quests.
     * @param {QuestCreateManyArgs} args - Arguments to create many Quests.
     * @example
     * // Create many Quests
     * const quest = await prisma.quest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestCreateManyArgs>(args?: SelectSubset<T, QuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quests and returns the data saved in the database.
     * @param {QuestCreateManyAndReturnArgs} args - Arguments to create many Quests.
     * @example
     * // Create many Quests
     * const quest = await prisma.quest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quests and only return the `id`
     * const questWithIdOnly = await prisma.quest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Quest.
     * @param {QuestDeleteArgs} args - Arguments to delete one Quest.
     * @example
     * // Delete one Quest
     * const Quest = await prisma.quest.delete({
     *   where: {
     *     // ... filter to delete one Quest
     *   }
     * })
     * 
     */
    delete<T extends QuestDeleteArgs>(args: SelectSubset<T, QuestDeleteArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Quest.
     * @param {QuestUpdateArgs} args - Arguments to update one Quest.
     * @example
     * // Update one Quest
     * const quest = await prisma.quest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestUpdateArgs>(args: SelectSubset<T, QuestUpdateArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Quests.
     * @param {QuestDeleteManyArgs} args - Arguments to filter Quests to delete.
     * @example
     * // Delete a few Quests
     * const { count } = await prisma.quest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestDeleteManyArgs>(args?: SelectSubset<T, QuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quests
     * const quest = await prisma.quest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestUpdateManyArgs>(args: SelectSubset<T, QuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Quest.
     * @param {QuestUpsertArgs} args - Arguments to update or create a Quest.
     * @example
     * // Update or create a Quest
     * const quest = await prisma.quest.upsert({
     *   create: {
     *     // ... data to create a Quest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quest we want to update
     *   }
     * })
     */
    upsert<T extends QuestUpsertArgs>(args: SelectSubset<T, QuestUpsertArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Quests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestCountArgs} args - Arguments to filter Quests to count.
     * @example
     * // Count the number of Quests
     * const count = await prisma.quest.count({
     *   where: {
     *     // ... the filter for the Quests we want to count
     *   }
     * })
    **/
    count<T extends QuestCountArgs>(
      args?: Subset<T, QuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestAggregateArgs>(args: Subset<T, QuestAggregateArgs>): Prisma.PrismaPromise<GetQuestAggregateType<T>>

    /**
     * Group by Quest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestGroupByArgs} args - Group by arguments.
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
      T extends QuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestGroupByArgs['orderBy'] }
        : { orderBy?: QuestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quest model
   */
  readonly fields: QuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    results<T extends Quest$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Quest$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Quest model
   */ 
  interface QuestFieldRefs {
    readonly id: FieldRef<"Quest", 'String'>
    readonly title: FieldRef<"Quest", 'String'>
    readonly subject: FieldRef<"Quest", 'String'>
    readonly grade: FieldRef<"Quest", 'String'>
    readonly creatorId: FieldRef<"Quest", 'String'>
    readonly questions: FieldRef<"Quest", 'String'>
    readonly createdAt: FieldRef<"Quest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quest findUnique
   */
  export type QuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter, which Quest to fetch.
     */
    where: QuestWhereUniqueInput
  }

  /**
   * Quest findUniqueOrThrow
   */
  export type QuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter, which Quest to fetch.
     */
    where: QuestWhereUniqueInput
  }

  /**
   * Quest findFirst
   */
  export type QuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter, which Quest to fetch.
     */
    where?: QuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quests to fetch.
     */
    orderBy?: QuestOrderByWithRelationInput | QuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quests.
     */
    cursor?: QuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quests.
     */
    distinct?: QuestScalarFieldEnum | QuestScalarFieldEnum[]
  }

  /**
   * Quest findFirstOrThrow
   */
  export type QuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter, which Quest to fetch.
     */
    where?: QuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quests to fetch.
     */
    orderBy?: QuestOrderByWithRelationInput | QuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quests.
     */
    cursor?: QuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quests.
     */
    distinct?: QuestScalarFieldEnum | QuestScalarFieldEnum[]
  }

  /**
   * Quest findMany
   */
  export type QuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter, which Quests to fetch.
     */
    where?: QuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quests to fetch.
     */
    orderBy?: QuestOrderByWithRelationInput | QuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quests.
     */
    cursor?: QuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quests.
     */
    skip?: number
    distinct?: QuestScalarFieldEnum | QuestScalarFieldEnum[]
  }

  /**
   * Quest create
   */
  export type QuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * The data needed to create a Quest.
     */
    data: XOR<QuestCreateInput, QuestUncheckedCreateInput>
  }

  /**
   * Quest createMany
   */
  export type QuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quests.
     */
    data: QuestCreateManyInput | QuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quest createManyAndReturn
   */
  export type QuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Quests.
     */
    data: QuestCreateManyInput | QuestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quest update
   */
  export type QuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * The data needed to update a Quest.
     */
    data: XOR<QuestUpdateInput, QuestUncheckedUpdateInput>
    /**
     * Choose, which Quest to update.
     */
    where: QuestWhereUniqueInput
  }

  /**
   * Quest updateMany
   */
  export type QuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quests.
     */
    data: XOR<QuestUpdateManyMutationInput, QuestUncheckedUpdateManyInput>
    /**
     * Filter which Quests to update
     */
    where?: QuestWhereInput
  }

  /**
   * Quest upsert
   */
  export type QuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * The filter to search for the Quest to update in case it exists.
     */
    where: QuestWhereUniqueInput
    /**
     * In case the Quest found by the `where` argument doesn't exist, create a new Quest with this data.
     */
    create: XOR<QuestCreateInput, QuestUncheckedCreateInput>
    /**
     * In case the Quest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestUpdateInput, QuestUncheckedUpdateInput>
  }

  /**
   * Quest delete
   */
  export type QuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    /**
     * Filter which Quest to delete.
     */
    where: QuestWhereUniqueInput
  }

  /**
   * Quest deleteMany
   */
  export type QuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quests to delete
     */
    where?: QuestWhereInput
  }

  /**
   * Quest.results
   */
  export type Quest$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    cursor?: ResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Quest without action
   */
  export type QuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
  }


  /**
   * Model Result
   */

  export type AggregateResult = {
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  export type ResultAvgAggregateOutputType = {
    score: number | null
  }

  export type ResultSumAggregateOutputType = {
    score: number | null
  }

  export type ResultMinAggregateOutputType = {
    id: string | null
    userId: string | null
    questId: string | null
    score: number | null
    mode: string | null
    date: Date | null
  }

  export type ResultMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    questId: string | null
    score: number | null
    mode: string | null
    date: Date | null
  }

  export type ResultCountAggregateOutputType = {
    id: number
    userId: number
    questId: number
    score: number
    mode: number
    date: number
    _all: number
  }


  export type ResultAvgAggregateInputType = {
    score?: true
  }

  export type ResultSumAggregateInputType = {
    score?: true
  }

  export type ResultMinAggregateInputType = {
    id?: true
    userId?: true
    questId?: true
    score?: true
    mode?: true
    date?: true
  }

  export type ResultMaxAggregateInputType = {
    id?: true
    userId?: true
    questId?: true
    score?: true
    mode?: true
    date?: true
  }

  export type ResultCountAggregateInputType = {
    id?: true
    userId?: true
    questId?: true
    score?: true
    mode?: true
    date?: true
    _all?: true
  }

  export type ResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Result to aggregate.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Results
    **/
    _count?: true | ResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResultMaxAggregateInputType
  }

  export type GetResultAggregateType<T extends ResultAggregateArgs> = {
        [P in keyof T & keyof AggregateResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResult[P]>
      : GetScalarType<T[P], AggregateResult[P]>
  }




  export type ResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithAggregationInput | ResultOrderByWithAggregationInput[]
    by: ResultScalarFieldEnum[] | ResultScalarFieldEnum
    having?: ResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResultCountAggregateInputType | true
    _avg?: ResultAvgAggregateInputType
    _sum?: ResultSumAggregateInputType
    _min?: ResultMinAggregateInputType
    _max?: ResultMaxAggregateInputType
  }

  export type ResultGroupByOutputType = {
    id: string
    userId: string
    questId: string | null
    score: number
    mode: string
    date: Date
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  type GetResultGroupByPayload<T extends ResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResultGroupByOutputType[P]>
            : GetScalarType<T[P], ResultGroupByOutputType[P]>
        }
      >
    >


  export type ResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questId?: boolean
    score?: boolean
    mode?: boolean
    date?: boolean
    quest?: boolean | Result$questArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>

  export type ResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    questId?: boolean
    score?: boolean
    mode?: boolean
    date?: boolean
    quest?: boolean | Result$questArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>

  export type ResultSelectScalar = {
    id?: boolean
    userId?: boolean
    questId?: boolean
    score?: boolean
    mode?: boolean
    date?: boolean
  }

  export type ResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quest?: boolean | Result$questArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quest?: boolean | Result$questArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Result"
    objects: {
      quest: Prisma.$QuestPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      questId: string | null
      score: number
      mode: string
      date: Date
    }, ExtArgs["result"]["result"]>
    composites: {}
  }

  type ResultGetPayload<S extends boolean | null | undefined | ResultDefaultArgs> = $Result.GetResult<Prisma.$ResultPayload, S>

  type ResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResultFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResultCountAggregateInputType | true
    }

  export interface ResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Result'], meta: { name: 'Result' } }
    /**
     * Find zero or one Result that matches the filter.
     * @param {ResultFindUniqueArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResultFindUniqueArgs>(args: SelectSubset<T, ResultFindUniqueArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Result that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResultFindUniqueOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Result that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResultFindFirstArgs>(args?: SelectSubset<T, ResultFindFirstArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Result that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Results that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Results
     * const results = await prisma.result.findMany()
     * 
     * // Get first 10 Results
     * const results = await prisma.result.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resultWithIdOnly = await prisma.result.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResultFindManyArgs>(args?: SelectSubset<T, ResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Result.
     * @param {ResultCreateArgs} args - Arguments to create a Result.
     * @example
     * // Create one Result
     * const Result = await prisma.result.create({
     *   data: {
     *     // ... data to create a Result
     *   }
     * })
     * 
     */
    create<T extends ResultCreateArgs>(args: SelectSubset<T, ResultCreateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Results.
     * @param {ResultCreateManyArgs} args - Arguments to create many Results.
     * @example
     * // Create many Results
     * const result = await prisma.result.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResultCreateManyArgs>(args?: SelectSubset<T, ResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Results and returns the data saved in the database.
     * @param {ResultCreateManyAndReturnArgs} args - Arguments to create many Results.
     * @example
     * // Create many Results
     * const result = await prisma.result.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Results and only return the `id`
     * const resultWithIdOnly = await prisma.result.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Result.
     * @param {ResultDeleteArgs} args - Arguments to delete one Result.
     * @example
     * // Delete one Result
     * const Result = await prisma.result.delete({
     *   where: {
     *     // ... filter to delete one Result
     *   }
     * })
     * 
     */
    delete<T extends ResultDeleteArgs>(args: SelectSubset<T, ResultDeleteArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Result.
     * @param {ResultUpdateArgs} args - Arguments to update one Result.
     * @example
     * // Update one Result
     * const result = await prisma.result.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResultUpdateArgs>(args: SelectSubset<T, ResultUpdateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Results.
     * @param {ResultDeleteManyArgs} args - Arguments to filter Results to delete.
     * @example
     * // Delete a few Results
     * const { count } = await prisma.result.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResultDeleteManyArgs>(args?: SelectSubset<T, ResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Results
     * const result = await prisma.result.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResultUpdateManyArgs>(args: SelectSubset<T, ResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Result.
     * @param {ResultUpsertArgs} args - Arguments to update or create a Result.
     * @example
     * // Update or create a Result
     * const result = await prisma.result.upsert({
     *   create: {
     *     // ... data to create a Result
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Result we want to update
     *   }
     * })
     */
    upsert<T extends ResultUpsertArgs>(args: SelectSubset<T, ResultUpsertArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultCountArgs} args - Arguments to filter Results to count.
     * @example
     * // Count the number of Results
     * const count = await prisma.result.count({
     *   where: {
     *     // ... the filter for the Results we want to count
     *   }
     * })
    **/
    count<T extends ResultCountArgs>(
      args?: Subset<T, ResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResultAggregateArgs>(args: Subset<T, ResultAggregateArgs>): Prisma.PrismaPromise<GetResultAggregateType<T>>

    /**
     * Group by Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultGroupByArgs} args - Group by arguments.
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
      T extends ResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResultGroupByArgs['orderBy'] }
        : { orderBy?: ResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Result model
   */
  readonly fields: ResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Result.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quest<T extends Result$questArgs<ExtArgs> = {}>(args?: Subset<T, Result$questArgs<ExtArgs>>): Prisma__QuestClient<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Result model
   */ 
  interface ResultFieldRefs {
    readonly id: FieldRef<"Result", 'String'>
    readonly userId: FieldRef<"Result", 'String'>
    readonly questId: FieldRef<"Result", 'String'>
    readonly score: FieldRef<"Result", 'Int'>
    readonly mode: FieldRef<"Result", 'String'>
    readonly date: FieldRef<"Result", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Result findUnique
   */
  export type ResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findUniqueOrThrow
   */
  export type ResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findFirst
   */
  export type ResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findFirstOrThrow
   */
  export type ResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findMany
   */
  export type ResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Results to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result create
   */
  export type ResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to create a Result.
     */
    data: XOR<ResultCreateInput, ResultUncheckedCreateInput>
  }

  /**
   * Result createMany
   */
  export type ResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Results.
     */
    data: ResultCreateManyInput | ResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Result createManyAndReturn
   */
  export type ResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Results.
     */
    data: ResultCreateManyInput | ResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Result update
   */
  export type ResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to update a Result.
     */
    data: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
    /**
     * Choose, which Result to update.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result updateMany
   */
  export type ResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Results.
     */
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyInput>
    /**
     * Filter which Results to update
     */
    where?: ResultWhereInput
  }

  /**
   * Result upsert
   */
  export type ResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The filter to search for the Result to update in case it exists.
     */
    where: ResultWhereUniqueInput
    /**
     * In case the Result found by the `where` argument doesn't exist, create a new Result with this data.
     */
    create: XOR<ResultCreateInput, ResultUncheckedCreateInput>
    /**
     * In case the Result was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
  }

  /**
   * Result delete
   */
  export type ResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter which Result to delete.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result deleteMany
   */
  export type ResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Results to delete
     */
    where?: ResultWhereInput
  }

  /**
   * Result.quest
   */
  export type Result$questArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    where?: QuestWhereInput
  }

  /**
   * Result without action
   */
  export type ResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
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
    xp: number | null
    coins: number | null
    questsPlayed: number | null
    questsCreated: number | null
  }

  export type UserSumAggregateOutputType = {
    xp: number | null
    coins: number | null
    questsPlayed: number | null
    questsCreated: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    xp: number | null
    coins: number | null
    isSubscribed: boolean | null
    isVerified: boolean | null
    verificationCode: string | null
    stripeCustomerId: string | null
    subscriptionInterval: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    cancelAtPeriodEnd: boolean | null
    questsPlayed: number | null
    questsCreated: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    xp: number | null
    coins: number | null
    isSubscribed: boolean | null
    isVerified: boolean | null
    verificationCode: string | null
    stripeCustomerId: string | null
    subscriptionInterval: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    cancelAtPeriodEnd: boolean | null
    questsPlayed: number | null
    questsCreated: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    xp: number
    coins: number
    isSubscribed: number
    isVerified: number
    verificationCode: number
    stripeCustomerId: number
    subscriptionInterval: number
    subscriptionStartDate: number
    subscriptionEndDate: number
    cancelAtPeriodEnd: number
    questsPlayed: number
    questsCreated: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    xp?: true
    coins?: true
    questsPlayed?: true
    questsCreated?: true
  }

  export type UserSumAggregateInputType = {
    xp?: true
    coins?: true
    questsPlayed?: true
    questsCreated?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    xp?: true
    coins?: true
    isSubscribed?: true
    isVerified?: true
    verificationCode?: true
    stripeCustomerId?: true
    subscriptionInterval?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    cancelAtPeriodEnd?: true
    questsPlayed?: true
    questsCreated?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    xp?: true
    coins?: true
    isSubscribed?: true
    isVerified?: true
    verificationCode?: true
    stripeCustomerId?: true
    subscriptionInterval?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    cancelAtPeriodEnd?: true
    questsPlayed?: true
    questsCreated?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    xp?: true
    coins?: true
    isSubscribed?: true
    isVerified?: true
    verificationCode?: true
    stripeCustomerId?: true
    subscriptionInterval?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    cancelAtPeriodEnd?: true
    questsPlayed?: true
    questsCreated?: true
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
    password: string
    name: string
    role: string
    xp: number
    coins: number
    isSubscribed: boolean
    isVerified: boolean
    verificationCode: string | null
    stripeCustomerId: string | null
    subscriptionInterval: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    cancelAtPeriodEnd: boolean
    questsPlayed: number
    questsCreated: number
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
    password?: boolean
    name?: boolean
    role?: boolean
    xp?: boolean
    coins?: boolean
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: boolean
    stripeCustomerId?: boolean
    subscriptionInterval?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    cancelAtPeriodEnd?: boolean
    questsPlayed?: boolean
    questsCreated?: boolean
    quests?: boolean | User$questsArgs<ExtArgs>
    results?: boolean | User$resultsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    xp?: boolean
    coins?: boolean
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: boolean
    stripeCustomerId?: boolean
    subscriptionInterval?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    cancelAtPeriodEnd?: boolean
    questsPlayed?: boolean
    questsCreated?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    xp?: boolean
    coins?: boolean
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: boolean
    stripeCustomerId?: boolean
    subscriptionInterval?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    cancelAtPeriodEnd?: boolean
    questsPlayed?: boolean
    questsCreated?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quests?: boolean | User$questsArgs<ExtArgs>
    results?: boolean | User$resultsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      quests: Prisma.$QuestPayload<ExtArgs>[]
      results: Prisma.$ResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: string
      xp: number
      coins: number
      isSubscribed: boolean
      isVerified: boolean
      verificationCode: string | null
      stripeCustomerId: string | null
      subscriptionInterval: string | null
      subscriptionStartDate: Date | null
      subscriptionEndDate: Date | null
      cancelAtPeriodEnd: boolean
      questsPlayed: number
      questsCreated: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quests<T extends User$questsArgs<ExtArgs> = {}>(args?: Subset<T, User$questsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestPayload<ExtArgs>, T, "findMany"> | Null>
    results<T extends User$resultsArgs<ExtArgs> = {}>(args?: Subset<T, User$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly xp: FieldRef<"User", 'Int'>
    readonly coins: FieldRef<"User", 'Int'>
    readonly isSubscribed: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly verificationCode: FieldRef<"User", 'String'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly subscriptionInterval: FieldRef<"User", 'String'>
    readonly subscriptionStartDate: FieldRef<"User", 'DateTime'>
    readonly subscriptionEndDate: FieldRef<"User", 'DateTime'>
    readonly cancelAtPeriodEnd: FieldRef<"User", 'Boolean'>
    readonly questsPlayed: FieldRef<"User", 'Int'>
    readonly questsCreated: FieldRef<"User", 'Int'>
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
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
  }

  /**
   * User.quests
   */
  export type User$questsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quest
     */
    select?: QuestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestInclude<ExtArgs> | null
    where?: QuestWhereInput
    orderBy?: QuestOrderByWithRelationInput | QuestOrderByWithRelationInput[]
    cursor?: QuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestScalarFieldEnum | QuestScalarFieldEnum[]
  }

  /**
   * User.results
   */
  export type User$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    cursor?: ResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PendingUser
   */

  export type AggregatePendingUser = {
    _count: PendingUserCountAggregateOutputType | null
    _min: PendingUserMinAggregateOutputType | null
    _max: PendingUserMaxAggregateOutputType | null
  }

  export type PendingUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    verificationCode: string | null
    createdAt: Date | null
  }

  export type PendingUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    verificationCode: string | null
    createdAt: Date | null
  }

  export type PendingUserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    verificationCode: number
    createdAt: number
    _all: number
  }


  export type PendingUserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    verificationCode?: true
    createdAt?: true
  }

  export type PendingUserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    verificationCode?: true
    createdAt?: true
  }

  export type PendingUserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    verificationCode?: true
    createdAt?: true
    _all?: true
  }

  export type PendingUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingUser to aggregate.
     */
    where?: PendingUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingUsers to fetch.
     */
    orderBy?: PendingUserOrderByWithRelationInput | PendingUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingUsers
    **/
    _count?: true | PendingUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingUserMaxAggregateInputType
  }

  export type GetPendingUserAggregateType<T extends PendingUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingUser[P]>
      : GetScalarType<T[P], AggregatePendingUser[P]>
  }




  export type PendingUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingUserWhereInput
    orderBy?: PendingUserOrderByWithAggregationInput | PendingUserOrderByWithAggregationInput[]
    by: PendingUserScalarFieldEnum[] | PendingUserScalarFieldEnum
    having?: PendingUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingUserCountAggregateInputType | true
    _min?: PendingUserMinAggregateInputType
    _max?: PendingUserMaxAggregateInputType
  }

  export type PendingUserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: string
    verificationCode: string
    createdAt: Date
    _count: PendingUserCountAggregateOutputType | null
    _min: PendingUserMinAggregateOutputType | null
    _max: PendingUserMaxAggregateOutputType | null
  }

  type GetPendingUserGroupByPayload<T extends PendingUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingUserGroupByOutputType[P]>
            : GetScalarType<T[P], PendingUserGroupByOutputType[P]>
        }
      >
    >


  export type PendingUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    verificationCode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendingUser"]>

  export type PendingUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    verificationCode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendingUser"]>

  export type PendingUserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    verificationCode?: boolean
    createdAt?: boolean
  }


  export type $PendingUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: string
      verificationCode: string
      createdAt: Date
    }, ExtArgs["result"]["pendingUser"]>
    composites: {}
  }

  type PendingUserGetPayload<S extends boolean | null | undefined | PendingUserDefaultArgs> = $Result.GetResult<Prisma.$PendingUserPayload, S>

  type PendingUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PendingUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PendingUserCountAggregateInputType | true
    }

  export interface PendingUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingUser'], meta: { name: 'PendingUser' } }
    /**
     * Find zero or one PendingUser that matches the filter.
     * @param {PendingUserFindUniqueArgs} args - Arguments to find a PendingUser
     * @example
     * // Get one PendingUser
     * const pendingUser = await prisma.pendingUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingUserFindUniqueArgs>(args: SelectSubset<T, PendingUserFindUniqueArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PendingUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PendingUserFindUniqueOrThrowArgs} args - Arguments to find a PendingUser
     * @example
     * // Get one PendingUser
     * const pendingUser = await prisma.pendingUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PendingUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserFindFirstArgs} args - Arguments to find a PendingUser
     * @example
     * // Get one PendingUser
     * const pendingUser = await prisma.pendingUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingUserFindFirstArgs>(args?: SelectSubset<T, PendingUserFindFirstArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PendingUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserFindFirstOrThrowArgs} args - Arguments to find a PendingUser
     * @example
     * // Get one PendingUser
     * const pendingUser = await prisma.pendingUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PendingUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingUsers
     * const pendingUsers = await prisma.pendingUser.findMany()
     * 
     * // Get first 10 PendingUsers
     * const pendingUsers = await prisma.pendingUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendingUserWithIdOnly = await prisma.pendingUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendingUserFindManyArgs>(args?: SelectSubset<T, PendingUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PendingUser.
     * @param {PendingUserCreateArgs} args - Arguments to create a PendingUser.
     * @example
     * // Create one PendingUser
     * const PendingUser = await prisma.pendingUser.create({
     *   data: {
     *     // ... data to create a PendingUser
     *   }
     * })
     * 
     */
    create<T extends PendingUserCreateArgs>(args: SelectSubset<T, PendingUserCreateArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PendingUsers.
     * @param {PendingUserCreateManyArgs} args - Arguments to create many PendingUsers.
     * @example
     * // Create many PendingUsers
     * const pendingUser = await prisma.pendingUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingUserCreateManyArgs>(args?: SelectSubset<T, PendingUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingUsers and returns the data saved in the database.
     * @param {PendingUserCreateManyAndReturnArgs} args - Arguments to create many PendingUsers.
     * @example
     * // Create many PendingUsers
     * const pendingUser = await prisma.pendingUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingUsers and only return the `id`
     * const pendingUserWithIdOnly = await prisma.pendingUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PendingUser.
     * @param {PendingUserDeleteArgs} args - Arguments to delete one PendingUser.
     * @example
     * // Delete one PendingUser
     * const PendingUser = await prisma.pendingUser.delete({
     *   where: {
     *     // ... filter to delete one PendingUser
     *   }
     * })
     * 
     */
    delete<T extends PendingUserDeleteArgs>(args: SelectSubset<T, PendingUserDeleteArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PendingUser.
     * @param {PendingUserUpdateArgs} args - Arguments to update one PendingUser.
     * @example
     * // Update one PendingUser
     * const pendingUser = await prisma.pendingUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingUserUpdateArgs>(args: SelectSubset<T, PendingUserUpdateArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PendingUsers.
     * @param {PendingUserDeleteManyArgs} args - Arguments to filter PendingUsers to delete.
     * @example
     * // Delete a few PendingUsers
     * const { count } = await prisma.pendingUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingUserDeleteManyArgs>(args?: SelectSubset<T, PendingUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingUsers
     * const pendingUser = await prisma.pendingUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingUserUpdateManyArgs>(args: SelectSubset<T, PendingUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PendingUser.
     * @param {PendingUserUpsertArgs} args - Arguments to update or create a PendingUser.
     * @example
     * // Update or create a PendingUser
     * const pendingUser = await prisma.pendingUser.upsert({
     *   create: {
     *     // ... data to create a PendingUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingUser we want to update
     *   }
     * })
     */
    upsert<T extends PendingUserUpsertArgs>(args: SelectSubset<T, PendingUserUpsertArgs<ExtArgs>>): Prisma__PendingUserClient<$Result.GetResult<Prisma.$PendingUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PendingUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserCountArgs} args - Arguments to filter PendingUsers to count.
     * @example
     * // Count the number of PendingUsers
     * const count = await prisma.pendingUser.count({
     *   where: {
     *     // ... the filter for the PendingUsers we want to count
     *   }
     * })
    **/
    count<T extends PendingUserCountArgs>(
      args?: Subset<T, PendingUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PendingUserAggregateArgs>(args: Subset<T, PendingUserAggregateArgs>): Prisma.PrismaPromise<GetPendingUserAggregateType<T>>

    /**
     * Group by PendingUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingUserGroupByArgs} args - Group by arguments.
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
      T extends PendingUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingUserGroupByArgs['orderBy'] }
        : { orderBy?: PendingUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PendingUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingUser model
   */
  readonly fields: PendingUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PendingUser model
   */ 
  interface PendingUserFieldRefs {
    readonly id: FieldRef<"PendingUser", 'String'>
    readonly email: FieldRef<"PendingUser", 'String'>
    readonly password: FieldRef<"PendingUser", 'String'>
    readonly name: FieldRef<"PendingUser", 'String'>
    readonly role: FieldRef<"PendingUser", 'String'>
    readonly verificationCode: FieldRef<"PendingUser", 'String'>
    readonly createdAt: FieldRef<"PendingUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PendingUser findUnique
   */
  export type PendingUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter, which PendingUser to fetch.
     */
    where: PendingUserWhereUniqueInput
  }

  /**
   * PendingUser findUniqueOrThrow
   */
  export type PendingUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter, which PendingUser to fetch.
     */
    where: PendingUserWhereUniqueInput
  }

  /**
   * PendingUser findFirst
   */
  export type PendingUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter, which PendingUser to fetch.
     */
    where?: PendingUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingUsers to fetch.
     */
    orderBy?: PendingUserOrderByWithRelationInput | PendingUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingUsers.
     */
    cursor?: PendingUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingUsers.
     */
    distinct?: PendingUserScalarFieldEnum | PendingUserScalarFieldEnum[]
  }

  /**
   * PendingUser findFirstOrThrow
   */
  export type PendingUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter, which PendingUser to fetch.
     */
    where?: PendingUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingUsers to fetch.
     */
    orderBy?: PendingUserOrderByWithRelationInput | PendingUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingUsers.
     */
    cursor?: PendingUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingUsers.
     */
    distinct?: PendingUserScalarFieldEnum | PendingUserScalarFieldEnum[]
  }

  /**
   * PendingUser findMany
   */
  export type PendingUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter, which PendingUsers to fetch.
     */
    where?: PendingUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingUsers to fetch.
     */
    orderBy?: PendingUserOrderByWithRelationInput | PendingUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingUsers.
     */
    cursor?: PendingUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingUsers.
     */
    skip?: number
    distinct?: PendingUserScalarFieldEnum | PendingUserScalarFieldEnum[]
  }

  /**
   * PendingUser create
   */
  export type PendingUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * The data needed to create a PendingUser.
     */
    data: XOR<PendingUserCreateInput, PendingUserUncheckedCreateInput>
  }

  /**
   * PendingUser createMany
   */
  export type PendingUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingUsers.
     */
    data: PendingUserCreateManyInput | PendingUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingUser createManyAndReturn
   */
  export type PendingUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PendingUsers.
     */
    data: PendingUserCreateManyInput | PendingUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingUser update
   */
  export type PendingUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * The data needed to update a PendingUser.
     */
    data: XOR<PendingUserUpdateInput, PendingUserUncheckedUpdateInput>
    /**
     * Choose, which PendingUser to update.
     */
    where: PendingUserWhereUniqueInput
  }

  /**
   * PendingUser updateMany
   */
  export type PendingUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingUsers.
     */
    data: XOR<PendingUserUpdateManyMutationInput, PendingUserUncheckedUpdateManyInput>
    /**
     * Filter which PendingUsers to update
     */
    where?: PendingUserWhereInput
  }

  /**
   * PendingUser upsert
   */
  export type PendingUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * The filter to search for the PendingUser to update in case it exists.
     */
    where: PendingUserWhereUniqueInput
    /**
     * In case the PendingUser found by the `where` argument doesn't exist, create a new PendingUser with this data.
     */
    create: XOR<PendingUserCreateInput, PendingUserUncheckedCreateInput>
    /**
     * In case the PendingUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingUserUpdateInput, PendingUserUncheckedUpdateInput>
  }

  /**
   * PendingUser delete
   */
  export type PendingUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
    /**
     * Filter which PendingUser to delete.
     */
    where: PendingUserWhereUniqueInput
  }

  /**
   * PendingUser deleteMany
   */
  export type PendingUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingUsers to delete
     */
    where?: PendingUserWhereInput
  }

  /**
   * PendingUser without action
   */
  export type PendingUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingUser
     */
    select?: PendingUserSelect<ExtArgs> | null
  }


  /**
   * Model QuestionBank
   */

  export type AggregateQuestionBank = {
    _count: QuestionBankCountAggregateOutputType | null
    _avg: QuestionBankAvgAggregateOutputType | null
    _sum: QuestionBankSumAggregateOutputType | null
    _min: QuestionBankMinAggregateOutputType | null
    _max: QuestionBankMaxAggregateOutputType | null
  }

  export type QuestionBankAvgAggregateOutputType = {
    year: number | null
  }

  export type QuestionBankSumAggregateOutputType = {
    year: number | null
  }

  export type QuestionBankMinAggregateOutputType = {
    id: string | null
    subject: string | null
    grade: string | null
    syllabus: string | null
    topic: string | null
    subtopic: string | null
    year: number | null
    question: string | null
    options: string | null
    correctAnswer: string | null
    explanation: string | null
    difficulty: string | null
    source: string | null
    createdAt: Date | null
  }

  export type QuestionBankMaxAggregateOutputType = {
    id: string | null
    subject: string | null
    grade: string | null
    syllabus: string | null
    topic: string | null
    subtopic: string | null
    year: number | null
    question: string | null
    options: string | null
    correctAnswer: string | null
    explanation: string | null
    difficulty: string | null
    source: string | null
    createdAt: Date | null
  }

  export type QuestionBankCountAggregateOutputType = {
    id: number
    subject: number
    grade: number
    syllabus: number
    topic: number
    subtopic: number
    year: number
    question: number
    options: number
    correctAnswer: number
    explanation: number
    difficulty: number
    source: number
    createdAt: number
    _all: number
  }


  export type QuestionBankAvgAggregateInputType = {
    year?: true
  }

  export type QuestionBankSumAggregateInputType = {
    year?: true
  }

  export type QuestionBankMinAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topic?: true
    subtopic?: true
    year?: true
    question?: true
    options?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    source?: true
    createdAt?: true
  }

  export type QuestionBankMaxAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topic?: true
    subtopic?: true
    year?: true
    question?: true
    options?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    source?: true
    createdAt?: true
  }

  export type QuestionBankCountAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topic?: true
    subtopic?: true
    year?: true
    question?: true
    options?: true
    correctAnswer?: true
    explanation?: true
    difficulty?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionBankAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionBank to aggregate.
     */
    where?: QuestionBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionBanks to fetch.
     */
    orderBy?: QuestionBankOrderByWithRelationInput | QuestionBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionBanks
    **/
    _count?: true | QuestionBankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionBankAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionBankSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionBankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionBankMaxAggregateInputType
  }

  export type GetQuestionBankAggregateType<T extends QuestionBankAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionBank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionBank[P]>
      : GetScalarType<T[P], AggregateQuestionBank[P]>
  }




  export type QuestionBankGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionBankWhereInput
    orderBy?: QuestionBankOrderByWithAggregationInput | QuestionBankOrderByWithAggregationInput[]
    by: QuestionBankScalarFieldEnum[] | QuestionBankScalarFieldEnum
    having?: QuestionBankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionBankCountAggregateInputType | true
    _avg?: QuestionBankAvgAggregateInputType
    _sum?: QuestionBankSumAggregateInputType
    _min?: QuestionBankMinAggregateInputType
    _max?: QuestionBankMaxAggregateInputType
  }

  export type QuestionBankGroupByOutputType = {
    id: string
    subject: string
    grade: string
    syllabus: string
    topic: string
    subtopic: string | null
    year: number
    question: string
    options: string
    correctAnswer: string
    explanation: string
    difficulty: string
    source: string | null
    createdAt: Date
    _count: QuestionBankCountAggregateOutputType | null
    _avg: QuestionBankAvgAggregateOutputType | null
    _sum: QuestionBankSumAggregateOutputType | null
    _min: QuestionBankMinAggregateOutputType | null
    _max: QuestionBankMaxAggregateOutputType | null
  }

  type GetQuestionBankGroupByPayload<T extends QuestionBankGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionBankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionBankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionBankGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionBankGroupByOutputType[P]>
        }
      >
    >


  export type QuestionBankSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topic?: boolean
    subtopic?: boolean
    year?: boolean
    question?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["questionBank"]>

  export type QuestionBankSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topic?: boolean
    subtopic?: boolean
    year?: boolean
    question?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["questionBank"]>

  export type QuestionBankSelectScalar = {
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topic?: boolean
    subtopic?: boolean
    year?: boolean
    question?: boolean
    options?: boolean
    correctAnswer?: boolean
    explanation?: boolean
    difficulty?: boolean
    source?: boolean
    createdAt?: boolean
  }


  export type $QuestionBankPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionBank"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subject: string
      grade: string
      syllabus: string
      topic: string
      subtopic: string | null
      year: number
      question: string
      options: string
      correctAnswer: string
      explanation: string
      difficulty: string
      source: string | null
      createdAt: Date
    }, ExtArgs["result"]["questionBank"]>
    composites: {}
  }

  type QuestionBankGetPayload<S extends boolean | null | undefined | QuestionBankDefaultArgs> = $Result.GetResult<Prisma.$QuestionBankPayload, S>

  type QuestionBankCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionBankFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionBankCountAggregateInputType | true
    }

  export interface QuestionBankDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionBank'], meta: { name: 'QuestionBank' } }
    /**
     * Find zero or one QuestionBank that matches the filter.
     * @param {QuestionBankFindUniqueArgs} args - Arguments to find a QuestionBank
     * @example
     * // Get one QuestionBank
     * const questionBank = await prisma.questionBank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionBankFindUniqueArgs>(args: SelectSubset<T, QuestionBankFindUniqueArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QuestionBank that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionBankFindUniqueOrThrowArgs} args - Arguments to find a QuestionBank
     * @example
     * // Get one QuestionBank
     * const questionBank = await prisma.questionBank.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionBankFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionBankFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QuestionBank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankFindFirstArgs} args - Arguments to find a QuestionBank
     * @example
     * // Get one QuestionBank
     * const questionBank = await prisma.questionBank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionBankFindFirstArgs>(args?: SelectSubset<T, QuestionBankFindFirstArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QuestionBank that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankFindFirstOrThrowArgs} args - Arguments to find a QuestionBank
     * @example
     * // Get one QuestionBank
     * const questionBank = await prisma.questionBank.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionBankFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionBankFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QuestionBanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionBanks
     * const questionBanks = await prisma.questionBank.findMany()
     * 
     * // Get first 10 QuestionBanks
     * const questionBanks = await prisma.questionBank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionBankWithIdOnly = await prisma.questionBank.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionBankFindManyArgs>(args?: SelectSubset<T, QuestionBankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QuestionBank.
     * @param {QuestionBankCreateArgs} args - Arguments to create a QuestionBank.
     * @example
     * // Create one QuestionBank
     * const QuestionBank = await prisma.questionBank.create({
     *   data: {
     *     // ... data to create a QuestionBank
     *   }
     * })
     * 
     */
    create<T extends QuestionBankCreateArgs>(args: SelectSubset<T, QuestionBankCreateArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QuestionBanks.
     * @param {QuestionBankCreateManyArgs} args - Arguments to create many QuestionBanks.
     * @example
     * // Create many QuestionBanks
     * const questionBank = await prisma.questionBank.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionBankCreateManyArgs>(args?: SelectSubset<T, QuestionBankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionBanks and returns the data saved in the database.
     * @param {QuestionBankCreateManyAndReturnArgs} args - Arguments to create many QuestionBanks.
     * @example
     * // Create many QuestionBanks
     * const questionBank = await prisma.questionBank.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionBanks and only return the `id`
     * const questionBankWithIdOnly = await prisma.questionBank.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionBankCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionBankCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QuestionBank.
     * @param {QuestionBankDeleteArgs} args - Arguments to delete one QuestionBank.
     * @example
     * // Delete one QuestionBank
     * const QuestionBank = await prisma.questionBank.delete({
     *   where: {
     *     // ... filter to delete one QuestionBank
     *   }
     * })
     * 
     */
    delete<T extends QuestionBankDeleteArgs>(args: SelectSubset<T, QuestionBankDeleteArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QuestionBank.
     * @param {QuestionBankUpdateArgs} args - Arguments to update one QuestionBank.
     * @example
     * // Update one QuestionBank
     * const questionBank = await prisma.questionBank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionBankUpdateArgs>(args: SelectSubset<T, QuestionBankUpdateArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QuestionBanks.
     * @param {QuestionBankDeleteManyArgs} args - Arguments to filter QuestionBanks to delete.
     * @example
     * // Delete a few QuestionBanks
     * const { count } = await prisma.questionBank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionBankDeleteManyArgs>(args?: SelectSubset<T, QuestionBankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionBanks
     * const questionBank = await prisma.questionBank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionBankUpdateManyArgs>(args: SelectSubset<T, QuestionBankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuestionBank.
     * @param {QuestionBankUpsertArgs} args - Arguments to update or create a QuestionBank.
     * @example
     * // Update or create a QuestionBank
     * const questionBank = await prisma.questionBank.upsert({
     *   create: {
     *     // ... data to create a QuestionBank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionBank we want to update
     *   }
     * })
     */
    upsert<T extends QuestionBankUpsertArgs>(args: SelectSubset<T, QuestionBankUpsertArgs<ExtArgs>>): Prisma__QuestionBankClient<$Result.GetResult<Prisma.$QuestionBankPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QuestionBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankCountArgs} args - Arguments to filter QuestionBanks to count.
     * @example
     * // Count the number of QuestionBanks
     * const count = await prisma.questionBank.count({
     *   where: {
     *     // ... the filter for the QuestionBanks we want to count
     *   }
     * })
    **/
    count<T extends QuestionBankCountArgs>(
      args?: Subset<T, QuestionBankCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionBankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QuestionBankAggregateArgs>(args: Subset<T, QuestionBankAggregateArgs>): Prisma.PrismaPromise<GetQuestionBankAggregateType<T>>

    /**
     * Group by QuestionBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionBankGroupByArgs} args - Group by arguments.
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
      T extends QuestionBankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionBankGroupByArgs['orderBy'] }
        : { orderBy?: QuestionBankGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, QuestionBankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionBankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionBank model
   */
  readonly fields: QuestionBankFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionBank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionBankClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the QuestionBank model
   */ 
  interface QuestionBankFieldRefs {
    readonly id: FieldRef<"QuestionBank", 'String'>
    readonly subject: FieldRef<"QuestionBank", 'String'>
    readonly grade: FieldRef<"QuestionBank", 'String'>
    readonly syllabus: FieldRef<"QuestionBank", 'String'>
    readonly topic: FieldRef<"QuestionBank", 'String'>
    readonly subtopic: FieldRef<"QuestionBank", 'String'>
    readonly year: FieldRef<"QuestionBank", 'Int'>
    readonly question: FieldRef<"QuestionBank", 'String'>
    readonly options: FieldRef<"QuestionBank", 'String'>
    readonly correctAnswer: FieldRef<"QuestionBank", 'String'>
    readonly explanation: FieldRef<"QuestionBank", 'String'>
    readonly difficulty: FieldRef<"QuestionBank", 'String'>
    readonly source: FieldRef<"QuestionBank", 'String'>
    readonly createdAt: FieldRef<"QuestionBank", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuestionBank findUnique
   */
  export type QuestionBankFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter, which QuestionBank to fetch.
     */
    where: QuestionBankWhereUniqueInput
  }

  /**
   * QuestionBank findUniqueOrThrow
   */
  export type QuestionBankFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter, which QuestionBank to fetch.
     */
    where: QuestionBankWhereUniqueInput
  }

  /**
   * QuestionBank findFirst
   */
  export type QuestionBankFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter, which QuestionBank to fetch.
     */
    where?: QuestionBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionBanks to fetch.
     */
    orderBy?: QuestionBankOrderByWithRelationInput | QuestionBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionBanks.
     */
    cursor?: QuestionBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionBanks.
     */
    distinct?: QuestionBankScalarFieldEnum | QuestionBankScalarFieldEnum[]
  }

  /**
   * QuestionBank findFirstOrThrow
   */
  export type QuestionBankFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter, which QuestionBank to fetch.
     */
    where?: QuestionBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionBanks to fetch.
     */
    orderBy?: QuestionBankOrderByWithRelationInput | QuestionBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionBanks.
     */
    cursor?: QuestionBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionBanks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionBanks.
     */
    distinct?: QuestionBankScalarFieldEnum | QuestionBankScalarFieldEnum[]
  }

  /**
   * QuestionBank findMany
   */
  export type QuestionBankFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter, which QuestionBanks to fetch.
     */
    where?: QuestionBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionBanks to fetch.
     */
    orderBy?: QuestionBankOrderByWithRelationInput | QuestionBankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionBanks.
     */
    cursor?: QuestionBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionBanks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionBanks.
     */
    skip?: number
    distinct?: QuestionBankScalarFieldEnum | QuestionBankScalarFieldEnum[]
  }

  /**
   * QuestionBank create
   */
  export type QuestionBankCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * The data needed to create a QuestionBank.
     */
    data: XOR<QuestionBankCreateInput, QuestionBankUncheckedCreateInput>
  }

  /**
   * QuestionBank createMany
   */
  export type QuestionBankCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionBanks.
     */
    data: QuestionBankCreateManyInput | QuestionBankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionBank createManyAndReturn
   */
  export type QuestionBankCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuestionBanks.
     */
    data: QuestionBankCreateManyInput | QuestionBankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionBank update
   */
  export type QuestionBankUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * The data needed to update a QuestionBank.
     */
    data: XOR<QuestionBankUpdateInput, QuestionBankUncheckedUpdateInput>
    /**
     * Choose, which QuestionBank to update.
     */
    where: QuestionBankWhereUniqueInput
  }

  /**
   * QuestionBank updateMany
   */
  export type QuestionBankUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionBanks.
     */
    data: XOR<QuestionBankUpdateManyMutationInput, QuestionBankUncheckedUpdateManyInput>
    /**
     * Filter which QuestionBanks to update
     */
    where?: QuestionBankWhereInput
  }

  /**
   * QuestionBank upsert
   */
  export type QuestionBankUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * The filter to search for the QuestionBank to update in case it exists.
     */
    where: QuestionBankWhereUniqueInput
    /**
     * In case the QuestionBank found by the `where` argument doesn't exist, create a new QuestionBank with this data.
     */
    create: XOR<QuestionBankCreateInput, QuestionBankUncheckedCreateInput>
    /**
     * In case the QuestionBank was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionBankUpdateInput, QuestionBankUncheckedUpdateInput>
  }

  /**
   * QuestionBank delete
   */
  export type QuestionBankDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
    /**
     * Filter which QuestionBank to delete.
     */
    where: QuestionBankWhereUniqueInput
  }

  /**
   * QuestionBank deleteMany
   */
  export type QuestionBankDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionBanks to delete
     */
    where?: QuestionBankWhereInput
  }

  /**
   * QuestionBank without action
   */
  export type QuestionBankDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionBank
     */
    select?: QuestionBankSelect<ExtArgs> | null
  }


  /**
   * Model CourseSyllabus
   */

  export type AggregateCourseSyllabus = {
    _count: CourseSyllabusCountAggregateOutputType | null
    _min: CourseSyllabusMinAggregateOutputType | null
    _max: CourseSyllabusMaxAggregateOutputType | null
  }

  export type CourseSyllabusMinAggregateOutputType = {
    id: string | null
    subject: string | null
    grade: string | null
    syllabus: string | null
    topics: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseSyllabusMaxAggregateOutputType = {
    id: string | null
    subject: string | null
    grade: string | null
    syllabus: string | null
    topics: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseSyllabusCountAggregateOutputType = {
    id: number
    subject: number
    grade: number
    syllabus: number
    topics: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseSyllabusMinAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topics?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseSyllabusMaxAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topics?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseSyllabusCountAggregateInputType = {
    id?: true
    subject?: true
    grade?: true
    syllabus?: true
    topics?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseSyllabusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseSyllabus to aggregate.
     */
    where?: CourseSyllabusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseSyllabi to fetch.
     */
    orderBy?: CourseSyllabusOrderByWithRelationInput | CourseSyllabusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseSyllabusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseSyllabi from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseSyllabi.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseSyllabi
    **/
    _count?: true | CourseSyllabusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseSyllabusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseSyllabusMaxAggregateInputType
  }

  export type GetCourseSyllabusAggregateType<T extends CourseSyllabusAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseSyllabus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseSyllabus[P]>
      : GetScalarType<T[P], AggregateCourseSyllabus[P]>
  }




  export type CourseSyllabusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseSyllabusWhereInput
    orderBy?: CourseSyllabusOrderByWithAggregationInput | CourseSyllabusOrderByWithAggregationInput[]
    by: CourseSyllabusScalarFieldEnum[] | CourseSyllabusScalarFieldEnum
    having?: CourseSyllabusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseSyllabusCountAggregateInputType | true
    _min?: CourseSyllabusMinAggregateInputType
    _max?: CourseSyllabusMaxAggregateInputType
  }

  export type CourseSyllabusGroupByOutputType = {
    id: string
    subject: string
    grade: string
    syllabus: string
    topics: string
    createdAt: Date
    updatedAt: Date
    _count: CourseSyllabusCountAggregateOutputType | null
    _min: CourseSyllabusMinAggregateOutputType | null
    _max: CourseSyllabusMaxAggregateOutputType | null
  }

  type GetCourseSyllabusGroupByPayload<T extends CourseSyllabusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseSyllabusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseSyllabusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseSyllabusGroupByOutputType[P]>
            : GetScalarType<T[P], CourseSyllabusGroupByOutputType[P]>
        }
      >
    >


  export type CourseSyllabusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topics?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["courseSyllabus"]>

  export type CourseSyllabusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topics?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["courseSyllabus"]>

  export type CourseSyllabusSelectScalar = {
    id?: boolean
    subject?: boolean
    grade?: boolean
    syllabus?: boolean
    topics?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CourseSyllabusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseSyllabus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subject: string
      grade: string
      syllabus: string
      topics: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["courseSyllabus"]>
    composites: {}
  }

  type CourseSyllabusGetPayload<S extends boolean | null | undefined | CourseSyllabusDefaultArgs> = $Result.GetResult<Prisma.$CourseSyllabusPayload, S>

  type CourseSyllabusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CourseSyllabusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CourseSyllabusCountAggregateInputType | true
    }

  export interface CourseSyllabusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseSyllabus'], meta: { name: 'CourseSyllabus' } }
    /**
     * Find zero or one CourseSyllabus that matches the filter.
     * @param {CourseSyllabusFindUniqueArgs} args - Arguments to find a CourseSyllabus
     * @example
     * // Get one CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseSyllabusFindUniqueArgs>(args: SelectSubset<T, CourseSyllabusFindUniqueArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CourseSyllabus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CourseSyllabusFindUniqueOrThrowArgs} args - Arguments to find a CourseSyllabus
     * @example
     * // Get one CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseSyllabusFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseSyllabusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CourseSyllabus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusFindFirstArgs} args - Arguments to find a CourseSyllabus
     * @example
     * // Get one CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseSyllabusFindFirstArgs>(args?: SelectSubset<T, CourseSyllabusFindFirstArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CourseSyllabus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusFindFirstOrThrowArgs} args - Arguments to find a CourseSyllabus
     * @example
     * // Get one CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseSyllabusFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseSyllabusFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CourseSyllabi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseSyllabi
     * const courseSyllabi = await prisma.courseSyllabus.findMany()
     * 
     * // Get first 10 CourseSyllabi
     * const courseSyllabi = await prisma.courseSyllabus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseSyllabusWithIdOnly = await prisma.courseSyllabus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseSyllabusFindManyArgs>(args?: SelectSubset<T, CourseSyllabusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CourseSyllabus.
     * @param {CourseSyllabusCreateArgs} args - Arguments to create a CourseSyllabus.
     * @example
     * // Create one CourseSyllabus
     * const CourseSyllabus = await prisma.courseSyllabus.create({
     *   data: {
     *     // ... data to create a CourseSyllabus
     *   }
     * })
     * 
     */
    create<T extends CourseSyllabusCreateArgs>(args: SelectSubset<T, CourseSyllabusCreateArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CourseSyllabi.
     * @param {CourseSyllabusCreateManyArgs} args - Arguments to create many CourseSyllabi.
     * @example
     * // Create many CourseSyllabi
     * const courseSyllabus = await prisma.courseSyllabus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseSyllabusCreateManyArgs>(args?: SelectSubset<T, CourseSyllabusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CourseSyllabi and returns the data saved in the database.
     * @param {CourseSyllabusCreateManyAndReturnArgs} args - Arguments to create many CourseSyllabi.
     * @example
     * // Create many CourseSyllabi
     * const courseSyllabus = await prisma.courseSyllabus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CourseSyllabi and only return the `id`
     * const courseSyllabusWithIdOnly = await prisma.courseSyllabus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseSyllabusCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseSyllabusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CourseSyllabus.
     * @param {CourseSyllabusDeleteArgs} args - Arguments to delete one CourseSyllabus.
     * @example
     * // Delete one CourseSyllabus
     * const CourseSyllabus = await prisma.courseSyllabus.delete({
     *   where: {
     *     // ... filter to delete one CourseSyllabus
     *   }
     * })
     * 
     */
    delete<T extends CourseSyllabusDeleteArgs>(args: SelectSubset<T, CourseSyllabusDeleteArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CourseSyllabus.
     * @param {CourseSyllabusUpdateArgs} args - Arguments to update one CourseSyllabus.
     * @example
     * // Update one CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseSyllabusUpdateArgs>(args: SelectSubset<T, CourseSyllabusUpdateArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CourseSyllabi.
     * @param {CourseSyllabusDeleteManyArgs} args - Arguments to filter CourseSyllabi to delete.
     * @example
     * // Delete a few CourseSyllabi
     * const { count } = await prisma.courseSyllabus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseSyllabusDeleteManyArgs>(args?: SelectSubset<T, CourseSyllabusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseSyllabi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseSyllabi
     * const courseSyllabus = await prisma.courseSyllabus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseSyllabusUpdateManyArgs>(args: SelectSubset<T, CourseSyllabusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseSyllabus.
     * @param {CourseSyllabusUpsertArgs} args - Arguments to update or create a CourseSyllabus.
     * @example
     * // Update or create a CourseSyllabus
     * const courseSyllabus = await prisma.courseSyllabus.upsert({
     *   create: {
     *     // ... data to create a CourseSyllabus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseSyllabus we want to update
     *   }
     * })
     */
    upsert<T extends CourseSyllabusUpsertArgs>(args: SelectSubset<T, CourseSyllabusUpsertArgs<ExtArgs>>): Prisma__CourseSyllabusClient<$Result.GetResult<Prisma.$CourseSyllabusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CourseSyllabi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusCountArgs} args - Arguments to filter CourseSyllabi to count.
     * @example
     * // Count the number of CourseSyllabi
     * const count = await prisma.courseSyllabus.count({
     *   where: {
     *     // ... the filter for the CourseSyllabi we want to count
     *   }
     * })
    **/
    count<T extends CourseSyllabusCountArgs>(
      args?: Subset<T, CourseSyllabusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseSyllabusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseSyllabus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseSyllabusAggregateArgs>(args: Subset<T, CourseSyllabusAggregateArgs>): Prisma.PrismaPromise<GetCourseSyllabusAggregateType<T>>

    /**
     * Group by CourseSyllabus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseSyllabusGroupByArgs} args - Group by arguments.
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
      T extends CourseSyllabusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseSyllabusGroupByArgs['orderBy'] }
        : { orderBy?: CourseSyllabusGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseSyllabusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseSyllabusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseSyllabus model
   */
  readonly fields: CourseSyllabusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseSyllabus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseSyllabusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CourseSyllabus model
   */ 
  interface CourseSyllabusFieldRefs {
    readonly id: FieldRef<"CourseSyllabus", 'String'>
    readonly subject: FieldRef<"CourseSyllabus", 'String'>
    readonly grade: FieldRef<"CourseSyllabus", 'String'>
    readonly syllabus: FieldRef<"CourseSyllabus", 'String'>
    readonly topics: FieldRef<"CourseSyllabus", 'String'>
    readonly createdAt: FieldRef<"CourseSyllabus", 'DateTime'>
    readonly updatedAt: FieldRef<"CourseSyllabus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseSyllabus findUnique
   */
  export type CourseSyllabusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter, which CourseSyllabus to fetch.
     */
    where: CourseSyllabusWhereUniqueInput
  }

  /**
   * CourseSyllabus findUniqueOrThrow
   */
  export type CourseSyllabusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter, which CourseSyllabus to fetch.
     */
    where: CourseSyllabusWhereUniqueInput
  }

  /**
   * CourseSyllabus findFirst
   */
  export type CourseSyllabusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter, which CourseSyllabus to fetch.
     */
    where?: CourseSyllabusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseSyllabi to fetch.
     */
    orderBy?: CourseSyllabusOrderByWithRelationInput | CourseSyllabusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseSyllabi.
     */
    cursor?: CourseSyllabusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseSyllabi from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseSyllabi.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseSyllabi.
     */
    distinct?: CourseSyllabusScalarFieldEnum | CourseSyllabusScalarFieldEnum[]
  }

  /**
   * CourseSyllabus findFirstOrThrow
   */
  export type CourseSyllabusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter, which CourseSyllabus to fetch.
     */
    where?: CourseSyllabusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseSyllabi to fetch.
     */
    orderBy?: CourseSyllabusOrderByWithRelationInput | CourseSyllabusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseSyllabi.
     */
    cursor?: CourseSyllabusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseSyllabi from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseSyllabi.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseSyllabi.
     */
    distinct?: CourseSyllabusScalarFieldEnum | CourseSyllabusScalarFieldEnum[]
  }

  /**
   * CourseSyllabus findMany
   */
  export type CourseSyllabusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter, which CourseSyllabi to fetch.
     */
    where?: CourseSyllabusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseSyllabi to fetch.
     */
    orderBy?: CourseSyllabusOrderByWithRelationInput | CourseSyllabusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseSyllabi.
     */
    cursor?: CourseSyllabusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseSyllabi from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseSyllabi.
     */
    skip?: number
    distinct?: CourseSyllabusScalarFieldEnum | CourseSyllabusScalarFieldEnum[]
  }

  /**
   * CourseSyllabus create
   */
  export type CourseSyllabusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * The data needed to create a CourseSyllabus.
     */
    data: XOR<CourseSyllabusCreateInput, CourseSyllabusUncheckedCreateInput>
  }

  /**
   * CourseSyllabus createMany
   */
  export type CourseSyllabusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseSyllabi.
     */
    data: CourseSyllabusCreateManyInput | CourseSyllabusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseSyllabus createManyAndReturn
   */
  export type CourseSyllabusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CourseSyllabi.
     */
    data: CourseSyllabusCreateManyInput | CourseSyllabusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseSyllabus update
   */
  export type CourseSyllabusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * The data needed to update a CourseSyllabus.
     */
    data: XOR<CourseSyllabusUpdateInput, CourseSyllabusUncheckedUpdateInput>
    /**
     * Choose, which CourseSyllabus to update.
     */
    where: CourseSyllabusWhereUniqueInput
  }

  /**
   * CourseSyllabus updateMany
   */
  export type CourseSyllabusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseSyllabi.
     */
    data: XOR<CourseSyllabusUpdateManyMutationInput, CourseSyllabusUncheckedUpdateManyInput>
    /**
     * Filter which CourseSyllabi to update
     */
    where?: CourseSyllabusWhereInput
  }

  /**
   * CourseSyllabus upsert
   */
  export type CourseSyllabusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * The filter to search for the CourseSyllabus to update in case it exists.
     */
    where: CourseSyllabusWhereUniqueInput
    /**
     * In case the CourseSyllabus found by the `where` argument doesn't exist, create a new CourseSyllabus with this data.
     */
    create: XOR<CourseSyllabusCreateInput, CourseSyllabusUncheckedCreateInput>
    /**
     * In case the CourseSyllabus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseSyllabusUpdateInput, CourseSyllabusUncheckedUpdateInput>
  }

  /**
   * CourseSyllabus delete
   */
  export type CourseSyllabusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
    /**
     * Filter which CourseSyllabus to delete.
     */
    where: CourseSyllabusWhereUniqueInput
  }

  /**
   * CourseSyllabus deleteMany
   */
  export type CourseSyllabusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseSyllabi to delete
     */
    where?: CourseSyllabusWhereInput
  }

  /**
   * CourseSyllabus without action
   */
  export type CourseSyllabusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseSyllabus
     */
    select?: CourseSyllabusSelect<ExtArgs> | null
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


  export const QuestScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subject: 'subject',
    grade: 'grade',
    creatorId: 'creatorId',
    questions: 'questions',
    createdAt: 'createdAt'
  };

  export type QuestScalarFieldEnum = (typeof QuestScalarFieldEnum)[keyof typeof QuestScalarFieldEnum]


  export const ResultScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    questId: 'questId',
    score: 'score',
    mode: 'mode',
    date: 'date'
  };

  export type ResultScalarFieldEnum = (typeof ResultScalarFieldEnum)[keyof typeof ResultScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    xp: 'xp',
    coins: 'coins',
    isSubscribed: 'isSubscribed',
    isVerified: 'isVerified',
    verificationCode: 'verificationCode',
    stripeCustomerId: 'stripeCustomerId',
    subscriptionInterval: 'subscriptionInterval',
    subscriptionStartDate: 'subscriptionStartDate',
    subscriptionEndDate: 'subscriptionEndDate',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    questsPlayed: 'questsPlayed',
    questsCreated: 'questsCreated'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PendingUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    verificationCode: 'verificationCode',
    createdAt: 'createdAt'
  };

  export type PendingUserScalarFieldEnum = (typeof PendingUserScalarFieldEnum)[keyof typeof PendingUserScalarFieldEnum]


  export const QuestionBankScalarFieldEnum: {
    id: 'id',
    subject: 'subject',
    grade: 'grade',
    syllabus: 'syllabus',
    topic: 'topic',
    subtopic: 'subtopic',
    year: 'year',
    question: 'question',
    options: 'options',
    correctAnswer: 'correctAnswer',
    explanation: 'explanation',
    difficulty: 'difficulty',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type QuestionBankScalarFieldEnum = (typeof QuestionBankScalarFieldEnum)[keyof typeof QuestionBankScalarFieldEnum]


  export const CourseSyllabusScalarFieldEnum: {
    id: 'id',
    subject: 'subject',
    grade: 'grade',
    syllabus: 'syllabus',
    topics: 'topics',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseSyllabusScalarFieldEnum = (typeof CourseSyllabusScalarFieldEnum)[keyof typeof CourseSyllabusScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  export type QuestWhereInput = {
    AND?: QuestWhereInput | QuestWhereInput[]
    OR?: QuestWhereInput[]
    NOT?: QuestWhereInput | QuestWhereInput[]
    id?: StringFilter<"Quest"> | string
    title?: StringFilter<"Quest"> | string
    subject?: StringFilter<"Quest"> | string
    grade?: StringFilter<"Quest"> | string
    creatorId?: StringFilter<"Quest"> | string
    questions?: StringFilter<"Quest"> | string
    createdAt?: DateTimeFilter<"Quest"> | Date | string
    creator?: XOR<UserRelationFilter, UserWhereInput>
    results?: ResultListRelationFilter
  }

  export type QuestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    creatorId?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    results?: ResultOrderByRelationAggregateInput
  }

  export type QuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestWhereInput | QuestWhereInput[]
    OR?: QuestWhereInput[]
    NOT?: QuestWhereInput | QuestWhereInput[]
    title?: StringFilter<"Quest"> | string
    subject?: StringFilter<"Quest"> | string
    grade?: StringFilter<"Quest"> | string
    creatorId?: StringFilter<"Quest"> | string
    questions?: StringFilter<"Quest"> | string
    createdAt?: DateTimeFilter<"Quest"> | Date | string
    creator?: XOR<UserRelationFilter, UserWhereInput>
    results?: ResultListRelationFilter
  }, "id">

  export type QuestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    creatorId?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
    _count?: QuestCountOrderByAggregateInput
    _max?: QuestMaxOrderByAggregateInput
    _min?: QuestMinOrderByAggregateInput
  }

  export type QuestScalarWhereWithAggregatesInput = {
    AND?: QuestScalarWhereWithAggregatesInput | QuestScalarWhereWithAggregatesInput[]
    OR?: QuestScalarWhereWithAggregatesInput[]
    NOT?: QuestScalarWhereWithAggregatesInput | QuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quest"> | string
    title?: StringWithAggregatesFilter<"Quest"> | string
    subject?: StringWithAggregatesFilter<"Quest"> | string
    grade?: StringWithAggregatesFilter<"Quest"> | string
    creatorId?: StringWithAggregatesFilter<"Quest"> | string
    questions?: StringWithAggregatesFilter<"Quest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Quest"> | Date | string
  }

  export type ResultWhereInput = {
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    id?: StringFilter<"Result"> | string
    userId?: StringFilter<"Result"> | string
    questId?: StringNullableFilter<"Result"> | string | null
    score?: IntFilter<"Result"> | number
    mode?: StringFilter<"Result"> | string
    date?: DateTimeFilter<"Result"> | Date | string
    quest?: XOR<QuestNullableRelationFilter, QuestWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ResultOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrderInput | SortOrder
    score?: SortOrder
    mode?: SortOrder
    date?: SortOrder
    quest?: QuestOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    userId?: StringFilter<"Result"> | string
    questId?: StringNullableFilter<"Result"> | string | null
    score?: IntFilter<"Result"> | number
    mode?: StringFilter<"Result"> | string
    date?: DateTimeFilter<"Result"> | Date | string
    quest?: XOR<QuestNullableRelationFilter, QuestWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ResultOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrderInput | SortOrder
    score?: SortOrder
    mode?: SortOrder
    date?: SortOrder
    _count?: ResultCountOrderByAggregateInput
    _avg?: ResultAvgOrderByAggregateInput
    _max?: ResultMaxOrderByAggregateInput
    _min?: ResultMinOrderByAggregateInput
    _sum?: ResultSumOrderByAggregateInput
  }

  export type ResultScalarWhereWithAggregatesInput = {
    AND?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    OR?: ResultScalarWhereWithAggregatesInput[]
    NOT?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Result"> | string
    userId?: StringWithAggregatesFilter<"Result"> | string
    questId?: StringNullableWithAggregatesFilter<"Result"> | string | null
    score?: IntWithAggregatesFilter<"Result"> | number
    mode?: StringWithAggregatesFilter<"Result"> | string
    date?: DateTimeWithAggregatesFilter<"Result"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    xp?: IntFilter<"User"> | number
    coins?: IntFilter<"User"> | number
    isSubscribed?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    verificationCode?: StringNullableFilter<"User"> | string | null
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    subscriptionInterval?: StringNullableFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"User"> | boolean
    questsPlayed?: IntFilter<"User"> | number
    questsCreated?: IntFilter<"User"> | number
    quests?: QuestListRelationFilter
    results?: ResultListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    isSubscribed?: SortOrder
    isVerified?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionInterval?: SortOrderInput | SortOrder
    subscriptionStartDate?: SortOrderInput | SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
    quests?: QuestOrderByRelationAggregateInput
    results?: ResultOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    xp?: IntFilter<"User"> | number
    coins?: IntFilter<"User"> | number
    isSubscribed?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    verificationCode?: StringNullableFilter<"User"> | string | null
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    subscriptionInterval?: StringNullableFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"User"> | boolean
    questsPlayed?: IntFilter<"User"> | number
    questsCreated?: IntFilter<"User"> | number
    quests?: QuestListRelationFilter
    results?: ResultListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    isSubscribed?: SortOrder
    isVerified?: SortOrder
    verificationCode?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionInterval?: SortOrderInput | SortOrder
    subscriptionStartDate?: SortOrderInput | SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
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
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    xp?: IntWithAggregatesFilter<"User"> | number
    coins?: IntWithAggregatesFilter<"User"> | number
    isSubscribed?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionInterval?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"User"> | boolean
    questsPlayed?: IntWithAggregatesFilter<"User"> | number
    questsCreated?: IntWithAggregatesFilter<"User"> | number
  }

  export type PendingUserWhereInput = {
    AND?: PendingUserWhereInput | PendingUserWhereInput[]
    OR?: PendingUserWhereInput[]
    NOT?: PendingUserWhereInput | PendingUserWhereInput[]
    id?: StringFilter<"PendingUser"> | string
    email?: StringFilter<"PendingUser"> | string
    password?: StringFilter<"PendingUser"> | string
    name?: StringFilter<"PendingUser"> | string
    role?: StringFilter<"PendingUser"> | string
    verificationCode?: StringFilter<"PendingUser"> | string
    createdAt?: DateTimeFilter<"PendingUser"> | Date | string
  }

  export type PendingUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    verificationCode?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PendingUserWhereInput | PendingUserWhereInput[]
    OR?: PendingUserWhereInput[]
    NOT?: PendingUserWhereInput | PendingUserWhereInput[]
    password?: StringFilter<"PendingUser"> | string
    name?: StringFilter<"PendingUser"> | string
    role?: StringFilter<"PendingUser"> | string
    verificationCode?: StringFilter<"PendingUser"> | string
    createdAt?: DateTimeFilter<"PendingUser"> | Date | string
  }, "id" | "email">

  export type PendingUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    verificationCode?: SortOrder
    createdAt?: SortOrder
    _count?: PendingUserCountOrderByAggregateInput
    _max?: PendingUserMaxOrderByAggregateInput
    _min?: PendingUserMinOrderByAggregateInput
  }

  export type PendingUserScalarWhereWithAggregatesInput = {
    AND?: PendingUserScalarWhereWithAggregatesInput | PendingUserScalarWhereWithAggregatesInput[]
    OR?: PendingUserScalarWhereWithAggregatesInput[]
    NOT?: PendingUserScalarWhereWithAggregatesInput | PendingUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PendingUser"> | string
    email?: StringWithAggregatesFilter<"PendingUser"> | string
    password?: StringWithAggregatesFilter<"PendingUser"> | string
    name?: StringWithAggregatesFilter<"PendingUser"> | string
    role?: StringWithAggregatesFilter<"PendingUser"> | string
    verificationCode?: StringWithAggregatesFilter<"PendingUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PendingUser"> | Date | string
  }

  export type QuestionBankWhereInput = {
    AND?: QuestionBankWhereInput | QuestionBankWhereInput[]
    OR?: QuestionBankWhereInput[]
    NOT?: QuestionBankWhereInput | QuestionBankWhereInput[]
    id?: StringFilter<"QuestionBank"> | string
    subject?: StringFilter<"QuestionBank"> | string
    grade?: StringFilter<"QuestionBank"> | string
    syllabus?: StringFilter<"QuestionBank"> | string
    topic?: StringFilter<"QuestionBank"> | string
    subtopic?: StringNullableFilter<"QuestionBank"> | string | null
    year?: IntFilter<"QuestionBank"> | number
    question?: StringFilter<"QuestionBank"> | string
    options?: StringFilter<"QuestionBank"> | string
    correctAnswer?: StringFilter<"QuestionBank"> | string
    explanation?: StringFilter<"QuestionBank"> | string
    difficulty?: StringFilter<"QuestionBank"> | string
    source?: StringNullableFilter<"QuestionBank"> | string | null
    createdAt?: DateTimeFilter<"QuestionBank"> | Date | string
  }

  export type QuestionBankOrderByWithRelationInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topic?: SortOrder
    subtopic?: SortOrderInput | SortOrder
    year?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type QuestionBankWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionBankWhereInput | QuestionBankWhereInput[]
    OR?: QuestionBankWhereInput[]
    NOT?: QuestionBankWhereInput | QuestionBankWhereInput[]
    subject?: StringFilter<"QuestionBank"> | string
    grade?: StringFilter<"QuestionBank"> | string
    syllabus?: StringFilter<"QuestionBank"> | string
    topic?: StringFilter<"QuestionBank"> | string
    subtopic?: StringNullableFilter<"QuestionBank"> | string | null
    year?: IntFilter<"QuestionBank"> | number
    question?: StringFilter<"QuestionBank"> | string
    options?: StringFilter<"QuestionBank"> | string
    correctAnswer?: StringFilter<"QuestionBank"> | string
    explanation?: StringFilter<"QuestionBank"> | string
    difficulty?: StringFilter<"QuestionBank"> | string
    source?: StringNullableFilter<"QuestionBank"> | string | null
    createdAt?: DateTimeFilter<"QuestionBank"> | Date | string
  }, "id">

  export type QuestionBankOrderByWithAggregationInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topic?: SortOrder
    subtopic?: SortOrderInput | SortOrder
    year?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: QuestionBankCountOrderByAggregateInput
    _avg?: QuestionBankAvgOrderByAggregateInput
    _max?: QuestionBankMaxOrderByAggregateInput
    _min?: QuestionBankMinOrderByAggregateInput
    _sum?: QuestionBankSumOrderByAggregateInput
  }

  export type QuestionBankScalarWhereWithAggregatesInput = {
    AND?: QuestionBankScalarWhereWithAggregatesInput | QuestionBankScalarWhereWithAggregatesInput[]
    OR?: QuestionBankScalarWhereWithAggregatesInput[]
    NOT?: QuestionBankScalarWhereWithAggregatesInput | QuestionBankScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionBank"> | string
    subject?: StringWithAggregatesFilter<"QuestionBank"> | string
    grade?: StringWithAggregatesFilter<"QuestionBank"> | string
    syllabus?: StringWithAggregatesFilter<"QuestionBank"> | string
    topic?: StringWithAggregatesFilter<"QuestionBank"> | string
    subtopic?: StringNullableWithAggregatesFilter<"QuestionBank"> | string | null
    year?: IntWithAggregatesFilter<"QuestionBank"> | number
    question?: StringWithAggregatesFilter<"QuestionBank"> | string
    options?: StringWithAggregatesFilter<"QuestionBank"> | string
    correctAnswer?: StringWithAggregatesFilter<"QuestionBank"> | string
    explanation?: StringWithAggregatesFilter<"QuestionBank"> | string
    difficulty?: StringWithAggregatesFilter<"QuestionBank"> | string
    source?: StringNullableWithAggregatesFilter<"QuestionBank"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QuestionBank"> | Date | string
  }

  export type CourseSyllabusWhereInput = {
    AND?: CourseSyllabusWhereInput | CourseSyllabusWhereInput[]
    OR?: CourseSyllabusWhereInput[]
    NOT?: CourseSyllabusWhereInput | CourseSyllabusWhereInput[]
    id?: StringFilter<"CourseSyllabus"> | string
    subject?: StringFilter<"CourseSyllabus"> | string
    grade?: StringFilter<"CourseSyllabus"> | string
    syllabus?: StringFilter<"CourseSyllabus"> | string
    topics?: StringFilter<"CourseSyllabus"> | string
    createdAt?: DateTimeFilter<"CourseSyllabus"> | Date | string
    updatedAt?: DateTimeFilter<"CourseSyllabus"> | Date | string
  }

  export type CourseSyllabusOrderByWithRelationInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSyllabusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    subject_grade_syllabus?: CourseSyllabusSubjectGradeSyllabusCompoundUniqueInput
    AND?: CourseSyllabusWhereInput | CourseSyllabusWhereInput[]
    OR?: CourseSyllabusWhereInput[]
    NOT?: CourseSyllabusWhereInput | CourseSyllabusWhereInput[]
    subject?: StringFilter<"CourseSyllabus"> | string
    grade?: StringFilter<"CourseSyllabus"> | string
    syllabus?: StringFilter<"CourseSyllabus"> | string
    topics?: StringFilter<"CourseSyllabus"> | string
    createdAt?: DateTimeFilter<"CourseSyllabus"> | Date | string
    updatedAt?: DateTimeFilter<"CourseSyllabus"> | Date | string
  }, "id" | "subject_grade_syllabus">

  export type CourseSyllabusOrderByWithAggregationInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseSyllabusCountOrderByAggregateInput
    _max?: CourseSyllabusMaxOrderByAggregateInput
    _min?: CourseSyllabusMinOrderByAggregateInput
  }

  export type CourseSyllabusScalarWhereWithAggregatesInput = {
    AND?: CourseSyllabusScalarWhereWithAggregatesInput | CourseSyllabusScalarWhereWithAggregatesInput[]
    OR?: CourseSyllabusScalarWhereWithAggregatesInput[]
    NOT?: CourseSyllabusScalarWhereWithAggregatesInput | CourseSyllabusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseSyllabus"> | string
    subject?: StringWithAggregatesFilter<"CourseSyllabus"> | string
    grade?: StringWithAggregatesFilter<"CourseSyllabus"> | string
    syllabus?: StringWithAggregatesFilter<"CourseSyllabus"> | string
    topics?: StringWithAggregatesFilter<"CourseSyllabus"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CourseSyllabus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CourseSyllabus"> | Date | string
  }

  export type QuestCreateInput = {
    id?: string
    title: string
    subject: string
    grade: string
    questions: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutQuestsInput
    results?: ResultCreateNestedManyWithoutQuestInput
  }

  export type QuestUncheckedCreateInput = {
    id?: string
    title: string
    subject: string
    grade: string
    creatorId: string
    questions: string
    createdAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutQuestInput
  }

  export type QuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutQuestsNestedInput
    results?: ResultUpdateManyWithoutQuestNestedInput
  }

  export type QuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutQuestNestedInput
  }

  export type QuestCreateManyInput = {
    id?: string
    title: string
    subject: string
    grade: string
    creatorId: string
    questions: string
    createdAt?: Date | string
  }

  export type QuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultCreateInput = {
    id?: string
    score: number
    mode: string
    date?: Date | string
    quest?: QuestCreateNestedOneWithoutResultsInput
    user: UserCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateInput = {
    id?: string
    userId: string
    questId?: string | null
    score: number
    mode: string
    date?: Date | string
  }

  export type ResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    quest?: QuestUpdateOneWithoutResultsNestedInput
    user?: UserUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultCreateManyInput = {
    id?: string
    userId: string
    questId?: string | null
    score: number
    mode: string
    date?: Date | string
  }

  export type ResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    quests?: QuestCreateNestedManyWithoutCreatorInput
    results?: ResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    quests?: QuestUncheckedCreateNestedManyWithoutCreatorInput
    results?: ResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    quests?: QuestUpdateManyWithoutCreatorNestedInput
    results?: ResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    quests?: QuestUncheckedUpdateManyWithoutCreatorNestedInput
    results?: ResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
  }

  export type PendingUserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    verificationCode: string
    createdAt?: Date | string
  }

  export type PendingUserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    verificationCode: string
    createdAt?: Date | string
  }

  export type PendingUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingUserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    verificationCode: string
    createdAt?: Date | string
  }

  export type PendingUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionBankCreateInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topic: string
    subtopic?: string | null
    year: number
    question: string
    options: string
    correctAnswer: string
    explanation: string
    difficulty: string
    source?: string | null
    createdAt?: Date | string
  }

  export type QuestionBankUncheckedCreateInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topic: string
    subtopic?: string | null
    year: number
    question: string
    options: string
    correctAnswer: string
    explanation: string
    difficulty: string
    source?: string | null
    createdAt?: Date | string
  }

  export type QuestionBankUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    subtopic?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: StringFieldUpdateOperationsInput | string
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionBankUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    subtopic?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: StringFieldUpdateOperationsInput | string
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionBankCreateManyInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topic: string
    subtopic?: string | null
    year: number
    question: string
    options: string
    correctAnswer: string
    explanation: string
    difficulty: string
    source?: string | null
    createdAt?: Date | string
  }

  export type QuestionBankUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    subtopic?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: StringFieldUpdateOperationsInput | string
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionBankUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    subtopic?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: StringFieldUpdateOperationsInput | string
    correctAnswer?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseSyllabusCreateInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topics: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseSyllabusUncheckedCreateInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topics: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseSyllabusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseSyllabusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseSyllabusCreateManyInput = {
    id?: string
    subject: string
    grade: string
    syllabus: string
    topics: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseSyllabusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseSyllabusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    syllabus?: StringFieldUpdateOperationsInput | string
    topics?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ResultListRelationFilter = {
    every?: ResultWhereInput
    some?: ResultWhereInput
    none?: ResultWhereInput
  }

  export type ResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    creatorId?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    creatorId?: SortOrder
    questions?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    creatorId?: SortOrder
    questions?: SortOrder
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

  export type QuestNullableRelationFilter = {
    is?: QuestWhereInput | null
    isNot?: QuestWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResultCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    score?: SortOrder
    mode?: SortOrder
    date?: SortOrder
  }

  export type ResultAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ResultMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    score?: SortOrder
    mode?: SortOrder
    date?: SortOrder
  }

  export type ResultMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    score?: SortOrder
    mode?: SortOrder
    date?: SortOrder
  }

  export type ResultSumOrderByAggregateInput = {
    score?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type QuestListRelationFilter = {
    every?: QuestWhereInput
    some?: QuestWhereInput
    none?: QuestWhereInput
  }

  export type QuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    isSubscribed?: SortOrder
    isVerified?: SortOrder
    verificationCode?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionInterval?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    xp?: SortOrder
    coins?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    isSubscribed?: SortOrder
    isVerified?: SortOrder
    verificationCode?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionInterval?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    isSubscribed?: SortOrder
    isVerified?: SortOrder
    verificationCode?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionInterval?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    xp?: SortOrder
    coins?: SortOrder
    questsPlayed?: SortOrder
    questsCreated?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PendingUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    verificationCode?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    verificationCode?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    verificationCode?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionBankCountOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topic?: SortOrder
    subtopic?: SortOrder
    year?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionBankAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type QuestionBankMaxOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topic?: SortOrder
    subtopic?: SortOrder
    year?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionBankMinOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topic?: SortOrder
    subtopic?: SortOrder
    year?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correctAnswer?: SortOrder
    explanation?: SortOrder
    difficulty?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionBankSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type CourseSyllabusSubjectGradeSyllabusCompoundUniqueInput = {
    subject: string
    grade: string
    syllabus: string
  }

  export type CourseSyllabusCountOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSyllabusMaxOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSyllabusMinOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    grade?: SortOrder
    syllabus?: SortOrder
    topics?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutQuestsInput = {
    create?: XOR<UserCreateWithoutQuestsInput, UserUncheckedCreateWithoutQuestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestsInput
    connect?: UserWhereUniqueInput
  }

  export type ResultCreateNestedManyWithoutQuestInput = {
    create?: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput> | ResultCreateWithoutQuestInput[] | ResultUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestInput | ResultCreateOrConnectWithoutQuestInput[]
    createMany?: ResultCreateManyQuestInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type ResultUncheckedCreateNestedManyWithoutQuestInput = {
    create?: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput> | ResultCreateWithoutQuestInput[] | ResultUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestInput | ResultCreateOrConnectWithoutQuestInput[]
    createMany?: ResultCreateManyQuestInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutQuestsNestedInput = {
    create?: XOR<UserCreateWithoutQuestsInput, UserUncheckedCreateWithoutQuestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestsInput
    upsert?: UserUpsertWithoutQuestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestsInput, UserUpdateWithoutQuestsInput>, UserUncheckedUpdateWithoutQuestsInput>
  }

  export type ResultUpdateManyWithoutQuestNestedInput = {
    create?: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput> | ResultCreateWithoutQuestInput[] | ResultUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestInput | ResultCreateOrConnectWithoutQuestInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutQuestInput | ResultUpsertWithWhereUniqueWithoutQuestInput[]
    createMany?: ResultCreateManyQuestInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutQuestInput | ResultUpdateWithWhereUniqueWithoutQuestInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutQuestInput | ResultUpdateManyWithWhereWithoutQuestInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type ResultUncheckedUpdateManyWithoutQuestNestedInput = {
    create?: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput> | ResultCreateWithoutQuestInput[] | ResultUncheckedCreateWithoutQuestInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestInput | ResultCreateOrConnectWithoutQuestInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutQuestInput | ResultUpsertWithWhereUniqueWithoutQuestInput[]
    createMany?: ResultCreateManyQuestInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutQuestInput | ResultUpdateWithWhereUniqueWithoutQuestInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutQuestInput | ResultUpdateManyWithWhereWithoutQuestInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type QuestCreateNestedOneWithoutResultsInput = {
    create?: XOR<QuestCreateWithoutResultsInput, QuestUncheckedCreateWithoutResultsInput>
    connectOrCreate?: QuestCreateOrConnectWithoutResultsInput
    connect?: QuestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutResultsInput = {
    create?: XOR<UserCreateWithoutResultsInput, UserUncheckedCreateWithoutResultsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResultsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuestUpdateOneWithoutResultsNestedInput = {
    create?: XOR<QuestCreateWithoutResultsInput, QuestUncheckedCreateWithoutResultsInput>
    connectOrCreate?: QuestCreateOrConnectWithoutResultsInput
    upsert?: QuestUpsertWithoutResultsInput
    disconnect?: QuestWhereInput | boolean
    delete?: QuestWhereInput | boolean
    connect?: QuestWhereUniqueInput
    update?: XOR<XOR<QuestUpdateToOneWithWhereWithoutResultsInput, QuestUpdateWithoutResultsInput>, QuestUncheckedUpdateWithoutResultsInput>
  }

  export type UserUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<UserCreateWithoutResultsInput, UserUncheckedCreateWithoutResultsInput>
    connectOrCreate?: UserCreateOrConnectWithoutResultsInput
    upsert?: UserUpsertWithoutResultsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResultsInput, UserUpdateWithoutResultsInput>, UserUncheckedUpdateWithoutResultsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type QuestCreateNestedManyWithoutCreatorInput = {
    create?: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput> | QuestCreateWithoutCreatorInput[] | QuestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: QuestCreateOrConnectWithoutCreatorInput | QuestCreateOrConnectWithoutCreatorInput[]
    createMany?: QuestCreateManyCreatorInputEnvelope
    connect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
  }

  export type ResultCreateNestedManyWithoutUserInput = {
    create?: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput> | ResultCreateWithoutUserInput[] | ResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutUserInput | ResultCreateOrConnectWithoutUserInput[]
    createMany?: ResultCreateManyUserInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type QuestUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput> | QuestCreateWithoutCreatorInput[] | QuestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: QuestCreateOrConnectWithoutCreatorInput | QuestCreateOrConnectWithoutCreatorInput[]
    createMany?: QuestCreateManyCreatorInputEnvelope
    connect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
  }

  export type ResultUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput> | ResultCreateWithoutUserInput[] | ResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutUserInput | ResultCreateOrConnectWithoutUserInput[]
    createMany?: ResultCreateManyUserInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type QuestUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput> | QuestCreateWithoutCreatorInput[] | QuestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: QuestCreateOrConnectWithoutCreatorInput | QuestCreateOrConnectWithoutCreatorInput[]
    upsert?: QuestUpsertWithWhereUniqueWithoutCreatorInput | QuestUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: QuestCreateManyCreatorInputEnvelope
    set?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    disconnect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    delete?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    connect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    update?: QuestUpdateWithWhereUniqueWithoutCreatorInput | QuestUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: QuestUpdateManyWithWhereWithoutCreatorInput | QuestUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: QuestScalarWhereInput | QuestScalarWhereInput[]
  }

  export type ResultUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput> | ResultCreateWithoutUserInput[] | ResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutUserInput | ResultCreateOrConnectWithoutUserInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutUserInput | ResultUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResultCreateManyUserInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutUserInput | ResultUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutUserInput | ResultUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type QuestUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput> | QuestCreateWithoutCreatorInput[] | QuestUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: QuestCreateOrConnectWithoutCreatorInput | QuestCreateOrConnectWithoutCreatorInput[]
    upsert?: QuestUpsertWithWhereUniqueWithoutCreatorInput | QuestUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: QuestCreateManyCreatorInputEnvelope
    set?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    disconnect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    delete?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    connect?: QuestWhereUniqueInput | QuestWhereUniqueInput[]
    update?: QuestUpdateWithWhereUniqueWithoutCreatorInput | QuestUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: QuestUpdateManyWithWhereWithoutCreatorInput | QuestUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: QuestScalarWhereInput | QuestScalarWhereInput[]
  }

  export type ResultUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput> | ResultCreateWithoutUserInput[] | ResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutUserInput | ResultCreateOrConnectWithoutUserInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutUserInput | ResultUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResultCreateManyUserInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutUserInput | ResultUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutUserInput | ResultUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserCreateWithoutQuestsInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    results?: ResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestsInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    results?: ResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestsInput, UserUncheckedCreateWithoutQuestsInput>
  }

  export type ResultCreateWithoutQuestInput = {
    id?: string
    score: number
    mode: string
    date?: Date | string
    user: UserCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateWithoutQuestInput = {
    id?: string
    userId: string
    score: number
    mode: string
    date?: Date | string
  }

  export type ResultCreateOrConnectWithoutQuestInput = {
    where: ResultWhereUniqueInput
    create: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput>
  }

  export type ResultCreateManyQuestInputEnvelope = {
    data: ResultCreateManyQuestInput | ResultCreateManyQuestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutQuestsInput = {
    update: XOR<UserUpdateWithoutQuestsInput, UserUncheckedUpdateWithoutQuestsInput>
    create: XOR<UserCreateWithoutQuestsInput, UserUncheckedCreateWithoutQuestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestsInput, UserUncheckedUpdateWithoutQuestsInput>
  }

  export type UserUpdateWithoutQuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    results?: ResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    results?: ResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResultUpsertWithWhereUniqueWithoutQuestInput = {
    where: ResultWhereUniqueInput
    update: XOR<ResultUpdateWithoutQuestInput, ResultUncheckedUpdateWithoutQuestInput>
    create: XOR<ResultCreateWithoutQuestInput, ResultUncheckedCreateWithoutQuestInput>
  }

  export type ResultUpdateWithWhereUniqueWithoutQuestInput = {
    where: ResultWhereUniqueInput
    data: XOR<ResultUpdateWithoutQuestInput, ResultUncheckedUpdateWithoutQuestInput>
  }

  export type ResultUpdateManyWithWhereWithoutQuestInput = {
    where: ResultScalarWhereInput
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyWithoutQuestInput>
  }

  export type ResultScalarWhereInput = {
    AND?: ResultScalarWhereInput | ResultScalarWhereInput[]
    OR?: ResultScalarWhereInput[]
    NOT?: ResultScalarWhereInput | ResultScalarWhereInput[]
    id?: StringFilter<"Result"> | string
    userId?: StringFilter<"Result"> | string
    questId?: StringNullableFilter<"Result"> | string | null
    score?: IntFilter<"Result"> | number
    mode?: StringFilter<"Result"> | string
    date?: DateTimeFilter<"Result"> | Date | string
  }

  export type QuestCreateWithoutResultsInput = {
    id?: string
    title: string
    subject: string
    grade: string
    questions: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutQuestsInput
  }

  export type QuestUncheckedCreateWithoutResultsInput = {
    id?: string
    title: string
    subject: string
    grade: string
    creatorId: string
    questions: string
    createdAt?: Date | string
  }

  export type QuestCreateOrConnectWithoutResultsInput = {
    where: QuestWhereUniqueInput
    create: XOR<QuestCreateWithoutResultsInput, QuestUncheckedCreateWithoutResultsInput>
  }

  export type UserCreateWithoutResultsInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    quests?: QuestCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutResultsInput = {
    id?: string
    email: string
    password: string
    name: string
    role: string
    xp?: number
    coins?: number
    isSubscribed?: boolean
    isVerified?: boolean
    verificationCode?: string | null
    stripeCustomerId?: string | null
    subscriptionInterval?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    cancelAtPeriodEnd?: boolean
    questsPlayed?: number
    questsCreated?: number
    quests?: QuestUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutResultsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResultsInput, UserUncheckedCreateWithoutResultsInput>
  }

  export type QuestUpsertWithoutResultsInput = {
    update: XOR<QuestUpdateWithoutResultsInput, QuestUncheckedUpdateWithoutResultsInput>
    create: XOR<QuestCreateWithoutResultsInput, QuestUncheckedCreateWithoutResultsInput>
    where?: QuestWhereInput
  }

  export type QuestUpdateToOneWithWhereWithoutResultsInput = {
    where?: QuestWhereInput
    data: XOR<QuestUpdateWithoutResultsInput, QuestUncheckedUpdateWithoutResultsInput>
  }

  export type QuestUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutQuestsNestedInput
  }

  export type QuestUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    creatorId?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutResultsInput = {
    update: XOR<UserUpdateWithoutResultsInput, UserUncheckedUpdateWithoutResultsInput>
    create: XOR<UserCreateWithoutResultsInput, UserUncheckedCreateWithoutResultsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResultsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResultsInput, UserUncheckedUpdateWithoutResultsInput>
  }

  export type UserUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    quests?: QuestUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    isSubscribed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationCode?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionInterval?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    questsPlayed?: IntFieldUpdateOperationsInput | number
    questsCreated?: IntFieldUpdateOperationsInput | number
    quests?: QuestUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type QuestCreateWithoutCreatorInput = {
    id?: string
    title: string
    subject: string
    grade: string
    questions: string
    createdAt?: Date | string
    results?: ResultCreateNestedManyWithoutQuestInput
  }

  export type QuestUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    subject: string
    grade: string
    questions: string
    createdAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutQuestInput
  }

  export type QuestCreateOrConnectWithoutCreatorInput = {
    where: QuestWhereUniqueInput
    create: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput>
  }

  export type QuestCreateManyCreatorInputEnvelope = {
    data: QuestCreateManyCreatorInput | QuestCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ResultCreateWithoutUserInput = {
    id?: string
    score: number
    mode: string
    date?: Date | string
    quest?: QuestCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateWithoutUserInput = {
    id?: string
    questId?: string | null
    score: number
    mode: string
    date?: Date | string
  }

  export type ResultCreateOrConnectWithoutUserInput = {
    where: ResultWhereUniqueInput
    create: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput>
  }

  export type ResultCreateManyUserInputEnvelope = {
    data: ResultCreateManyUserInput | ResultCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QuestUpsertWithWhereUniqueWithoutCreatorInput = {
    where: QuestWhereUniqueInput
    update: XOR<QuestUpdateWithoutCreatorInput, QuestUncheckedUpdateWithoutCreatorInput>
    create: XOR<QuestCreateWithoutCreatorInput, QuestUncheckedCreateWithoutCreatorInput>
  }

  export type QuestUpdateWithWhereUniqueWithoutCreatorInput = {
    where: QuestWhereUniqueInput
    data: XOR<QuestUpdateWithoutCreatorInput, QuestUncheckedUpdateWithoutCreatorInput>
  }

  export type QuestUpdateManyWithWhereWithoutCreatorInput = {
    where: QuestScalarWhereInput
    data: XOR<QuestUpdateManyMutationInput, QuestUncheckedUpdateManyWithoutCreatorInput>
  }

  export type QuestScalarWhereInput = {
    AND?: QuestScalarWhereInput | QuestScalarWhereInput[]
    OR?: QuestScalarWhereInput[]
    NOT?: QuestScalarWhereInput | QuestScalarWhereInput[]
    id?: StringFilter<"Quest"> | string
    title?: StringFilter<"Quest"> | string
    subject?: StringFilter<"Quest"> | string
    grade?: StringFilter<"Quest"> | string
    creatorId?: StringFilter<"Quest"> | string
    questions?: StringFilter<"Quest"> | string
    createdAt?: DateTimeFilter<"Quest"> | Date | string
  }

  export type ResultUpsertWithWhereUniqueWithoutUserInput = {
    where: ResultWhereUniqueInput
    update: XOR<ResultUpdateWithoutUserInput, ResultUncheckedUpdateWithoutUserInput>
    create: XOR<ResultCreateWithoutUserInput, ResultUncheckedCreateWithoutUserInput>
  }

  export type ResultUpdateWithWhereUniqueWithoutUserInput = {
    where: ResultWhereUniqueInput
    data: XOR<ResultUpdateWithoutUserInput, ResultUncheckedUpdateWithoutUserInput>
  }

  export type ResultUpdateManyWithWhereWithoutUserInput = {
    where: ResultScalarWhereInput
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyWithoutUserInput>
  }

  export type ResultCreateManyQuestInput = {
    id?: string
    userId: string
    score: number
    mode: string
    date?: Date | string
  }

  export type ResultUpdateWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyWithoutQuestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestCreateManyCreatorInput = {
    id?: string
    title: string
    subject: string
    grade: string
    questions: string
    createdAt?: Date | string
  }

  export type ResultCreateManyUserInput = {
    id?: string
    questId?: string | null
    score: number
    mode: string
    date?: Date | string
  }

  export type QuestUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUpdateManyWithoutQuestNestedInput
  }

  export type QuestUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutQuestNestedInput
  }

  export type QuestUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    quest?: QuestUpdateOneWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use QuestCountOutputTypeDefaultArgs instead
     */
    export type QuestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestDefaultArgs instead
     */
    export type QuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResultDefaultArgs instead
     */
    export type ResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResultDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PendingUserDefaultArgs instead
     */
    export type PendingUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PendingUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionBankDefaultArgs instead
     */
    export type QuestionBankArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionBankDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseSyllabusDefaultArgs instead
     */
    export type CourseSyllabusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseSyllabusDefaultArgs<ExtArgs>

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