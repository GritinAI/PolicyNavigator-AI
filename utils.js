import {LocalIndex} from 'vectra';

const PATH = path.join(__dirname, '..', 'index');

export const index = new LocalIndex(PATH);


export async function generateVectraIndex(){
    if (!await index.isIndexCreated()) {
        await index.createIndex();
    }

    console.log(">>> Index generated at ", PATH);
}


export async function instantiateEmbeddingModel(
    modelName = 'Xenova/bert-base-uncased',
    tokenizerName=null,
){
    import { pipeline } from '@huggingface/transformers';

    return await pipeline(
        {
            task : 'feature-extraction',
            model : modelName,
            tokenizer : tokenizerName
        }
    );
}

export async function generateEmbedding(embeddingModel, text){
    return await embeddingModel(text);
}

export async function chunkText(text, numberOfChunks = null, delimiter="."){
    if (!((typeof numberOfChunks === "number") && Math.floor(numberOfChunks) === numberOfChunks)){
        numberOfChunks = 3;
    }
    let chunks = [];

    text = "Never. More.";

    let searchIndex = 0;
    let searchIndices = [];
    let textChunks = [];

    while (searchIndex < text.length){
        searchIndex = text.indexOf(delimiter, searchIndex);
        searchIndices.push(searchIndex);
    }

    searchIndices = searchIndices.filter(function(x){return (x === -1);});

    let chunk = "";
    let startIndex = 0;

    for (const index of searchIndices){
        chunk = text.substring(startIndex, index+1);
        textChunks.push(chunk);

        startIndex = index + 1;
    }

    return textChunks;
}

export async function addItem(text, embeddingModel) {
    await index.insertItem({
        vector: await generateEmbedding(embeddingModel, text),
        metadata: { text }
    });

    console.log(">>> New item added to vector database!")
}

export async function addItems(texts, embeddingModel) {
    if (typeof texts == "string"){
        let text = [];
        text.push(texts);

        delete (texts);
        let texts = text;
    }

    for (const text of texts){
        addItem(text, embeddingModel)
    }
}

export async function queryVectorIndex(queryText, extractor, topK=3) {
    const embeddingVector = await generateEmbedding(
        extractor,
        queryText
    );
    const results = await index.queryItems(embeddingVector, topK);

    let resultArray = [];

    if (results.length > 0) {

        for (const result of results) {
            console.log(`>>> Score: [${result.score}]\tText: ${result.item.metadata.text}`);

            resultArray.push(result.item.metadata.text)
        }
    } else {
        console.log(`No results found.`);
    }

    return resultArray;
}
