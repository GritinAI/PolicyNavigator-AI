



async function generateTranslator(sourceLanguage='en', targetLanguage='fr') {

  let available = await translation.canTranslate({
    sourceLanguage: sourceLanguage,
    targetLanguage: targetLanguage,
  });

  if (available == 'readily') {

    return await self.translation.createTranslator({
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
    });
  }
  else{
    return -1;
  }
}


async function generateTextTranslation(
    text,
    translator,
){
  return await translator.translate(
      longText,
  );
}


// Unused!!!
async function generateStreamingTextTranslation(
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

// Unused!!!
async function displayStreamingTextTranslation(stream){
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
