const needsDebug = () => {
    if(process.env.REACT_APP_DEBUG) {
        if(process.env.REACT_APP_DEBUG.toLowerCase() === "true") {
            return true;
        } else if (process.env.REACT_APP_DEBUG.toLowerCase() === "false") {
            return false;
        }
    }
    return true;
}

export { needsDebug };