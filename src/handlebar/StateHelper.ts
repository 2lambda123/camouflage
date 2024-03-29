/**
 * Defines and registers custom handlebar helper - state
 */
export class StateHelper {
  private Handlebars: any;
  constructor(Handlebars: any) {
    this.Handlebars = Handlebars;
  }
  /**
   * Registers code helper
   *
   * This helper gets the mocked state value using a key send within the cookie header.
   * If no value is found it will use the default context within the block.
   *
   * For example:
   * ```json
   * {
   *     "has_pending_order": {{#state key='has-pending-order'}}false{{/state}}
   * }
   * ```
   *
   * To set a value just send cookie with a specific prefix .
   *
   * ```js
   * const prefix = "mocked-state";
   * const key = "has-pending-order";
   * setCookie(`${prefix}-${key}`, "true");
   * ```
   *
   * WARNING: the limit of cookie values in most browsers is 4KB
   * @returns {void}
   */
  register = () => {
    this.Handlebars.registerHelper("state", (context: any) => {
      const cookies = context.data.root.request.cookies || {};
      const key = `mocked-state-${context.hash.key}`;
      return cookies[key] || context.fn(this);
    });
  };
}
