export const generatePcTextVariable = (designToken) => {
    return Object.entries(designToken.texts.pc).reduce((acc, current) => {
        const [name, styles] = current
        return (
            acc +
            Object.entries(styles).reduce((acc, current) => {
                const [key, values] = current
                return acc + `${name}-${key}: ${values};`
            }, "")
        )
    }, "")
}

export const generateTextVariable = (designToken) => {
    return Object.entries(designToken.texts.mo).reduce((acc, current) => {
        const [name, styles] = current
        return (
            acc +
            Object.entries(styles).reduce((acc, current) => {
                const [key, values] = current
                return acc + `${name}-${key}: ${values};`
            }, "")
        )
    }, "")
}

export const generateTextClass = (designToken) => {
    return Object.keys(designToken.texts.pc).reduce((acc, current) => {
        return (
            acc +
            `.${current.replaceAll("--", "")} { font-size: var(${current}-font-size); font-weight: var(${current}-font-weight); line-height: var(${current}-line-height); letter-spacing: var(${current}-letter-spacing);};`
        )
    }, "")
}
