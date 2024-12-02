
const options = {
  sharedContext: 'This is a scientific article',
  type: 'key-points',
  format: 'markdown',
  length: 'medium',
};

async function generateTextGenerator(){

    const {available, defaultTemperature, defaultTopK, maxTopK } =
        await chrome.aiOriginTrial.languageModel.capabilities();

    if (available !== 'no') {
        if (available == 'after-download') {
            const session = await chrome.aiOriginTrial.languageModel.create();
        }
        else {
            const session = await chrome.aiOriginTrial.languageModel.create({
                monitor(m) {
                    m.addEventListener("downloadprogress", (e) => {
                        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                    });
                },
            });
        }
        // Prompt the model and wait for the whole result to come back.

    }
  return await summarizer.summarize(
      longText,
      {
        context: context
      }
  );
}


async function generateTextSummary(
    text,
    summarizer,
    context = 'This article is intended for a tech-savvy audience.'
){

    const {available, defaultTemperature, defaultTopK, maxTopK } =
        await chrome.aiOriginTrial.languageModel.capabilities();

    if (available !== 'no') {
        if (available == 'after-download') {
            const session = await chrome.aiOriginTrial.languageModel.create();
        }
        else {
            const session = await chrome.aiOriginTrial.languageModel.create({
                monitor(m) {
                    m.addEventListener("downloadprogress", (e) => {
                        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                    });
                },
            });
        }
        // Prompt the model and wait for the whole result to come back.
        const result = await session.prompt('Write me a poem!');
        console.log(result);
    }
  return await summarizer.summarize(
      longText,
      {
        context: context
      }
  );
}


async function generateStreamingTextSummary(
    text,
    summarizer,
    context = 'This article is intended for a tech-savvy audience.'
){
  return await summarizer.summarizeStreaming(
      longText,
      {
        context: context
      }
  );
}


async function displayStreamingTextSummary(stream){
  let result = '';
  let previousChunk = '';

  for await (const chunk of stream) {
    const newChunk = chunk.startsWith(previousChunk)
        ? chunk.slice(previousChunk.length) : chunk;
    console.log(newChunk);
    result += newChunk;
    previousChunk = chunk;
  }
  console.log(result);
}