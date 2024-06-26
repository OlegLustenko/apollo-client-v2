/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetPost($id: ID!) {\n    post(id: $id) {\n      id\n      title\n      body\n    }\n  }\n": types.GetPostDocument,
    "\n  query GetPosts($options: PageQueryOptions) {\n    posts(options: $options) {\n      data {\n        id\n        title\n      }\n      meta {\n        totalCount\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n": types.DeletePostDocument,
    "\n  mutation UpdatePostMutation($id: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      id\n      body\n    }\n  }\n": types.UpdatePostMutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPost($id: ID!) {\n    post(id: $id) {\n      id\n      title\n      body\n    }\n  }\n"): (typeof documents)["\n  query GetPost($id: ID!) {\n    post(id: $id) {\n      id\n      title\n      body\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts($options: PageQueryOptions) {\n    posts(options: $options) {\n      data {\n        id\n        title\n      }\n      meta {\n        totalCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($options: PageQueryOptions) {\n    posts(options: $options) {\n      data {\n        id\n        title\n      }\n      meta {\n        totalCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePostMutation($id: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      id\n      body\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePostMutation($id: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      id\n      body\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;