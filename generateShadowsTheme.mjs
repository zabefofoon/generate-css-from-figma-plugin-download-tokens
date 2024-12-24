export const generateShadowVariable = (designToken) => {
    return Object.entries(designToken.shadows.mo).reduce((acc, current) => {
        const [key, value] = current
        return acc + `${key}: ${value};`
    }, ``)
}

export const generatePcShadowVariable = (designToken) => {
    return Object.entries(designToken.shadows.pc).reduce((acc, current) => {
        const [key, value] = current
        return acc + `${key}: ${value};`
    }, ``)
}

export const generateShadowClass = (designToken) => {
    return Object.keys(designToken.shadows.pc).reduce((acc, current) => {
        return (
            acc +
            `.${current.replaceAll("--", "")} {box-shadow: var(${current});};
`
        )
    }, "")
}
