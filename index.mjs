#!/usr/bin/env node

import fs from "fs";
import path from "path";

import {
  generateRoundVariable,
  generatePcRoundVariable,
  generateRoundClass,
} from "./generateRoundedTheme.mjs";

import {
  generateThemeHtml,
  generateColorVariable,
  generateColorClass,
} from "./generateColorsTheme.mjs";

import {
  generatePcTextVariable,
  generateTextVariable,
  generateTextClass,
} from "./generateTextsTheme.mjs";

import {
  generateShadowVariable,
  generatePcShadowVariable,
  generateShadowClass,
} from "./generateShadowsTheme.mjs";

import prettier from "prettier";

const init = (designToken) => {
  return `html { ${generateHtml(designToken)} ${generateThemeHtml(designToken)} } @media (min-width: 1080px) { html {${generatePcHtml(designToken)}}} ${generateClasses(designToken)}`;
};

const generateHtml = (designToken) => {
  return (
    generateRoundVariable(designToken) +
    generateColorVariable(designToken) +
    generateTextVariable(designToken) +
    generateShadowVariable(designToken)
  );
};

const generatePcHtml = (designToken) => {
  return (
    generatePcRoundVariable(designToken) +
    generatePcTextVariable(designToken) +
    generatePcShadowVariable(designToken)
  );
};

const generateClasses = (designToken) => {
  return (
    generateRoundClass(designToken) +
    generateColorClass(designToken) +
    generateTextClass(designToken) +
    generateShadowClass(designToken)
  );
};
// 명령줄 인수 가져오기
const args = process.argv.slice(2);
const tokenPath = args[0]; // 첫 번째 인수: design token 파일 경로
const outputPath = args[1]; // 두 번째 인수: 생성될 SCSS 파일 경로

if (!tokenPath || !outputPath) {
  console.error(
    "Error: Please provide both the token file path and output file path."
  );
  console.log("Usage: node generateTheme.js ./token.json ./:result.scss");
  process.exit(1);
}

// 절대 경로로 변환
const absoluteTokenPath = path.resolve(tokenPath);
const absoluteOutputPath = path.resolve(outputPath);

// Design Token 파일 읽기
if (!fs.existsSync(absoluteTokenPath)) {
  console.error(`Error: Design token file not found at ${absoluteTokenPath}`);
  process.exit(1);
}

fs.readFile(absoluteTokenPath, "utf-8", async (err, data) => {
  if (err) {
    console.error(`Error reading design token file: ${err.message}`);
    process.exit(1);
  }

  try {
    // JSON 파싱
    const designToken = JSON.parse(data);

    // SCSS 파일 저장
    const outputDir = path.dirname(absoluteOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // 디렉토리가 없으면 생성
    }

    const result = await prettier.format(init(designToken), { parser: "scss" });

    fs.writeFile(absoluteOutputPath, result, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing SCSS file: ${writeErr.message}`);
        process.exit(1);
      }
      console.log(`SCSS file successfully created at ${absoluteOutputPath}`);
    });
  } catch (parseErr) {
    console.error(`Error parsing design token JSON: ${parseErr.message}`);
    process.exit(1);
  }
});
