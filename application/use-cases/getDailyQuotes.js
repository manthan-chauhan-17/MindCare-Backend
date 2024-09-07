const { text } = require("express");
const Meditation = require("../../domain/entities/meditation");
const UseCaseInterface = require("../interfaces/useCaseInterface");

class GetDailyQuotes extends UseCaseInterface{
    constructor(quotesRepository){
        super();
        this.quotesRepository = quotesRepository;
    }

    async execute(){
        const quotesData = await this.quotesRepository.getDailyQuotes();
        return new Meditation({text : quotesData});
    }
}
module.exports = GetDailyQuotes;