export const generateThemeHtml = (designToken) => {
    const themes = Object.keys(designToken.colors).filter((item) => item !== "white")

    return themes.reduce((acc, current) => {
        const variables = Object.entries(designToken.colors[current]).reduce((acc, current) => {
            const [key, value] = current
            return acc + `${key}: ${value}; `
        }, "")

        return acc + `.${current} { ${variables} } `
    }, "")
}

export const generateColorVariable = (designToken) => {
    return Object.entries(designToken.colors.white).reduce((acc, current) => {
        const [key, value] = current
        return acc + `${key}: ${value}; `
    }, "")
}

export const generateColorClass = (designToken) => {
    return Object.keys(designToken.colors.white).reduce((acc, current) => {
        const property = current.includes("text")
            ? "color"
            : current.includes("border")
              ? "border-color"
              : "background"

        return acc + `.${current.replaceAll("--", "")} {${property}: var(${current});}`
    }, ``)
}
