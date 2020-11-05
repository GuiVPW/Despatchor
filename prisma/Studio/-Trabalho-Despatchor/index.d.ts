import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.10.1
 * Query Engine version: 7d0087eadc7265e12d4b8d8c3516b02c4c965111
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

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
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
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
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
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
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.postsLike`: Exposes CRUD operations for the **PostsLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostsLikes
    * const postsLikes = await prisma.postsLike.findMany()
    * ```
    */
  get postsLike(): PostsLikeDelegate;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): CommentDelegate;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **Chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): ChatDelegate;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): MessageDelegate;

  /**
   * `prisma.chatOnUser`: Exposes CRUD operations for the **ChatOnUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatOnUsers
    * const chatOnUsers = await prisma.chatOnUser.findMany()
    * ```
    */
  get chatOnUser(): ChatOnUserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  avatarUrl: 'avatarUrl',
  bio: 'bio',
  verifiedEmail: 'verifiedEmail',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const PostDistinctFieldEnum: {
  id: 'id',
  title: 'title',
  description: 'description',
  published: 'published',
  authorId: 'authorId',
  postImageUrl: 'postImageUrl',
  likes: 'likes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type PostDistinctFieldEnum = (typeof PostDistinctFieldEnum)[keyof typeof PostDistinctFieldEnum]


export declare const PostsLikeDistinctFieldEnum: {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  createdAt: 'createdAt'
};

export declare type PostsLikeDistinctFieldEnum = (typeof PostsLikeDistinctFieldEnum)[keyof typeof PostsLikeDistinctFieldEnum]


export declare const CommentDistinctFieldEnum: {
  id: 'id',
  authorId: 'authorId',
  postId: 'postId',
  comment: 'comment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type CommentDistinctFieldEnum = (typeof CommentDistinctFieldEnum)[keyof typeof CommentDistinctFieldEnum]


export declare const ChatDistinctFieldEnum: {
  id: 'id'
};

export declare type ChatDistinctFieldEnum = (typeof ChatDistinctFieldEnum)[keyof typeof ChatDistinctFieldEnum]


export declare const MessageDistinctFieldEnum: {
  id: 'id',
  body: 'body',
  createdById: 'createdById',
  chatId: 'chatId',
  createdAt: 'createdAt'
};

export declare type MessageDistinctFieldEnum = (typeof MessageDistinctFieldEnum)[keyof typeof MessageDistinctFieldEnum]


export declare const ChatOnUserDistinctFieldEnum: {
  chatId: 'chatId',
  userId: 'userId'
};

export declare type ChatOnUserDistinctFieldEnum = (typeof ChatOnUserDistinctFieldEnum)[keyof typeof ChatOnUserDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model User
 */

export type User = {
  id: string
  email: string
  password: string
  name: string | null
  avatarUrl: string | null
  bio: string | null
  verifiedEmail: boolean
  updatedAt: Date
  createdAt: Date
}


export type AggregateUser = {
  count: number
}



export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type UserSelect = {
  id?: boolean
  email?: boolean
  password?: boolean
  name?: boolean
  avatarUrl?: boolean
  posts?: boolean | FindManyPostArgs
  comment?: boolean | FindManyCommentArgs
  bio?: boolean
  liked?: boolean | FindManyPostsLikeArgs
  verifiedEmail?: boolean
  updatedAt?: boolean
  createdAt?: boolean
  sentMessages?: boolean | FindManyMessageArgs
  chats?: boolean | FindManyChatOnUserArgs
}

export type UserInclude = {
  posts?: boolean | FindManyPostArgs
  comment?: boolean | FindManyCommentArgs
  liked?: boolean | FindManyPostsLikeArgs
  sentMessages?: boolean | FindManyMessageArgs
  chats?: boolean | FindManyChatOnUserArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'comment'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'liked'
      ? Array<PostsLikeGetPayload<S['include'][P]>> :
      P extends 'sentMessages'
      ? Array<MessageGetPayload<S['include'][P]>> :
      P extends 'chats'
      ? Array<ChatOnUserGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'comment'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'liked'
      ? Array<PostsLikeGetPayload<S['select'][P]>> :
      P extends 'sentMessages'
      ? Array<MessageGetPayload<S['select'][P]>> :
      P extends 'chats'
      ? Array<ChatOnUserGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
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
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
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
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
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
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  comment<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  liked<T extends FindManyPostsLikeArgs = {}>(args?: Subset<T, FindManyPostsLikeArgs>): CheckSelect<T, Promise<Array<PostsLike>>, Promise<Array<PostsLikeGetPayload<T>>>>;

  sentMessages<T extends FindManyMessageArgs = {}>(args?: Subset<T, FindManyMessageArgs>): CheckSelect<T, Promise<Array<Message>>, Promise<Array<MessageGetPayload<T>>>>;

  chats<T extends FindManyChatOnUserArgs = {}>(args?: Subset<T, FindManyChatOnUserArgs>): CheckSelect<T, Promise<Array<ChatOnUser>>, Promise<Array<ChatOnUserGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: string
  title: string
  description: string | null
  published: boolean
  authorId: string
  postImageUrl: string | null
  likes: number
  createdAt: Date
  updatedAt: Date
}


export type AggregatePost = {
  count: number
  avg: PostAvgAggregateOutputType | null
  sum: PostSumAggregateOutputType | null
  min: PostMinAggregateOutputType | null
  max: PostMaxAggregateOutputType | null
}

export type PostAvgAggregateOutputType = {
  likes: number
}

export type PostSumAggregateOutputType = {
  likes: number
}

export type PostMinAggregateOutputType = {
  likes: number
}

export type PostMaxAggregateOutputType = {
  likes: number
}


export type PostAvgAggregateInputType = {
  likes?: true
}

export type PostSumAggregateInputType = {
  likes?: true
}

export type PostMinAggregateInputType = {
  likes?: true
}

export type PostMaxAggregateInputType = {
  likes?: true
}

export type AggregatePostArgs = {
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
  count?: true
  avg?: PostAvgAggregateInputType
  sum?: PostSumAggregateInputType
  min?: PostMinAggregateInputType
  max?: PostMaxAggregateInputType
}

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
}

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
}
    
    

export type PostSelect = {
  id?: boolean
  title?: boolean
  description?: boolean
  published?: boolean
  authorId?: boolean
  author?: boolean | UserArgs
  postImageUrl?: boolean
  comment?: boolean | FindManyCommentArgs
  likes?: boolean
  likers?: boolean | FindManyPostsLikeArgs
  createdAt?: boolean
  updatedAt?: boolean
}

export type PostInclude = {
  author?: boolean | UserArgs
  comment?: boolean | FindManyCommentArgs
  likers?: boolean | FindManyPostsLikeArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'comment'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'likers'
      ? Array<PostsLikeGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'comment'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'likers'
      ? Array<PostsLikeGetPayload<S['select'][P]>> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post that matches the filter.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find the first Post that matches the filter.
   * @param {FindFirstPostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPostArgs>(
    args?: Subset<T, FindFirstPostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts that matches the filter.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  comment<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  likers<T extends FindManyPostsLikeArgs = {}>(args?: Subset<T, FindManyPostsLikeArgs>): CheckSelect<T, Promise<Array<PostsLike>>, Promise<Array<PostsLikeGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findFirst
 */
export type FindFirstPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Model PostsLike
 */

export type PostsLike = {
  id: string
  postId: string
  userId: string
  createdAt: Date
}


export type AggregatePostsLike = {
  count: number
}



export type AggregatePostsLikeArgs = {
  where?: PostsLikeWhereInput
  orderBy?: Enumerable<PostsLikeOrderByInput> | PostsLikeOrderByInput
  cursor?: PostsLikeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostsLikeDistinctFieldEnum>
  count?: true
}

export type GetPostsLikeAggregateType<T extends AggregatePostsLikeArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type PostsLikeSelect = {
  id?: boolean
  postId?: boolean
  post?: boolean | PostArgs
  userId?: boolean
  user?: boolean | UserArgs
  createdAt?: boolean
}

export type PostsLikeInclude = {
  post?: boolean | PostArgs
  user?: boolean | UserArgs
}

export type PostsLikeGetPayload<
  S extends boolean | null | undefined | PostsLikeArgs,
  U = keyof S
> = S extends true
  ? PostsLike
  : S extends undefined
  ? never
  : S extends PostsLikeArgs | FindManyPostsLikeArgs
  ? 'include' extends U
    ? PostsLike  & {
      [P in TrueKeys<S['include']>]:
      P extends 'post'
      ? PostGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof PostsLike ? PostsLike[P]
: 
      P extends 'post'
      ? PostGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : PostsLike
: PostsLike


export interface PostsLikeDelegate {
  /**
   * Find zero or one PostsLike that matches the filter.
   * @param {FindOnePostsLikeArgs} args - Arguments to find a PostsLike
   * @example
   * // Get one PostsLike
   * const postsLike = await prisma.postsLike.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostsLikeArgs>(
    args: Subset<T, FindOnePostsLikeArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike | null>, Prisma__PostsLikeClient<PostsLikeGetPayload<T> | null>>
  /**
   * Find the first PostsLike that matches the filter.
   * @param {FindFirstPostsLikeArgs} args - Arguments to find a PostsLike
   * @example
   * // Get one PostsLike
   * const postsLike = await prisma.postsLike.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPostsLikeArgs>(
    args?: Subset<T, FindFirstPostsLikeArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike | null>, Prisma__PostsLikeClient<PostsLikeGetPayload<T> | null>>
  /**
   * Find zero or more PostsLikes that matches the filter.
   * @param {FindManyPostsLikeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all PostsLikes
   * const postsLikes = await prisma.postsLike.findMany()
   * 
   * // Get first 10 PostsLikes
   * const postsLikes = await prisma.postsLike.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postsLikeWithIdOnly = await prisma.postsLike.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostsLikeArgs>(
    args?: Subset<T, FindManyPostsLikeArgs>
  ): CheckSelect<T, Promise<Array<PostsLike>>, Promise<Array<PostsLikeGetPayload<T>>>>
  /**
   * Create a PostsLike.
   * @param {PostsLikeCreateArgs} args - Arguments to create a PostsLike.
   * @example
   * // Create one PostsLike
   * const PostsLike = await prisma.postsLike.create({
   *   data: {
   *     // ... data to create a PostsLike
   *   }
   * })
   * 
  **/
  create<T extends PostsLikeCreateArgs>(
    args: Subset<T, PostsLikeCreateArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike>, Prisma__PostsLikeClient<PostsLikeGetPayload<T>>>
  /**
   * Delete a PostsLike.
   * @param {PostsLikeDeleteArgs} args - Arguments to delete one PostsLike.
   * @example
   * // Delete one PostsLike
   * const PostsLike = await prisma.postsLike.delete({
   *   where: {
   *     // ... filter to delete one PostsLike
   *   }
   * })
   * 
  **/
  delete<T extends PostsLikeDeleteArgs>(
    args: Subset<T, PostsLikeDeleteArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike>, Prisma__PostsLikeClient<PostsLikeGetPayload<T>>>
  /**
   * Update one PostsLike.
   * @param {PostsLikeUpdateArgs} args - Arguments to update one PostsLike.
   * @example
   * // Update one PostsLike
   * const postsLike = await prisma.postsLike.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostsLikeUpdateArgs>(
    args: Subset<T, PostsLikeUpdateArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike>, Prisma__PostsLikeClient<PostsLikeGetPayload<T>>>
  /**
   * Delete zero or more PostsLikes.
   * @param {PostsLikeDeleteManyArgs} args - Arguments to filter PostsLikes to delete.
   * @example
   * // Delete a few PostsLikes
   * const { count } = await prisma.postsLike.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostsLikeDeleteManyArgs>(
    args: Subset<T, PostsLikeDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more PostsLikes.
   * @param {PostsLikeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many PostsLikes
   * const postsLike = await prisma.postsLike.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostsLikeUpdateManyArgs>(
    args: Subset<T, PostsLikeUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one PostsLike.
   * @param {PostsLikeUpsertArgs} args - Arguments to update or create a PostsLike.
   * @example
   * // Update or create a PostsLike
   * const postsLike = await prisma.postsLike.upsert({
   *   create: {
   *     // ... data to create a PostsLike
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the PostsLike we want to update
   *   }
   * })
  **/
  upsert<T extends PostsLikeUpsertArgs>(
    args: Subset<T, PostsLikeUpsertArgs>
  ): CheckSelect<T, Prisma__PostsLikeClient<PostsLike>, Prisma__PostsLikeClient<PostsLikeGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostsLikeArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostsLikeArgs>(args: Subset<T, AggregatePostsLikeArgs>): Promise<GetPostsLikeAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for PostsLike.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostsLikeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * PostsLike findOne
 */
export type FindOnePostsLikeArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * Filter, which PostsLike to fetch.
  **/
  where: PostsLikeWhereUniqueInput
}


/**
 * PostsLike findFirst
 */
export type FindFirstPostsLikeArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * Filter, which PostsLike to fetch.
  **/
  where?: PostsLikeWhereInput
  orderBy?: Enumerable<PostsLikeOrderByInput> | PostsLikeOrderByInput
  cursor?: PostsLikeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostsLikeDistinctFieldEnum>
}


/**
 * PostsLike findMany
 */
export type FindManyPostsLikeArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * Filter, which PostsLikes to fetch.
  **/
  where?: PostsLikeWhereInput
  /**
   * Determine the order of the PostsLikes to fetch.
  **/
  orderBy?: Enumerable<PostsLikeOrderByInput> | PostsLikeOrderByInput
  /**
   * Sets the position for listing PostsLikes.
  **/
  cursor?: PostsLikeWhereUniqueInput
  /**
   * The number of PostsLikes to fetch. If negative number, it will take PostsLikes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` PostsLikes.
  **/
  skip?: number
  distinct?: Enumerable<PostsLikeDistinctFieldEnum>
}


/**
 * PostsLike create
 */
export type PostsLikeCreateArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * The data needed to create a PostsLike.
  **/
  data: PostsLikeCreateInput
}


/**
 * PostsLike update
 */
export type PostsLikeUpdateArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * The data needed to update a PostsLike.
  **/
  data: PostsLikeUpdateInput
  /**
   * Choose, which PostsLike to update.
  **/
  where: PostsLikeWhereUniqueInput
}


/**
 * PostsLike updateMany
 */
export type PostsLikeUpdateManyArgs = {
  data: PostsLikeUpdateManyMutationInput
  where?: PostsLikeWhereInput
}


/**
 * PostsLike upsert
 */
export type PostsLikeUpsertArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * The filter to search for the PostsLike to update in case it exists.
  **/
  where: PostsLikeWhereUniqueInput
  /**
   * In case the PostsLike found by the `where` argument doesn't exist, create a new PostsLike with this data.
  **/
  create: PostsLikeCreateInput
  /**
   * In case the PostsLike was found with the provided `where` argument, update it with this data.
  **/
  update: PostsLikeUpdateInput
}


/**
 * PostsLike delete
 */
export type PostsLikeDeleteArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
  /**
   * Filter which PostsLike to delete.
  **/
  where: PostsLikeWhereUniqueInput
}


/**
 * PostsLike deleteMany
 */
export type PostsLikeDeleteManyArgs = {
  where?: PostsLikeWhereInput
}


/**
 * PostsLike without action
 */
export type PostsLikeArgs = {
  /**
   * Select specific fields to fetch from the PostsLike
  **/
  select?: PostsLikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostsLikeInclude | null
}



/**
 * Model Comment
 */

export type Comment = {
  id: string
  authorId: string
  postId: string
  comment: string
  createdAt: Date
  updatedAt: Date
}


export type AggregateComment = {
  count: number
}



export type AggregateCommentArgs = {
  where?: CommentWhereInput
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
  count?: true
}

export type GetCommentAggregateType<T extends AggregateCommentArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type CommentSelect = {
  id?: boolean
  author?: boolean | UserArgs
  authorId?: boolean
  post?: boolean | PostArgs
  postId?: boolean
  comment?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type CommentInclude = {
  author?: boolean | UserArgs
  post?: boolean | PostArgs
}

export type CommentGetPayload<
  S extends boolean | null | undefined | CommentArgs,
  U = keyof S
> = S extends true
  ? Comment
  : S extends undefined
  ? never
  : S extends CommentArgs | FindManyCommentArgs
  ? 'include' extends U
    ? Comment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> :
      P extends 'post'
      ? PostGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Comment ? Comment[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> :
      P extends 'post'
      ? PostGetPayload<S['select'][P]> : never
    }
  : Comment
: Comment


export interface CommentDelegate {
  /**
   * Find zero or one Comment that matches the filter.
   * @param {FindOneCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCommentArgs>(
    args: Subset<T, FindOneCommentArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find the first Comment that matches the filter.
   * @param {FindFirstCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCommentArgs>(
    args?: Subset<T, FindFirstCommentArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find zero or more Comments that matches the filter.
   * @param {FindManyCommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comments
   * const comments = await prisma.comment.findMany()
   * 
   * // Get first 10 Comments
   * const comments = await prisma.comment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCommentArgs>(
    args?: Subset<T, FindManyCommentArgs>
  ): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>
  /**
   * Create a Comment.
   * @param {CommentCreateArgs} args - Arguments to create a Comment.
   * @example
   * // Create one Comment
   * const Comment = await prisma.comment.create({
   *   data: {
   *     // ... data to create a Comment
   *   }
   * })
   * 
  **/
  create<T extends CommentCreateArgs>(
    args: Subset<T, CommentCreateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete a Comment.
   * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
   * @example
   * // Delete one Comment
   * const Comment = await prisma.comment.delete({
   *   where: {
   *     // ... filter to delete one Comment
   *   }
   * })
   * 
  **/
  delete<T extends CommentDeleteArgs>(
    args: Subset<T, CommentDeleteArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Update one Comment.
   * @param {CommentUpdateArgs} args - Arguments to update one Comment.
   * @example
   * // Update one Comment
   * const comment = await prisma.comment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CommentUpdateArgs>(
    args: Subset<T, CommentUpdateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete zero or more Comments.
   * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
   * @example
   * // Delete a few Comments
   * const { count } = await prisma.comment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CommentDeleteManyArgs>(
    args: Subset<T, CommentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comments.
   * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comments
   * const comment = await prisma.comment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CommentUpdateManyArgs>(
    args: Subset<T, CommentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment.
   * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
   * @example
   * // Update or create a Comment
   * const comment = await prisma.comment.upsert({
   *   create: {
   *     // ... data to create a Comment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment we want to update
   *   }
   * })
  **/
  upsert<T extends CommentUpsertArgs>(
    args: Subset<T, CommentUpsertArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCommentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCommentArgs>(args: Subset<T, AggregateCommentArgs>): Promise<GetCommentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Comment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CommentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Comment findOne
 */
export type FindOneCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment findFirst
 */
export type FindFirstCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where?: CommentWhereInput
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
}


/**
 * Comment findMany
 */
export type FindManyCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comments to fetch.
  **/
  where?: CommentWhereInput
  /**
   * Determine the order of the Comments to fetch.
  **/
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  /**
   * Sets the position for listing Comments.
  **/
  cursor?: CommentWhereUniqueInput
  /**
   * The number of Comments to fetch. If negative number, it will take Comments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Comments.
  **/
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
}


/**
 * Comment create
 */
export type CommentCreateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to create a Comment.
  **/
  data: CommentCreateInput
}


/**
 * Comment update
 */
export type CommentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to update a Comment.
  **/
  data: CommentUpdateInput
  /**
   * Choose, which Comment to update.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment updateMany
 */
export type CommentUpdateManyArgs = {
  data: CommentUpdateManyMutationInput
  where?: CommentWhereInput
}


/**
 * Comment upsert
 */
export type CommentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The filter to search for the Comment to update in case it exists.
  **/
  where: CommentWhereUniqueInput
  /**
   * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
  **/
  create: CommentCreateInput
  /**
   * In case the Comment was found with the provided `where` argument, update it with this data.
  **/
  update: CommentUpdateInput
}


/**
 * Comment delete
 */
export type CommentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter which Comment to delete.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment deleteMany
 */
export type CommentDeleteManyArgs = {
  where?: CommentWhereInput
}


/**
 * Comment without action
 */
export type CommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
}



/**
 * Model Chat
 */

export type Chat = {
  id: string
}


export type AggregateChat = {
  count: number
}



export type AggregateChatArgs = {
  where?: ChatWhereInput
  orderBy?: Enumerable<ChatOrderByInput> | ChatOrderByInput
  cursor?: ChatWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChatDistinctFieldEnum>
  count?: true
}

export type GetChatAggregateType<T extends AggregateChatArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type ChatSelect = {
  id?: boolean
  users?: boolean | FindManyChatOnUserArgs
  messages?: boolean | FindManyMessageArgs
}

export type ChatInclude = {
  users?: boolean | FindManyChatOnUserArgs
  messages?: boolean | FindManyMessageArgs
}

export type ChatGetPayload<
  S extends boolean | null | undefined | ChatArgs,
  U = keyof S
> = S extends true
  ? Chat
  : S extends undefined
  ? never
  : S extends ChatArgs | FindManyChatArgs
  ? 'include' extends U
    ? Chat  & {
      [P in TrueKeys<S['include']>]:
      P extends 'users'
      ? Array<ChatOnUserGetPayload<S['include'][P]>> :
      P extends 'messages'
      ? Array<MessageGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Chat ? Chat[P]
: 
      P extends 'users'
      ? Array<ChatOnUserGetPayload<S['select'][P]>> :
      P extends 'messages'
      ? Array<MessageGetPayload<S['select'][P]>> : never
    }
  : Chat
: Chat


export interface ChatDelegate {
  /**
   * Find zero or one Chat that matches the filter.
   * @param {FindOneChatArgs} args - Arguments to find a Chat
   * @example
   * // Get one Chat
   * const chat = await prisma.chat.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneChatArgs>(
    args: Subset<T, FindOneChatArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat | null>, Prisma__ChatClient<ChatGetPayload<T> | null>>
  /**
   * Find the first Chat that matches the filter.
   * @param {FindFirstChatArgs} args - Arguments to find a Chat
   * @example
   * // Get one Chat
   * const chat = await prisma.chat.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstChatArgs>(
    args?: Subset<T, FindFirstChatArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat | null>, Prisma__ChatClient<ChatGetPayload<T> | null>>
  /**
   * Find zero or more Chats that matches the filter.
   * @param {FindManyChatArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Chats
   * const chats = await prisma.chat.findMany()
   * 
   * // Get first 10 Chats
   * const chats = await prisma.chat.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyChatArgs>(
    args?: Subset<T, FindManyChatArgs>
  ): CheckSelect<T, Promise<Array<Chat>>, Promise<Array<ChatGetPayload<T>>>>
  /**
   * Create a Chat.
   * @param {ChatCreateArgs} args - Arguments to create a Chat.
   * @example
   * // Create one Chat
   * const Chat = await prisma.chat.create({
   *   data: {
   *     // ... data to create a Chat
   *   }
   * })
   * 
  **/
  create<T extends ChatCreateArgs>(
    args: Subset<T, ChatCreateArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat>, Prisma__ChatClient<ChatGetPayload<T>>>
  /**
   * Delete a Chat.
   * @param {ChatDeleteArgs} args - Arguments to delete one Chat.
   * @example
   * // Delete one Chat
   * const Chat = await prisma.chat.delete({
   *   where: {
   *     // ... filter to delete one Chat
   *   }
   * })
   * 
  **/
  delete<T extends ChatDeleteArgs>(
    args: Subset<T, ChatDeleteArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat>, Prisma__ChatClient<ChatGetPayload<T>>>
  /**
   * Update one Chat.
   * @param {ChatUpdateArgs} args - Arguments to update one Chat.
   * @example
   * // Update one Chat
   * const chat = await prisma.chat.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ChatUpdateArgs>(
    args: Subset<T, ChatUpdateArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat>, Prisma__ChatClient<ChatGetPayload<T>>>
  /**
   * Delete zero or more Chats.
   * @param {ChatDeleteManyArgs} args - Arguments to filter Chats to delete.
   * @example
   * // Delete a few Chats
   * const { count } = await prisma.chat.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ChatDeleteManyArgs>(
    args: Subset<T, ChatDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Chats.
   * @param {ChatUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Chats
   * const chat = await prisma.chat.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ChatUpdateManyArgs>(
    args: Subset<T, ChatUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Chat.
   * @param {ChatUpsertArgs} args - Arguments to update or create a Chat.
   * @example
   * // Update or create a Chat
   * const chat = await prisma.chat.upsert({
   *   create: {
   *     // ... data to create a Chat
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Chat we want to update
   *   }
   * })
  **/
  upsert<T extends ChatUpsertArgs>(
    args: Subset<T, ChatUpsertArgs>
  ): CheckSelect<T, Prisma__ChatClient<Chat>, Prisma__ChatClient<ChatGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyChatArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateChatArgs>(args: Subset<T, AggregateChatArgs>): Promise<GetChatAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Chat.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ChatClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  users<T extends FindManyChatOnUserArgs = {}>(args?: Subset<T, FindManyChatOnUserArgs>): CheckSelect<T, Promise<Array<ChatOnUser>>, Promise<Array<ChatOnUserGetPayload<T>>>>;

  messages<T extends FindManyMessageArgs = {}>(args?: Subset<T, FindManyMessageArgs>): CheckSelect<T, Promise<Array<Message>>, Promise<Array<MessageGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Chat findOne
 */
export type FindOneChatArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * Filter, which Chat to fetch.
  **/
  where: ChatWhereUniqueInput
}


/**
 * Chat findFirst
 */
export type FindFirstChatArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * Filter, which Chat to fetch.
  **/
  where?: ChatWhereInput
  orderBy?: Enumerable<ChatOrderByInput> | ChatOrderByInput
  cursor?: ChatWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChatDistinctFieldEnum>
}


/**
 * Chat findMany
 */
export type FindManyChatArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * Filter, which Chats to fetch.
  **/
  where?: ChatWhereInput
  /**
   * Determine the order of the Chats to fetch.
  **/
  orderBy?: Enumerable<ChatOrderByInput> | ChatOrderByInput
  /**
   * Sets the position for listing Chats.
  **/
  cursor?: ChatWhereUniqueInput
  /**
   * The number of Chats to fetch. If negative number, it will take Chats before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Chats.
  **/
  skip?: number
  distinct?: Enumerable<ChatDistinctFieldEnum>
}


/**
 * Chat create
 */
export type ChatCreateArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * The data needed to create a Chat.
  **/
  data: ChatCreateInput
}


/**
 * Chat update
 */
export type ChatUpdateArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * The data needed to update a Chat.
  **/
  data: ChatUpdateInput
  /**
   * Choose, which Chat to update.
  **/
  where: ChatWhereUniqueInput
}


/**
 * Chat updateMany
 */
export type ChatUpdateManyArgs = {
  data: ChatUpdateManyMutationInput
  where?: ChatWhereInput
}


/**
 * Chat upsert
 */
export type ChatUpsertArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * The filter to search for the Chat to update in case it exists.
  **/
  where: ChatWhereUniqueInput
  /**
   * In case the Chat found by the `where` argument doesn't exist, create a new Chat with this data.
  **/
  create: ChatCreateInput
  /**
   * In case the Chat was found with the provided `where` argument, update it with this data.
  **/
  update: ChatUpdateInput
}


/**
 * Chat delete
 */
export type ChatDeleteArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
  /**
   * Filter which Chat to delete.
  **/
  where: ChatWhereUniqueInput
}


