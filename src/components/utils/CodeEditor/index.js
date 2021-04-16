import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import PropTypes from "prop-types";
import theme from "prism-react-renderer/themes/github";

import "./style.scss";

const CodeEditor = ({ language = "", code = "", onWrite, readonly = false}) => {

    const highlight = rawCode => (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={rawCode}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div className="editor-container">
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
                </div>
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
