require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const QuotesRepository = require("../../application/interfaces/quotesRepository");
const { model : mongooseModel } = require("mongoose");
const { response } = require("express");

const geminiApiKey = process.env.GEMINI_API_KEY;

const genAi = new GoogleGenerativeAI(geminiApiKey);
const model = genAi.getGenerativeModel({
    model : 'gemini-1.5-flash'
}); 

class GeminiApi extends QuotesRepository{

    async getDailyQuotes(){
        const prompt = `Please provide three inspirational quotes for meditation , one for each part of the day: morning , noon ,and evening. Return the response in JSON format with the following structure: 
        {
            "morningQuote" : "Your morning quote here" ,
            "noonQuote" : "Your noon quote here" ,
            "eveningQuote" : "Your evening quote here"
        } 
        return the json only without using the keyword json`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }

    async getAdviceByMood(mood){
        const prompt = `Based on my current mood, provide a mental health exercise or meditation advice in the following format:
            {
                "advice": "Your advice goes here"
            }
            Examples : 
            when mood is anxious
            {
                "advice" : "Try a simple deep breathing exercise. Inhale for 4 seconds, hold for 4, exhale 
                                for 4. Repeat until you feel more centered."
            }
            when mood is tired
            {
                "advice": "Practice a body scan meditation to relax tense muscles and promote restful sleep."
            }

            Please tailor the advice specifically to my mood, and ensure the response is returned in the exact format without using the keyword json.

            Mood: ${mood}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
}

module.exports = GeminiApi;