/**
 * Chat deleteMany
 */
export type ChatDeleteManyArgs = {
  where?: ChatWhereInput
}


/**
 * Chat without action
 */
export type ChatArgs = {
  /**
   * Select specific fields to fetch from the Chat
  **/
  select?: ChatSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatInclude | null
}



/**
 * Model Message
 */

export type Message = {
  id: string
  body: string
  createdById: string
  chatId: string
  createdAt: Date
}


export type AggregateMessage = {
  count: number
}



export type AggregateMessageArgs = {
  where?: MessageWhereInput
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  cursor?: MessageWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
  count?: true
}

export type GetMessageAggregateType<T extends AggregateMessageArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type MessageSelect = {
  id?: boolean
  body?: boolean
  createdBy?: boolean | UserArgs
  createdById?: boolean
  chat?: boolean | ChatArgs
  chatId?: boolean
  createdAt?: boolean
}

export type MessageInclude = {
  createdBy?: boolean | UserArgs
  chat?: boolean | ChatArgs
}

export type MessageGetPayload<
  S extends boolean | null | undefined | MessageArgs,
  U = keyof S
> = S extends true
  ? Message
  : S extends undefined
  ? never
  : S extends MessageArgs | FindManyMessageArgs
  ? 'include' extends U
    ? Message  & {
      [P in TrueKeys<S['include']>]:
      P extends 'createdBy'
      ? UserGetPayload<S['include'][P]> :
      P extends 'chat'
      ? ChatGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Message ? Message[P]
: 
      P extends 'createdBy'
      ? UserGetPayload<S['select'][P]> :
      P extends 'chat'
      ? ChatGetPayload<S['select'][P]> : never
    }
  : Message
