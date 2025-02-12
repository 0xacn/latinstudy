import Parser from "./parser/index.js";
import JSONResource from "./JSONResource.js";

export default class DataHandler {
    resources: JSONResource[];
    data: any[];
    parser: Parser;

    async initialize() {
        const deps = ["endings", "vocab"]
        // create array of Resources based on deps
        this.resources = await Promise.all(
            Array.from({
                length: deps.length
            }, (_, i) => {
                return new JSONResource(`/data/${deps[i]}.json`, deps[i]).load()
            })
        );
        this.parser = new Parser();
        this.data = [];

        return this;
    }

    parse() {
        // overwrite resources with parsed data
        for (const resource of this.resources)
            this.data.push(this.parser.parse(resource));
        
        return this.resources;
    }
}