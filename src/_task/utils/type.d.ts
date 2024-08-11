/**
 * @description Utility types and interfaces for authentication and page configuration in a Playwright testing environment.
 * This module defines types for username-based authentication and an interface for an authentication page.
 *
 * @module UTILS
 * @namespace UTILS
 *
 * @typedef {Object} UsernameAuth - Represents the username authentication type.
 * @property {string} username - The username.
 * @property {string} password - The password.
 *
 * @typedef {Object} Auth - Alias for UsernameAuth.
 *
 * @typedef {Object} PageConfig - Configuration for a page.
 * @property {Auth} auth - The authentication configuration.
 *
 * @interface AuthPage - Represents an authentication page.
 * @property {PageConfig} config - The page configuration.
 * @property {Page} page - The Playwright page instance.
 * @method init - Initializes the authentication page.
 * @method inputAuthInfo - Inputs authentication information.
 * @returns {Promise<void>} - A promise that resolves when the authentication information is inputted.
 *
 * @description $DESC$
 * @date 2024/7/30
 * @author ztx
 * @copyright
 */
import { Page } from '@playwright';
import { BrowserContext, CDPSession } from 'playwright';

declare namespace UTILS {
  /**
   * 用户名认证类型。
   * 包含用户名和密码字段。
   */
  type UsernameAuth = {
    /**
     * 用户名。
     */
    username: string;

    /**
     * 密码。
     */
    password: string;
  };

  /**
   * 代理类型。
   * 包含代理服务器、用户名和密码字段。
   */
  type Proxy = {
    /**
     * 代理服务器。
     * 格式为`http://<proxy-server-ip>:<proxy-server-port>`。
     */
    server: string;

    /**
     * 用户名。
     */
    username: string;

    /**
     * 密码。
     */
    password: string;
  };


  /**
   * 认证类型。
   * 当前为用户名认证类型的别名。
   */
  type Auth = UsernameAuth;

  /**
   * 页面配置类型。
   * 包含认证信息。
   */
  type PageConfig = {
    auth: Auth;
    proxy?:Proxy;
  };

  /**
   * 表示一个认证页面的接口。
   */
  interface AuthPage {
    /**
     * 页面配置。
     */
    config: PageConfig;

    /**
     * Playwright 页面实例。
     */
    page: Page;

    context: BrowserContext;
    session:CDPSession;



    /**
     * 输入认证信息的方法。
     * @returns {Promise<void>} 返回一个在认证信息输入完成时解析的 Promise。
     */
    inputAuthInfo: () => Promise<void>;
  }
}