: Message


export interface MessageDelegate {
  /**
   * Find zero or one Message that matches the filter.
   * @param {FindOneMessageArgs} args - Arguments to find a Message
   * @example
   * // Get one Message
   * const message = await prisma.message.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneMessageArgs>(
    args: Subset<T, FindOneMessageArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message | null>, Prisma__MessageClient<MessageGetPayload<T> | null>>
  /**
   * Find the first Message that matches the filter.
   * @param {FindFirstMessageArgs} args - Arguments to find a Message
   * @example
   * // Get one Message
   * const message = await prisma.message.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstMessageArgs>(
    args?: Subset<T, FindFirstMessageArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message | null>, Prisma__MessageClient<MessageGetPayload<T> | null>>
  /**
   * Find zero or more Messages that matches the filter.
   * @param {FindManyMessageArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Messages
   * const messages = await prisma.message.findMany()
   * 
   * // Get first 10 Messages
   * const messages = await prisma.message.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyMessageArgs>(
    args?: Subset<T, FindManyMessageArgs>
  ): CheckSelect<T, Promise<Array<Message>>, Promise<Array<MessageGetPayload<T>>>>
  /**
   * Create a Message.
   * @param {MessageCreateArgs} args - Arguments to create a Message.
   * @example
   * // Create one Message
   * const Message = await prisma.message.create({
   *   data: {
   *     // ... data to create a Message
   *   }
   * })
   * 
  **/
  create<T extends MessageCreateArgs>(
    args: Subset<T, MessageCreateArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Delete a Message.
   * @param {MessageDeleteArgs} args - Arguments to delete one Message.
   * @example
   * // Delete one Message
   * const Message = await prisma.message.delete({
   *   where: {
   *     // ... filter to delete one Message
   *   }
   * })
   * 
  **/
  delete<T extends MessageDeleteArgs>(
    args: Subset<T, MessageDeleteArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Update one Message.
   * @param {MessageUpdateArgs} args - Arguments to update one Message.
   * @example
   * // Update one Message
   * const message = await prisma.message.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends MessageUpdateArgs>(
    args: Subset<T, MessageUpdateArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Delete zero or more Messages.
   * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
   * @example
   * // Delete a few Messages
   * const { count } = await prisma.message.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends MessageDeleteManyArgs>(
    args: Subset<T, MessageDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Messages.
   * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Messages
   * const message = await prisma.message.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends MessageUpdateManyArgs>(
    args: Subset<T, MessageUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Message.
   * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
   * @example
   * // Update or create a Message
   * const message = await prisma.message.upsert({
   *   create: {
   *     // ... data to create a Message
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Message we want to update
   *   }
   * })
  **/
  upsert<T extends MessageUpsertArgs>(
    args: Subset<T, MessageUpsertArgs>
  ): CheckSelect<T, Prisma__MessageClient<Message>, Prisma__MessageClient<MessageGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyMessageArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMessageArgs>(args: Subset<T, AggregateMessageArgs>): Promise<GetMessageAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Message.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__MessageClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  createdBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  chat<T extends ChatArgs = {}>(args?: Subset<T, ChatArgs>): CheckSelect<T, Prisma__ChatClient<Chat | null>, Prisma__ChatClient<ChatGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Message findOne
 */
export type FindOneMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Message to fetch.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message findFirst
 */
export type FindFirstMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Message to fetch.
  **/
  where?: MessageWhereInput
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  cursor?: MessageWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
}


/**
 * Message findMany
 */
export type FindManyMessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter, which Messages to fetch.
  **/
  where?: MessageWhereInput
  /**
   * Determine the order of the Messages to fetch.
  **/
  orderBy?: Enumerable<MessageOrderByInput> | MessageOrderByInput
  /**
   * Sets the position for listing Messages.
  **/
  cursor?: MessageWhereUniqueInput
  /**
   * The number of Messages to fetch. If negative number, it will take Messages before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Messages.
  **/
  skip?: number
  distinct?: Enumerable<MessageDistinctFieldEnum>
}


/**
 * Message create
 */
export type MessageCreateArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The data needed to create a Message.
  **/
  data: MessageCreateInput
}


/**
 * Message update
 */
export type MessageUpdateArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The data needed to update a Message.
  **/
  data: MessageUpdateInput
  /**
   * Choose, which Message to update.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message updateMany
 */
export type MessageUpdateManyArgs = {
  data: MessageUpdateManyMutationInput
  where?: MessageWhereInput
}


/**
 * Message upsert
 */
export type MessageUpsertArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * The filter to search for the Message to update in case it exists.
  **/
  where: MessageWhereUniqueInput
  /**
   * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
  **/
  create: MessageCreateInput
  /**
   * In case the Message was found with the provided `where` argument, update it with this data.
  **/
  update: MessageUpdateInput
}


/**
 * Message delete
 */
export type MessageDeleteArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
  /**
   * Filter which Message to delete.
  **/
  where: MessageWhereUniqueInput
}


/**
 * Message deleteMany
 */
export type MessageDeleteManyArgs = {
  where?: MessageWhereInput
}


/**
 * Message without action
 */
export type MessageArgs = {
  /**
   * Select specific fields to fetch from the Message
  **/
  select?: MessageSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: MessageInclude | null
}



/**
 * Model ChatOnUser
 */

export type ChatOnUser = {
  chatId: string
  userId: string
}


export type AggregateChatOnUser = {
  count: number
}



export type AggregateChatOnUserArgs = {
  where?: ChatOnUserWhereInput
  orderBy?: Enumerable<ChatOnUserOrderByInput> | ChatOnUserOrderByInput
  cursor?: ChatOnUserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChatOnUserDistinctFieldEnum>
  count?: true
}

export type GetChatOnUserAggregateType<T extends AggregateChatOnUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type ChatOnUserSelect = {
  chat?: boolean | ChatArgs
  chatId?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type ChatOnUserInclude = {
  chat?: boolean | ChatArgs
  user?: boolean | UserArgs
}

export type ChatOnUserGetPayload<
  S extends boolean | null | undefined | ChatOnUserArgs,
  U = keyof S
> = S extends true
  ? ChatOnUser
  : S extends undefined
  ? never
  : S extends ChatOnUserArgs | FindManyChatOnUserArgs
  ? 'include' extends U
    ? ChatOnUser  & {
      [P in TrueKeys<S['include']>]:
      P extends 'chat'
      ? ChatGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof ChatOnUser ? ChatOnUser[P]
: 
      P extends 'chat'
      ? ChatGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : ChatOnUser
: ChatOnUser


export interface ChatOnUserDelegate {
  /**
   * Find zero or one ChatOnUser that matches the filter.
   * @param {FindOneChatOnUserArgs} args - Arguments to find a ChatOnUser
   * @example
   * // Get one ChatOnUser
   * const chatOnUser = await prisma.chatOnUser.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneChatOnUserArgs>(
    args: Subset<T, FindOneChatOnUserArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser | null>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T> | null>>
  /**
   * Find the first ChatOnUser that matches the filter.
   * @param {FindFirstChatOnUserArgs} args - Arguments to find a ChatOnUser
   * @example
   * // Get one ChatOnUser
   * const chatOnUser = await prisma.chatOnUser.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstChatOnUserArgs>(
    args?: Subset<T, FindFirstChatOnUserArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser | null>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T> | null>>
  /**
   * Find zero or more ChatOnUsers that matches the filter.
   * @param {FindManyChatOnUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ChatOnUsers
   * const chatOnUsers = await prisma.chatOnUser.findMany()
   * 
   * // Get first 10 ChatOnUsers
   * const chatOnUsers = await prisma.chatOnUser.findMany({ take: 10 })
   * 
   * // Only select the `chatId`
   * const chatOnUserWithChatIdOnly = await prisma.chatOnUser.findMany({ select: { chatId: true } })
   * 
  **/
  findMany<T extends FindManyChatOnUserArgs>(
    args?: Subset<T, FindManyChatOnUserArgs>
  ): CheckSelect<T, Promise<Array<ChatOnUser>>, Promise<Array<ChatOnUserGetPayload<T>>>>
  /**
   * Create a ChatOnUser.
   * @param {ChatOnUserCreateArgs} args - Arguments to create a ChatOnUser.
   * @example
   * // Create one ChatOnUser
   * const ChatOnUser = await prisma.chatOnUser.create({
   *   data: {
   *     // ... data to create a ChatOnUser
   *   }
   * })
   * 
  **/
  create<T extends ChatOnUserCreateArgs>(
    args: Subset<T, ChatOnUserCreateArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T>>>
  /**
   * Delete a ChatOnUser.
   * @param {ChatOnUserDeleteArgs} args - Arguments to delete one ChatOnUser.
   * @example
   * // Delete one ChatOnUser
   * const ChatOnUser = await prisma.chatOnUser.delete({
   *   where: {
   *     // ... filter to delete one ChatOnUser
   *   }
   * })
   * 
  **/
  delete<T extends ChatOnUserDeleteArgs>(
    args: Subset<T, ChatOnUserDeleteArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T>>>
  /**
   * Update one ChatOnUser.
   * @param {ChatOnUserUpdateArgs} args - Arguments to update one ChatOnUser.
   * @example
   * // Update one ChatOnUser
   * const chatOnUser = await prisma.chatOnUser.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ChatOnUserUpdateArgs>(
    args: Subset<T, ChatOnUserUpdateArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T>>>
  /**
   * Delete zero or more ChatOnUsers.
   * @param {ChatOnUserDeleteManyArgs} args - Arguments to filter ChatOnUsers to delete.
   * @example
   * // Delete a few ChatOnUsers
   * const { count } = await prisma.chatOnUser.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ChatOnUserDeleteManyArgs>(
    args: Subset<T, ChatOnUserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more ChatOnUsers.
   * @param {ChatOnUserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ChatOnUsers
   * const chatOnUser = await prisma.chatOnUser.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ChatOnUserUpdateManyArgs>(
    args: Subset<T, ChatOnUserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one ChatOnUser.
   * @param {ChatOnUserUpsertArgs} args - Arguments to update or create a ChatOnUser.
   * @example
   * // Update or create a ChatOnUser
   * const chatOnUser = await prisma.chatOnUser.upsert({
   *   create: {
   *     // ... data to create a ChatOnUser
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ChatOnUser we want to update
   *   }
   * })
  **/
  upsert<T extends ChatOnUserUpsertArgs>(
    args: Subset<T, ChatOnUserUpsertArgs>
  ): CheckSelect<T, Prisma__ChatOnUserClient<ChatOnUser>, Prisma__ChatOnUserClient<ChatOnUserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyChatOnUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateChatOnUserArgs>(args: Subset<T, AggregateChatOnUserArgs>): Promise<GetChatOnUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for ChatOnUser.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ChatOnUserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  chat<T extends ChatArgs = {}>(args?: Subset<T, ChatArgs>): CheckSelect<T, Prisma__ChatClient<Chat | null>, Prisma__ChatClient<ChatGetPayload<T> | null>>;

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ChatOnUser findOne
 */
export type FindOneChatOnUserArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * Filter, which ChatOnUser to fetch.
  **/
  where: ChatOnUserWhereUniqueInput
}


/**
 * ChatOnUser findFirst
 */
export type FindFirstChatOnUserArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * Filter, which ChatOnUser to fetch.
  **/
  where?: ChatOnUserWhereInput
  orderBy?: Enumerable<ChatOnUserOrderByInput> | ChatOnUserOrderByInput
  cursor?: ChatOnUserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChatOnUserDistinctFieldEnum>
}


/**
 * ChatOnUser findMany
 */
export type FindManyChatOnUserArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * Filter, which ChatOnUsers to fetch.
  **/
  where?: ChatOnUserWhereInput
  /**
   * Determine the order of the ChatOnUsers to fetch.
  **/
  orderBy?: Enumerable<ChatOnUserOrderByInput> | ChatOnUserOrderByInput
  /**
   * Sets the position for listing ChatOnUsers.
  **/
  cursor?: ChatOnUserWhereUniqueInput
  /**
   * The number of ChatOnUsers to fetch. If negative number, it will take ChatOnUsers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` ChatOnUsers.
  **/
  skip?: number
  distinct?: Enumerable<ChatOnUserDistinctFieldEnum>
}


/**
 * ChatOnUser create
 */
export type ChatOnUserCreateArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * The data needed to create a ChatOnUser.
  **/
  data: ChatOnUserCreateInput
}


/**
 * ChatOnUser update
 */
export type ChatOnUserUpdateArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * The data needed to update a ChatOnUser.
  **/
  data: ChatOnUserUpdateInput
  /**
   * Choose, which ChatOnUser to update.
  **/
  where: ChatOnUserWhereUniqueInput
}


/**
 * ChatOnUser updateMany
 */
export type ChatOnUserUpdateManyArgs = {
  data: ChatOnUserUpdateManyMutationInput
  where?: ChatOnUserWhereInput
}


/**
 * ChatOnUser upsert
 */
export type ChatOnUserUpsertArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * The filter to search for the ChatOnUser to update in case it exists.
  **/
  where: ChatOnUserWhereUniqueInput
  /**
   * In case the ChatOnUser found by the `where` argument doesn't exist, create a new ChatOnUser with this data.
  **/
  create: ChatOnUserCreateInput
  /**
   * In case the ChatOnUser was found with the provided `where` argument, update it with this data.
  **/
  update: ChatOnUserUpdateInput
}


