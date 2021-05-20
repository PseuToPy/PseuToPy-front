import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import PropTypes from "prop-types";
import theme from "prism-react-renderer/themes/github";

import "./style.scss";

const CodeViewer = ({ language = "", code = "", withLineNumbers = false }) => {
    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={code}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className="editor code" style={style}>
                    {tokens.map((line, i) => (
                        <div
                            key={i}
                            {...getLineProps({ line, key: i })}
                            className="editor-line"
                        >
                            {withLineNumbers ? (
                                <span className="editor-line-number">
                                    {i + 1}
                                </span>
                            ) : null}
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
                </pre>
            )}
        </Highlight>
    );
};

CodeViewer.propTypes = {
    language: PropTypes.string,
    withLineNumbers: PropTypes.bool,
};

export default CodeViewer;
