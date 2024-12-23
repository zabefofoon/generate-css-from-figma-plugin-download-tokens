export const generateRoundVariable = (designToken) => {
    return Object.entries(designToken.Rounded.mo).reduce((acc, current) => {
        const [key, value] = current
        return acc + `${key}: ${value}px;`
    }, ``)
}

export const generatePcRoundVariable = (designToken) => {
    return Object.entries(designToken.Rounded.pc).reduce((acc, current) => {
        const [key, value] = current
        return acc + `${key}: ${value}px;`
    }, ``)
}

export const generateRoundClass = (designToken) => {
    return Object.keys(designToken.Rounded.pc).reduce((acc, current) => {
        return (
            acc +
            `.${current.replaceAll("--", "")} {border-radius: var(${current});};
`
        )
    }, "")
}