/**
 * ChatOnUser delete
 */
export type ChatOnUserDeleteArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
  /**
   * Filter which ChatOnUser to delete.
  **/
  where: ChatOnUserWhereUniqueInput
}


/**
 * ChatOnUser deleteMany
 */
export type ChatOnUserDeleteManyArgs = {
  where?: ChatOnUserWhereInput
}


/**
 * ChatOnUser without action
 */
export type ChatOnUserArgs = {
  /**
   * Select specific fields to fetch from the ChatOnUser
  **/
  select?: ChatOnUserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ChatOnUserInclude | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: StringFilter | string
  email?: StringFilter | string
  password?: StringFilter | string
  name?: StringNullableFilter | string | null
  avatarUrl?: StringNullableFilter | string | null
  posts?: PostListRelationFilter
  comment?: CommentListRelationFilter
  bio?: StringNullableFilter | string | null
  liked?: PostsLikeListRelationFilter
  verifiedEmail?: BoolFilter | boolean
  updatedAt?: DateTimeFilter | Date | string
  createdAt?: DateTimeFilter | Date | string
  sentMessages?: MessageListRelationFilter
  chats?: ChatOnUserListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  email?: SortOrder
  password?: SortOrder
  name?: SortOrder
  avatarUrl?: SortOrder
  bio?: SortOrder
  verifiedEmail?: SortOrder
  updatedAt?: SortOrder
  createdAt?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: string
  email?: string
  name?: string
}

