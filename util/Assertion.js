/**
 * Assertion Util
 *
 * @author Yepeng Ding
 */
export class Assert {

    /**
     * Assert the given expression is true. Otherwise, execute the given callback function.
     *
     * @param expression expression
     * @param callback callback function
     */
    static isTrue(expression, callback) {
        if (!expression) {
            callback();
            throw Error;
        }
    }

}
