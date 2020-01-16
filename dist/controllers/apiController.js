"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
class ApiCotroller {
    constructor() {
        this.access_token = 'EAAUXzfmYs1MBAN5ZBQVNdLfC4i282mk4FTa0fOLGLkq74jaBGb0KPL45Hi83IZA1fjqLtPQ9CZBpaD9oHeSufdcdFQXa27JA2FNY6vawZBgzLmgEDgSDieOarpjRhfJPCkjdd5I4txNOD6hmYrg3qwSG0Kgxlvgpyx8XDqLMH74yZA1UVXEelyT71I08TZCLsKtqpj09ntUMeiWZB7Qnin9VA4aZBZAsPlEAc4YpIF7L8VgZDZD';
    }
    getLocation(q) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield axios.get(`https://graph.facebook.com/search?type=place&q=cafe&fields=name&limit=10&q=${q}&access_token=${this.access_token}`);
                return locations;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = ApiController;
//# sourceMappingURL=apiController.js.map