export type PostWhereInput = {
  AND?: PostWhereInput | Enumerable<PostWhereInput>
  OR?: PostWhereInput | Enumerable<PostWhereInput>
  NOT?: PostWhereInput | Enumerable<PostWhereInput>
  id?: StringFilter | string
  title?: StringFilter | string
  description?: StringNullableFilter | string | null
  published?: BoolFilter | boolean
  authorId?: StringFilter | string
  author?: UserRelationFilter | UserWhereInput
  postImageUrl?: StringNullableFilter | string | null
  comment?: CommentListRelationFilter
  likes?: IntFilter | number
  likers?: PostsLikeListRelationFilter
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type PostOrderByInput = {
  id?: SortOrder
  title?: SortOrder
  description?: SortOrder
  published?: SortOrder
  authorId?: SortOrder
  postImageUrl?: SortOrder
  likes?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: string
  authorId?: string
}

export type PostsLikeWhereInput = {
  AND?: PostsLikeWhereInput | Enumerable<PostsLikeWhereInput>
  OR?: PostsLikeWhereInput | Enumerable<PostsLikeWhereInput>
  NOT?: PostsLikeWhereInput | Enumerable<PostsLikeWhereInput>
  id?: StringFilter | string
  postId?: StringFilter | string
  post?: PostRelationFilter | PostWhereInput
  userId?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput
  createdAt?: DateTimeFilter | Date | string
}

export type PostsLikeOrderByInput = {
  id?: SortOrder
  postId?: SortOrder
  userId?: SortOrder
  createdAt?: SortOrder
}

export type PostsLikeWhereUniqueInput = {
  id?: string
  userId?: string
}

export type CommentWhereInput = {
  AND?: CommentWhereInput | Enumerable<CommentWhereInput>
  OR?: CommentWhereInput | Enumerable<CommentWhereInput>
  NOT?: CommentWhereInput | Enumerable<CommentWhereInput>
  id?: StringFilter | string
  author?: UserRelationFilter | UserWhereInput
  authorId?: StringFilter | string
  post?: PostRelationFilter | PostWhereInput
  postId?: StringFilter | string
  comment?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type CommentOrderByInput = {
  id?: SortOrder
  authorId?: SortOrder
  postId?: SortOrder
  comment?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type CommentWhereUniqueInput = {
  id?: string
  authorId?: string
}

export type ChatWhereInput = {
  AND?: ChatWhereInput | Enumerable<ChatWhereInput>
  OR?: ChatWhereInput | Enumerable<ChatWhereInput>
  NOT?: ChatWhereInput | Enumerable<ChatWhereInput>
  id?: StringFilter | string
  users?: ChatOnUserListRelationFilter
  messages?: MessageListRelationFilter
}

export type ChatOrderByInput = {
  id?: SortOrder
}

export type ChatWhereUniqueInput = {
  id?: string
}

export type MessageWhereInput = {
  AND?: MessageWhereInput | Enumerable<MessageWhereInput>
  OR?: MessageWhereInput | Enumerable<MessageWhereInput>
  NOT?: MessageWhereInput | Enumerable<MessageWhereInput>
  id?: StringFilter | string
  body?: StringFilter | string
  createdBy?: UserRelationFilter | UserWhereInput
  createdById?: StringFilter | string
  chat?: ChatRelationFilter | ChatWhereInput
  chatId?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
}

export type MessageOrderByInput = {
  id?: SortOrder
  body?: SortOrder
  createdById?: SortOrder
  chatId?: SortOrder
  createdAt?: SortOrder
}

export type MessageWhereUniqueInput = {
  id?: string
}

export type ChatOnUserWhereInput = {
  AND?: ChatOnUserWhereInput | Enumerable<ChatOnUserWhereInput>
  OR?: ChatOnUserWhereInput | Enumerable<ChatOnUserWhereInput>
  NOT?: ChatOnUserWhereInput | Enumerable<ChatOnUserWhereInput>
  chat?: ChatRelationFilter | ChatWhereInput
  chatId?: StringFilter | string
  user?: UserRelationFilter | UserWhereInput
  userId?: StringFilter | string
}

export type ChatOnUserOrderByInput = {
  chatId?: SortOrder
  userId?: SortOrder
}

export type ChatOnUserWhereUniqueInput = {
  chatId_userId?: ChatIdUserIdCompoundUniqueInput
}

export type UserCreateInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  posts?: PostCreateManyWithoutAuthorInput
  comment?: CommentCreateManyWithoutAuthorInput
  liked?: PostsLikeCreateManyWithoutUserInput
  sentMessages?: MessageCreateManyWithoutCreatedByInput
  chats?: ChatOnUserCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  posts?: PostUpdateManyWithoutAuthorInput
  comment?: CommentUpdateManyWithoutAuthorInput
  liked?: PostsLikeUpdateManyWithoutUserInput
  sentMessages?: MessageUpdateManyWithoutCreatedByInput
  chats?: ChatOnUserUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostCreateInput = {
  id?: string
  title: string
  description?: string | null
  published?: boolean
  postImageUrl?: string | null
  likes?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  author: UserCreateOneWithoutPostsInput
  comment?: CommentCreateManyWithoutPostInput
  likers?: PostsLikeCreateManyWithoutPostInput
}

export type PostUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutPostsInput
  comment?: CommentUpdateManyWithoutPostInput
  likers?: PostsLikeUpdateManyWithoutPostInput
}

export type PostUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostsLikeCreateInput = {
  id?: string
  createdAt?: Date | string
  post: PostCreateOneWithoutLikersInput
  user: UserCreateOneWithoutLikedInput
}

export type PostsLikeUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  post?: PostUpdateOneRequiredWithoutLikersInput
  user?: UserUpdateOneRequiredWithoutLikedInput
}

export type PostsLikeUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CommentCreateInput = {
  id?: string
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string
  author: UserCreateOneWithoutCommentInput
  post: PostCreateOneWithoutCommentInput
}

export type CommentUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  comment?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutCommentInput
  post?: PostUpdateOneRequiredWithoutCommentInput
}

