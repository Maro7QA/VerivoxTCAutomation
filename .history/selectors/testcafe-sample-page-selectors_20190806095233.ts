import { Selector } from 'testcafe';
export const firstInputBox = Selector('input[type=text]').nth(0);
export const secondInputBox = Selector('input[type=text]').nth(1);
export const userNameInputBox = Selector('input#developer-name[type=text]');
export const submitButton = Selector('button[type=submit]');
export const resultContent = Selector('div.result-content');
export const powerSection = Selector('body > div.page-container > header > div.page-navigation > div > nav > ul > li:nth-child(2)');
export const oekoStromSection = Selector('#mps-tab-2');

