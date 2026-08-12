export const chunkText = (
    text,
    chunkSize = 500,
    overlap = 50
) => {

    // check empty text
    if (!text || text.trim().length === 0) {
        return [];
    }

    // clean text
    const cleanedText = text
        .replace(/\r\n/g, '\n')
        .replace(/\s+/g, ' ')
        .replace(/\n /g, '\n')
        .replace(/ \n/g, '\n')
        .trim();

    // split into paragraphs
    const paragraphs = cleanedText
        .split(/\n+/)
        .filter(p => p.trim().length > 0);

    const chunks = [];

    let currentChunk = [];
    let currentWordCount = 0;
    let chunkIndex = 0;

    // process paragraphs
    for (const paragraph of paragraphs) {

        const paragraphWords = paragraph.trim().split(/\s+/);
        const paragraphWordCount = paragraphWords.length;

        // if single paragraph exceeds chunk size
        if (paragraphWordCount > chunkSize) {

            // save existing chunk first
            if (currentChunk.length > 0) {

                chunks.push({
                    content: currentChunk.join('\n\n'),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0
                });

                currentChunk = [];
                currentWordCount = 0;
            }

            // split large paragraph into smaller chunks
            for (
                let i = 0;
                i < paragraphWords.length;
                i += (chunkSize - overlap)
            ) {

                const chunkWords = paragraphWords.slice(
                    i,
                    i + chunkSize
                );

                chunks.push({
                    content: chunkWords.join(' '),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0
                });

                // stop if reached end
                if (i + chunkSize >= paragraphWords.length) {
                    break;
                }
            }

            continue;
        }

        // if adding paragraph exceeds chunk size
        if (
            currentWordCount + paragraphWordCount > chunkSize &&
            currentChunk.length > 0
        ) {

            // save current chunk
            chunks.push({
                content: currentChunk.join('\n\n'),
                chunkIndex: chunkIndex++,
                pageNumber: 0
            });

            // create overlap
            const prevChunkText = currentChunk.join(' ');

            const prevWords = prevChunkText.split(/\s+/);

            const overlapText = prevWords
                .slice(
                    -Math.min(overlap, prevWords.length)
                )
                .join(' ');

            // start next chunk with overlap
            currentChunk = [
                overlapText,
                paragraph.trim()
            ];

            currentWordCount =
                overlapText.split(/\s+/).length +
                paragraphWordCount;

        } else {

            // add paragraph normally
            currentChunk.push(paragraph.trim());

            currentWordCount += paragraphWordCount;
        }
    }

    // save remaining chunk
    if (currentChunk.length > 0) {

        chunks.push({
            content: currentChunk.join('\n\n'),
            chunkIndex: chunkIndex++,
            pageNumber: 0
        });
    }

    return chunks;
};





export const findRelevantChunks = (
    chunks,
    query,
    maxChunks = 3
) => {

    // check empty values
    if (!chunks || chunks.length === 0 || !query) {
        return [];
    }

    // common stop words
    const stopWords = new Set([
        "the",
        "is",
        "are",
        "was",
        "were",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "as",
        "that",
        "this",
        "it",
        "be",
        "has",
        "have",
        "had",
        "will",
        "can",
        "could",
        "should",
        "would",
        "about",
        "into",
        "than",
        "then",
        "them",
        "they",
        "their",
        "there",
        "what",
        "which",
        "who",
        "when",
        "where",
        "why",
        "how"
    ]);

    // clean query
    const queryWords = query
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(
            word =>
                word.length > 1 &&
                !stopWords.has(word)
        );

    // fallback if no valid query words
    if (queryWords.length === 0) {

        return chunks
            .slice(0, maxChunks)
            .map(chunk => ({
                content: chunk.content,
                chunkIndex: chunk.chunkIndex,
                pageNumber: chunk.pageNumber,
                _id: chunk._id
            }));
    }

    // score chunks
    const scoredChunks = chunks.map((chunk, index) => {

        const content = chunk.content.toLowerCase();

        const contentWords =
            content.split(/\s+/).length;

        let score = 0;

        // count matching words
        for (const word of queryWords) {

            // exact matches
            const exactMatches =
                (
                    content.match(
                        new RegExp(`\\b${word}\\b`, "g")
                    ) || []
                ).length;

            score += exactMatches * 3;

            // partial matches
            const partialMatches =
                (
                    content.match(
                        new RegExp(word, "g")
                    ) || []
                ).length;

            score +=
                Math.max(
                    0,
                    partialMatches - exactMatches
                ) * 1.5;
        }

        // unique matched words
        const uniqueWordsFound =
            queryWords.filter(word =>
                content.includes(word)
            ).length;

        if (uniqueWordsFound > 1) {
            score += uniqueWordsFound * 2;
        }

        // normalize score
        const normalizedScore =
            score / Math.sqrt(contentWords);

        // small position bonus
        const positionBonus =
            1 - (index / chunks.length) * 0.1;

        return {
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id,
            score: normalizedScore * positionBonus,
            rawScore: score,
            matchWords: uniqueWordsFound
        };
    });

    return scoredChunks
        .filter(chunk => chunk.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxChunks);
};