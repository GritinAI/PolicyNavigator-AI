import {index} from './utils';
import {instantiateEmbeddingModel, generateEmbedding} from './utils';
import {chunkText, addItems} from './utils';
import {queryVectorIndex} from './utils';

const pageContent = document.body.innerText;

let chunks = chunkText(text=pageContent);

addItems(chunks);

