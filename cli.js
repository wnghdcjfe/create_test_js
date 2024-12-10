#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const testDir = path.join(__dirname, 'tests');

function createTestFile(functionName) {
  const testFilePath = path.join(testDir, `${functionName}.test.js`);

  // 테스트 템플릿 내용 (일반화된 구조)
  const testFileContent = `
const { expect } = require('chai');
const ${functionName} = require('../src/${functionName}');

describe('${functionName} 함수 테스트', () => {
  it('함수가 정의되어 있어야 함', () => {
    expect(${functionName}).to.be.a('function');
  });

  it('기본 동작 확인 - 예시 테스트', () => {
    // 함수 실행 결과를 수정하거나 제거 가능
    const result = ${functionName}();
    expect(result).to.not.be.undefined;
  });
});
  `.trim();

  // 이미 존재하는 파일 검사 및 생성
  if (!fs.existsSync(testFilePath)) {
    fs.writeFileSync(testFilePath, testFileContent, 'utf8');
    console.log(`✅ 테스트 파일 생성됨: ${testFilePath}`);
  } else {
    console.log(`⚠️ 이미 존재하는 테스트 파일: ${testFilePath}`);
  }
}


if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
}

fs.readdirSync(srcDir).forEach(file => {
  const functionName = path.basename(file, '.js');
  createTestFile(functionName);
});
