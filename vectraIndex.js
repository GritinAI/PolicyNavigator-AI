import {index, generateVectraIndex} from './utils';
import {instantiateEmbeddingModel, generateEmbedding} from './utils';
import {chunkText, addItem} from './utils';
import {queryVectorIndex} from './utils';


generateVectraIndex();

let extractor = instantiateEmbeddingModel();