export type CommentUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  comment?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ChatCreateInput = {
  id?: string
  users?: ChatOnUserCreateManyWithoutChatInput
  messages?: MessageCreateManyWithoutChatInput
}

export type ChatUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  users?: ChatOnUserUpdateManyWithoutChatInput
  messages?: MessageUpdateManyWithoutChatInput
}

export type ChatUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
}

export type MessageCreateInput = {
  id?: string
  body: string
  createdAt?: Date | string
  createdBy: UserCreateOneWithoutSentMessagesInput
  chat: ChatCreateOneWithoutMessagesInput
}

export type MessageUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdBy?: UserUpdateOneRequiredWithoutSentMessagesInput
  chat?: ChatUpdateOneRequiredWithoutMessagesInput
}

export type MessageUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ChatOnUserCreateInput = {
  chat: ChatCreateOneWithoutUsersInput
  user: UserCreateOneWithoutChatsInput
}

export type ChatOnUserUpdateInput = {
  chat?: ChatUpdateOneRequiredWithoutUsersInput
  user?: UserUpdateOneRequiredWithoutChatsInput
}

export type ChatOnUserUpdateManyMutationInput = {

}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type PostListRelationFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type CommentListRelationFilter = {
  every?: CommentWhereInput
  some?: CommentWhereInput
  none?: CommentWhereInput
}

