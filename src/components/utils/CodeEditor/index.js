import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import PropTypes from "prop-types";
import theme from "prism-react-renderer/themes/github";

import "./style.scss";
import { Fragment } from "react";

/**
 * @description Html code editor
 * @param {string, string, function, bool} {
 *     language = "", Programming language for syntax highlighting https://prismjs.com/#supported-languages
 *     code = "", Code present in the editor
 *     onWrite = () => {}, Function called at each writing
 *     readonly = false, Boolean to define the read-only mode
 * }
 * @return {JSX} 
 */
const CodeEditor = ({
    language = "",
    code = "",
    onWrite = () => {},
    readonly = false,
}) => {
    const highlight = rawCode => (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={rawCode}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Fragment>
                    {tokens.map((line, i) => (
                        <div
                            key={i}
                            {...getLineProps({ line, key: i })}
                            className="editor-line"
                        >
                            <span className="editor-line-number">{i + 1}</span>
                            <span className="editor-line-content">
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token, key })}
                                    />
                                ))}
                            </span>
                        </div>
                    ))}
                </Fragment>
            )}
        </Highlight>
    );

    return (
        <Editor
            className="editor code"
            value={code}
            onValueChange={newCode => onWrite(newCode)}
            highlight={highlight}
            disabled={readonly}
            style={{ ...theme.plain }}
        />
    );
};

CodeEditor.propTypes = {
    language: PropTypes.string,
    code: PropTypes.string,
    onWrite: PropTypes.func,
    readonly: PropTypes.bool,
};

export default CodeEditor;
