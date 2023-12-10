import { Ollama } from "langchain/llms/ollama";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const llm = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2", // Default value
});

const prompt = PromptTemplate.fromTemplate(
  "respond with just a single line of text, no more than 5 words, for the user entered query:{prompt}"
);

const chain = new LLMChain({
  llm,
  prompt,
});

const OllamaAiChain = async (prompt: string) => {
  const result = await chain.run(prompt);
  return result;
};

export default OllamaAiChain;
