"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_i18next_1 = __importDefault(require("next-i18next"));
const nexti18n = new next_i18next_1.default({
    defaultLanguage: 'en',
    otherLanguages: ['jp']
    // browserLanguageDetection: false,
    // serverLanguageDetection: false,
    // shallowRender: true
    // debug: true
});
exports.default = nexti18n;
exports.appWithTranslation = nexti18n.appWithTranslation, exports.withTranslation = nexti18n.withTranslation;