export type PostsLikeListRelationFilter = {
  every?: PostsLikeWhereInput
  some?: PostsLikeWhereInput
  none?: PostsLikeWhereInput
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type MessageListRelationFilter = {
  every?: MessageWhereInput
  some?: MessageWhereInput
  none?: MessageWhereInput
}

export type ChatOnUserListRelationFilter = {
  every?: ChatOnUserWhereInput
  some?: ChatOnUserWhereInput
  none?: ChatOnUserWhereInput
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type PostRelationFilter = {
  is?: PostWhereInput
  isNot?: PostWhereInput
}

export type ChatRelationFilter = {
  is?: ChatWhereInput
  isNot?: ChatWhereInput
}

export type ChatIdUserIdCompoundUniqueInput = {
  chatId: string
  userId: string
}

export type PostCreateManyWithoutAuthorInput = {
  create?: PostCreateWithoutAuthorInput | Enumerable<PostCreateWithoutAuthorInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
}

export type CommentCreateManyWithoutAuthorInput = {
  create?: CommentCreateWithoutAuthorInput | Enumerable<CommentCreateWithoutAuthorInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
}

export type PostsLikeCreateManyWithoutUserInput = {
  create?: PostsLikeCreateWithoutUserInput | Enumerable<PostsLikeCreateWithoutUserInput>
  connect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
}

export type MessageCreateManyWithoutCreatedByInput = {
  create?: MessageCreateWithoutCreatedByInput | Enumerable<MessageCreateWithoutCreatedByInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
}

export type ChatOnUserCreateManyWithoutUserInput = {
  create?: ChatOnUserCreateWithoutUserInput | Enumerable<ChatOnUserCreateWithoutUserInput>
  connect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type PostUpdateManyWithoutAuthorInput = {
  create?: PostCreateWithoutAuthorInput | Enumerable<PostCreateWithoutAuthorInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  update?: PostUpdateWithWhereUniqueWithoutAuthorInput | Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: PostUpdateManyWithWhereNestedInput | Enumerable<PostUpdateManyWithWhereNestedInput>
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
}

export type CommentUpdateManyWithoutAuthorInput = {
  create?: CommentCreateWithoutAuthorInput | Enumerable<CommentCreateWithoutAuthorInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  set?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  disconnect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  delete?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | Enumerable<CommentUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: CommentUpdateManyWithWhereNestedInput | Enumerable<CommentUpdateManyWithWhereNestedInput>
  deleteMany?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | Enumerable<CommentUpsertWithWhereUniqueWithoutAuthorInput>
}

export type PostsLikeUpdateManyWithoutUserInput = {
  create?: PostsLikeCreateWithoutUserInput | Enumerable<PostsLikeCreateWithoutUserInput>
  connect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  set?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  disconnect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  delete?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  update?: PostsLikeUpdateWithWhereUniqueWithoutUserInput | Enumerable<PostsLikeUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: PostsLikeUpdateManyWithWhereNestedInput | Enumerable<PostsLikeUpdateManyWithWhereNestedInput>
  deleteMany?: PostsLikeScalarWhereInput | Enumerable<PostsLikeScalarWhereInput>
  upsert?: PostsLikeUpsertWithWhereUniqueWithoutUserInput | Enumerable<PostsLikeUpsertWithWhereUniqueWithoutUserInput>
}

export type MessageUpdateManyWithoutCreatedByInput = {
  create?: MessageCreateWithoutCreatedByInput | Enumerable<MessageCreateWithoutCreatedByInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  set?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  disconnect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  delete?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  update?: MessageUpdateWithWhereUniqueWithoutCreatedByInput | Enumerable<MessageUpdateWithWhereUniqueWithoutCreatedByInput>
  updateMany?: MessageUpdateManyWithWhereNestedInput | Enumerable<MessageUpdateManyWithWhereNestedInput>
  deleteMany?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  upsert?: MessageUpsertWithWhereUniqueWithoutCreatedByInput | Enumerable<MessageUpsertWithWhereUniqueWithoutCreatedByInput>
}

export type ChatOnUserUpdateManyWithoutUserInput = {
  create?: ChatOnUserCreateWithoutUserInput | Enumerable<ChatOnUserCreateWithoutUserInput>
  connect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  set?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  disconnect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  delete?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  update?: ChatOnUserUpdateWithWhereUniqueWithoutUserInput | Enumerable<ChatOnUserUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: ChatOnUserUpdateManyWithWhereNestedInput | Enumerable<ChatOnUserUpdateManyWithWhereNestedInput>
  deleteMany?: ChatOnUserScalarWhereInput | Enumerable<ChatOnUserScalarWhereInput>
  upsert?: ChatOnUserUpsertWithWhereUniqueWithoutUserInput | Enumerable<ChatOnUserUpsertWithWhereUniqueWithoutUserInput>
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export type CommentCreateManyWithoutPostInput = {
  create?: CommentCreateWithoutPostInput | Enumerable<CommentCreateWithoutPostInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
}

export type PostsLikeCreateManyWithoutPostInput = {
  create?: PostsLikeCreateWithoutPostInput | Enumerable<PostsLikeCreateWithoutPostInput>
  connect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export type CommentUpdateManyWithoutPostInput = {
  create?: CommentCreateWithoutPostInput | Enumerable<CommentCreateWithoutPostInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  set?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  disconnect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  delete?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  update?: CommentUpdateWithWhereUniqueWithoutPostInput | Enumerable<CommentUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: CommentUpdateManyWithWhereNestedInput | Enumerable<CommentUpdateManyWithWhereNestedInput>
  deleteMany?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | Enumerable<CommentUpsertWithWhereUniqueWithoutPostInput>
}

export type PostsLikeUpdateManyWithoutPostInput = {
  create?: PostsLikeCreateWithoutPostInput | Enumerable<PostsLikeCreateWithoutPostInput>
  connect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  set?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  disconnect?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  delete?: PostsLikeWhereUniqueInput | Enumerable<PostsLikeWhereUniqueInput>
  update?: PostsLikeUpdateWithWhereUniqueWithoutPostInput | Enumerable<PostsLikeUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: PostsLikeUpdateManyWithWhereNestedInput | Enumerable<PostsLikeUpdateManyWithWhereNestedInput>
  deleteMany?: PostsLikeScalarWhereInput | Enumerable<PostsLikeScalarWhereInput>
  upsert?: PostsLikeUpsertWithWhereUniqueWithoutPostInput | Enumerable<PostsLikeUpsertWithWhereUniqueWithoutPostInput>
}

export type PostCreateOneWithoutLikersInput = {
  create?: PostCreateWithoutLikersInput
  connect?: PostWhereUniqueInput
}

export type UserCreateOneWithoutLikedInput = {
  create?: UserCreateWithoutLikedInput
  connect?: UserWhereUniqueInput
}

export type PostUpdateOneRequiredWithoutLikersInput = {
  create?: PostCreateWithoutLikersInput
  connect?: PostWhereUniqueInput
  update?: PostUpdateWithoutLikersDataInput
  upsert?: PostUpsertWithoutLikersInput
}

export type UserUpdateOneRequiredWithoutLikedInput = {
  create?: UserCreateWithoutLikedInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutLikedDataInput
  upsert?: UserUpsertWithoutLikedInput
}

export type UserCreateOneWithoutCommentInput = {
  create?: UserCreateWithoutCommentInput
  connect?: UserWhereUniqueInput
}

export type PostCreateOneWithoutCommentInput = {
  create?: PostCreateWithoutCommentInput
  connect?: PostWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutCommentInput = {
  create?: UserCreateWithoutCommentInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCommentDataInput
  upsert?: UserUpsertWithoutCommentInput
}

export type PostUpdateOneRequiredWithoutCommentInput = {
  create?: PostCreateWithoutCommentInput
  connect?: PostWhereUniqueInput
  update?: PostUpdateWithoutCommentDataInput
  upsert?: PostUpsertWithoutCommentInput
}

export type ChatOnUserCreateManyWithoutChatInput = {
  create?: ChatOnUserCreateWithoutChatInput | Enumerable<ChatOnUserCreateWithoutChatInput>
  connect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
}

export type MessageCreateManyWithoutChatInput = {
  create?: MessageCreateWithoutChatInput | Enumerable<MessageCreateWithoutChatInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
}

export type ChatOnUserUpdateManyWithoutChatInput = {
  create?: ChatOnUserCreateWithoutChatInput | Enumerable<ChatOnUserCreateWithoutChatInput>
  connect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  set?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  disconnect?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  delete?: ChatOnUserWhereUniqueInput | Enumerable<ChatOnUserWhereUniqueInput>
  update?: ChatOnUserUpdateWithWhereUniqueWithoutChatInput | Enumerable<ChatOnUserUpdateWithWhereUniqueWithoutChatInput>
  updateMany?: ChatOnUserUpdateManyWithWhereNestedInput | Enumerable<ChatOnUserUpdateManyWithWhereNestedInput>
  deleteMany?: ChatOnUserScalarWhereInput | Enumerable<ChatOnUserScalarWhereInput>
  upsert?: ChatOnUserUpsertWithWhereUniqueWithoutChatInput | Enumerable<ChatOnUserUpsertWithWhereUniqueWithoutChatInput>
}

export type MessageUpdateManyWithoutChatInput = {
  create?: MessageCreateWithoutChatInput | Enumerable<MessageCreateWithoutChatInput>
  connect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  set?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  disconnect?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  delete?: MessageWhereUniqueInput | Enumerable<MessageWhereUniqueInput>
  update?: MessageUpdateWithWhereUniqueWithoutChatInput | Enumerable<MessageUpdateWithWhereUniqueWithoutChatInput>
  updateMany?: MessageUpdateManyWithWhereNestedInput | Enumerable<MessageUpdateManyWithWhereNestedInput>
  deleteMany?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  upsert?: MessageUpsertWithWhereUniqueWithoutChatInput | Enumerable<MessageUpsertWithWhereUniqueWithoutChatInput>
}

export type UserCreateOneWithoutSentMessagesInput = {
  create?: UserCreateWithoutSentMessagesInput
  connect?: UserWhereUniqueInput
}

export type ChatCreateOneWithoutMessagesInput = {
  create?: ChatCreateWithoutMessagesInput
  connect?: ChatWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutSentMessagesInput = {
  create?: UserCreateWithoutSentMessagesInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutSentMessagesDataInput
  upsert?: UserUpsertWithoutSentMessagesInput
}

export type ChatUpdateOneRequiredWithoutMessagesInput = {
  create?: ChatCreateWithoutMessagesInput
  connect?: ChatWhereUniqueInput
  update?: ChatUpdateWithoutMessagesDataInput
  upsert?: ChatUpsertWithoutMessagesInput
}

export type ChatCreateOneWithoutUsersInput = {
  create?: ChatCreateWithoutUsersInput
  connect?: ChatWhereUniqueInput
}

export type UserCreateOneWithoutChatsInput = {
  create?: UserCreateWithoutChatsInput
  connect?: UserWhereUniqueInput
}

export type ChatUpdateOneRequiredWithoutUsersInput = {
  create?: ChatCreateWithoutUsersInput
  connect?: ChatWhereUniqueInput
  update?: ChatUpdateWithoutUsersDataInput
  upsert?: ChatUpsertWithoutUsersInput
}

export type UserUpdateOneRequiredWithoutChatsInput = {
  create?: UserCreateWithoutChatsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutChatsDataInput
  upsert?: UserUpsertWithoutChatsInput
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type PostCreateWithoutAuthorInput = {
  id?: string
  title: string
  description?: string | null
  published?: boolean
  postImageUrl?: string | null
  likes?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  comment?: CommentCreateManyWithoutPostInput
  likers?: PostsLikeCreateManyWithoutPostInput
}

export type CommentCreateWithoutAuthorInput = {
  id?: string
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string
  post: PostCreateOneWithoutCommentInput
}

export type PostsLikeCreateWithoutUserInput = {
  id?: string
  createdAt?: Date | string
  post: PostCreateOneWithoutLikersInput
}

export type MessageCreateWithoutCreatedByInput = {
  id?: string
  body: string
  createdAt?: Date | string
  chat: ChatCreateOneWithoutMessagesInput
}

export type ChatOnUserCreateWithoutUserInput = {
  chat: ChatCreateOneWithoutUsersInput
}

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostScalarWhereInput = {
  AND?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  OR?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  NOT?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  id?: StringFilter | string
  title?: StringFilter | string
  description?: StringNullableFilter | string | null
  published?: BoolFilter | boolean
  authorId?: StringFilter | string
  postImageUrl?: StringNullableFilter | string | null
  likes?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutAuthorDataInput
}

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export type CommentScalarWhereInput = {
  AND?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  OR?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  NOT?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  id?: StringFilter | string
  authorId?: StringFilter | string
  postId?: StringFilter | string
  comment?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutAuthorDataInput
  create: CommentCreateWithoutAuthorInput
}

export type PostsLikeUpdateWithWhereUniqueWithoutUserInput = {
  where: PostsLikeWhereUniqueInput
  data: PostsLikeUpdateWithoutUserDataInput
}

export type PostsLikeUpdateManyWithWhereNestedInput = {
  where: PostsLikeScalarWhereInput
  data: PostsLikeUpdateManyDataInput
}

export type PostsLikeScalarWhereInput = {
  AND?: PostsLikeScalarWhereInput | Enumerable<PostsLikeScalarWhereInput>
  OR?: PostsLikeScalarWhereInput | Enumerable<PostsLikeScalarWhereInput>
  NOT?: PostsLikeScalarWhereInput | Enumerable<PostsLikeScalarWhereInput>
  id?: StringFilter | string
  postId?: StringFilter | string
  userId?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
}

export type PostsLikeUpsertWithWhereUniqueWithoutUserInput = {
  where: PostsLikeWhereUniqueInput
  update: PostsLikeUpdateWithoutUserDataInput
  create: PostsLikeCreateWithoutUserInput
}

export type MessageUpdateWithWhereUniqueWithoutCreatedByInput = {
  where: MessageWhereUniqueInput
  data: MessageUpdateWithoutCreatedByDataInput
}

export type MessageUpdateManyWithWhereNestedInput = {
  where: MessageScalarWhereInput
  data: MessageUpdateManyDataInput
}

export type MessageScalarWhereInput = {
  AND?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  OR?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  NOT?: MessageScalarWhereInput | Enumerable<MessageScalarWhereInput>
  id?: StringFilter | string
  body?: StringFilter | string
  createdById?: StringFilter | string
  chatId?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
}

export type MessageUpsertWithWhereUniqueWithoutCreatedByInput = {
  where: MessageWhereUniqueInput
  update: MessageUpdateWithoutCreatedByDataInput
  create: MessageCreateWithoutCreatedByInput
}

export type ChatOnUserUpdateWithWhereUniqueWithoutUserInput = {
  where: ChatOnUserWhereUniqueInput
  data: ChatOnUserUpdateWithoutUserDataInput
}

export type ChatOnUserUpdateManyWithWhereNestedInput = {
  where: ChatOnUserScalarWhereInput
  data: ChatOnUserUpdateManyDataInput
}

export type ChatOnUserScalarWhereInput = {
  AND?: ChatOnUserScalarWhereInput | Enumerable<ChatOnUserScalarWhereInput>
  OR?: ChatOnUserScalarWhereInput | Enumerable<ChatOnUserScalarWhereInput>
  NOT?: ChatOnUserScalarWhereInput | Enumerable<ChatOnUserScalarWhereInput>
  chatId?: StringFilter | string
  userId?: StringFilter | string
}

export type ChatOnUserUpsertWithWhereUniqueWithoutUserInput = {
  where: ChatOnUserWhereUniqueInput
  update: ChatOnUserUpdateWithoutUserDataInput
  create: ChatOnUserCreateWithoutUserInput
}

export type UserCreateWithoutPostsInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  comment?: CommentCreateManyWithoutAuthorInput
  liked?: PostsLikeCreateManyWithoutUserInput
  sentMessages?: MessageCreateManyWithoutCreatedByInput
  chats?: ChatOnUserCreateManyWithoutUserInput
}

export type CommentCreateWithoutPostInput = {
  id?: string
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string
  author: UserCreateOneWithoutCommentInput
}

export type PostsLikeCreateWithoutPostInput = {
  id?: string
  createdAt?: Date | string
  user: UserCreateOneWithoutLikedInput
}

export type UserUpdateWithoutPostsDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  comment?: CommentUpdateManyWithoutAuthorInput
  liked?: PostsLikeUpdateManyWithoutUserInput
  sentMessages?: MessageUpdateManyWithoutCreatedByInput
  chats?: ChatOnUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPostDataInput
}

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPostDataInput
  create: CommentCreateWithoutPostInput
}

export type PostsLikeUpdateWithWhereUniqueWithoutPostInput = {
  where: PostsLikeWhereUniqueInput
  data: PostsLikeUpdateWithoutPostDataInput
}

export type PostsLikeUpsertWithWhereUniqueWithoutPostInput = {
  where: PostsLikeWhereUniqueInput
  update: PostsLikeUpdateWithoutPostDataInput
  create: PostsLikeCreateWithoutPostInput
}

export type PostCreateWithoutLikersInput = {
  id?: string
  title: string
  description?: string | null
  published?: boolean
  postImageUrl?: string | null
  likes?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  author: UserCreateOneWithoutPostsInput
  comment?: CommentCreateManyWithoutPostInput
}

export type UserCreateWithoutLikedInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  posts?: PostCreateManyWithoutAuthorInput
  comment?: CommentCreateManyWithoutAuthorInput
  sentMessages?: MessageCreateManyWithoutCreatedByInput
  chats?: ChatOnUserCreateManyWithoutUserInput
}

export type PostUpdateWithoutLikersDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutPostsInput
  comment?: CommentUpdateManyWithoutPostInput
}

export type PostUpsertWithoutLikersInput = {
  update: PostUpdateWithoutLikersDataInput
  create: PostCreateWithoutLikersInput
}

export type UserUpdateWithoutLikedDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  posts?: PostUpdateManyWithoutAuthorInput
  comment?: CommentUpdateManyWithoutAuthorInput
  sentMessages?: MessageUpdateManyWithoutCreatedByInput
  chats?: ChatOnUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutLikedInput = {
  update: UserUpdateWithoutLikedDataInput
  create: UserCreateWithoutLikedInput
}

export type UserCreateWithoutCommentInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  posts?: PostCreateManyWithoutAuthorInput
  liked?: PostsLikeCreateManyWithoutUserInput
  sentMessages?: MessageCreateManyWithoutCreatedByInput
  chats?: ChatOnUserCreateManyWithoutUserInput
}

export type PostCreateWithoutCommentInput = {
  id?: string
  title: string
  description?: string | null
  published?: boolean
  postImageUrl?: string | null
  likes?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  author: UserCreateOneWithoutPostsInput
  likers?: PostsLikeCreateManyWithoutPostInput
}

export type UserUpdateWithoutCommentDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  posts?: PostUpdateManyWithoutAuthorInput
  liked?: PostsLikeUpdateManyWithoutUserInput
  sentMessages?: MessageUpdateManyWithoutCreatedByInput
  chats?: ChatOnUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutCommentInput = {
  update: UserUpdateWithoutCommentDataInput
  create: UserCreateWithoutCommentInput
}

export type PostUpdateWithoutCommentDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutPostsInput
  likers?: PostsLikeUpdateManyWithoutPostInput
}

export type PostUpsertWithoutCommentInput = {
  update: PostUpdateWithoutCommentDataInput
  create: PostCreateWithoutCommentInput
}

export type ChatOnUserCreateWithoutChatInput = {
  user: UserCreateOneWithoutChatsInput
}

export type MessageCreateWithoutChatInput = {
  id?: string
  body: string
  createdAt?: Date | string
  createdBy: UserCreateOneWithoutSentMessagesInput
}

export type ChatOnUserUpdateWithWhereUniqueWithoutChatInput = {
  where: ChatOnUserWhereUniqueInput
  data: ChatOnUserUpdateWithoutChatDataInput
}

export type ChatOnUserUpsertWithWhereUniqueWithoutChatInput = {
  where: ChatOnUserWhereUniqueInput
  update: ChatOnUserUpdateWithoutChatDataInput
  create: ChatOnUserCreateWithoutChatInput
}

export type MessageUpdateWithWhereUniqueWithoutChatInput = {
  where: MessageWhereUniqueInput
  data: MessageUpdateWithoutChatDataInput
}

export type MessageUpsertWithWhereUniqueWithoutChatInput = {
  where: MessageWhereUniqueInput
  update: MessageUpdateWithoutChatDataInput
  create: MessageCreateWithoutChatInput
}

export type UserCreateWithoutSentMessagesInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  posts?: PostCreateManyWithoutAuthorInput
  comment?: CommentCreateManyWithoutAuthorInput
  liked?: PostsLikeCreateManyWithoutUserInput
  chats?: ChatOnUserCreateManyWithoutUserInput
}

