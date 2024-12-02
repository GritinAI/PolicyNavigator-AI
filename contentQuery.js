import {index} from './utils';
import {instantiateEmbeddingModel, generateEmbedding} from './utils';
import {chunkText, addItems} from './utils';
import {queryVectorIndex} from './utils';

let chunks = chunkText(pageContent);
let topK = 5;

let extractor = instantiateEmbeddingModel();

const pageContent = document.body.innerText;
addItems(chunks);

let queryText = "Nevermore!";

let queryOutputs = queryVectorIndex(queryText, extractor, topK);

let tasks = ['summarization', 'generation', 'rewriting']
let myMap = {
    'summarization': 'summarize',
    'generation': 'generator'
}

let systemPrompt = "You are a useful assistant";
let task = "Your job is to summarize the text provided below:\n"

let basePrompt = ""

