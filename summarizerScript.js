
const options = {
  sharedContext: 'This is a scientific article',
  type: 'key-points',
  format: 'markdown',
  length: 'medium',
};

async function generateSummarizer() {

  const available = (await self.ai.summarizer.capabilities()).available;
  let summarizer;
  if (available === 'no') {
    // The Summarizer API isn't usable.
    return -1;
  }
  if (available === 'readily') {
    // The Summarizer API can be used immediately .
    summarizer = await self.ai.summarizer.create(options);
  } else {
    // The Summarizer API can be used after the model is downloaded.
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener('downloadprogress', (e) => {
      console.log(e.loaded, e.total);
    });
    await summarizer.ready;
  }

  return summarizer;
}


async function generateTextSummary(
    text,
    summarizer,
    context = 'This article is intended for a tech-savvy audience.'
){
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