export type ChatCreateWithoutMessagesInput = {
  id?: string
  users?: ChatOnUserCreateManyWithoutChatInput
}

export type UserUpdateWithoutSentMessagesDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  posts?: PostUpdateManyWithoutAuthorInput
  comment?: CommentUpdateManyWithoutAuthorInput
  liked?: PostsLikeUpdateManyWithoutUserInput
  chats?: ChatOnUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutSentMessagesInput = {
  update: UserUpdateWithoutSentMessagesDataInput
  create: UserCreateWithoutSentMessagesInput
}

export type ChatUpdateWithoutMessagesDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  users?: ChatOnUserUpdateManyWithoutChatInput
}

export type ChatUpsertWithoutMessagesInput = {
  update: ChatUpdateWithoutMessagesDataInput
  create: ChatCreateWithoutMessagesInput
}

export type ChatCreateWithoutUsersInput = {
  id?: string
  messages?: MessageCreateManyWithoutChatInput
}

export type UserCreateWithoutChatsInput = {
  id?: string
  email: string
  password: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  verifiedEmail?: boolean
  updatedAt?: Date | string
  createdAt?: Date | string
  posts?: PostCreateManyWithoutAuthorInput
  comment?: CommentCreateManyWithoutAuthorInput
  liked?: PostsLikeCreateManyWithoutUserInput
  sentMessages?: MessageCreateManyWithoutCreatedByInput
}

export type ChatUpdateWithoutUsersDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  messages?: MessageUpdateManyWithoutChatInput
}

export type ChatUpsertWithoutUsersInput = {
  update: ChatUpdateWithoutUsersDataInput
  create: ChatCreateWithoutUsersInput
}

export type UserUpdateWithoutChatsDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  avatarUrl?: string | NullableStringFieldUpdateOperationsInput | null
  bio?: string | NullableStringFieldUpdateOperationsInput | null
  verifiedEmail?: boolean | BoolFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  posts?: PostUpdateManyWithoutAuthorInput
  comment?: CommentUpdateManyWithoutAuthorInput
  liked?: PostsLikeUpdateManyWithoutUserInput
  sentMessages?: MessageUpdateManyWithoutCreatedByInput
}

export type UserUpsertWithoutChatsInput = {
  update: UserUpdateWithoutChatsDataInput
  create: UserCreateWithoutChatsInput
}

export type PostUpdateWithoutAuthorDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  comment?: CommentUpdateManyWithoutPostInput
  likers?: PostsLikeUpdateManyWithoutPostInput
}

export type PostUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  title?: string | StringFieldUpdateOperationsInput
  description?: string | NullableStringFieldUpdateOperationsInput | null
  published?: boolean | BoolFieldUpdateOperationsInput
  postImageUrl?: string | NullableStringFieldUpdateOperationsInput | null
  likes?: number | IntFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CommentUpdateWithoutAuthorDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  comment?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  post?: PostUpdateOneRequiredWithoutCommentInput
}

export type CommentUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  comment?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostsLikeUpdateWithoutUserDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  post?: PostUpdateOneRequiredWithoutLikersInput
}

export type PostsLikeUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type MessageUpdateWithoutCreatedByDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  chat?: ChatUpdateOneRequiredWithoutMessagesInput
}

export type MessageUpdateManyDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type ChatOnUserUpdateWithoutUserDataInput = {
  chat?: ChatUpdateOneRequiredWithoutUsersInput
}

export type ChatOnUserUpdateManyDataInput = {

}

export type CommentUpdateWithoutPostDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  comment?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutCommentInput
}

export type PostsLikeUpdateWithoutPostDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutLikedInput
}

export type ChatOnUserUpdateWithoutChatDataInput = {
  user?: UserUpdateOneRequiredWithoutChatsInput
}

export type MessageUpdateWithoutChatDataInput = {
  id?: string | StringFieldUpdateOperationsInput
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  createdBy?: UserUpdateOneRequiredWithoutSentMessagesInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
