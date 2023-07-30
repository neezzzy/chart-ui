import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const llm = new OpenAI({ openAIApiKey: openaiApiKey });
const prompt = PromptTemplate.fromTemplate(
  "respond with just a single line of text for use in a react-flow app for the user entered query:{prompt}"
);

const chain = new LLMChain({
  llm,
  prompt,
});

const OpenAiChain = async (prompt: string) => {
  // Run is a convenience method for chains with prompts that require one input and one output.
  const result = await chain.run(prompt);
  return result;
};

export default OpenAiChain;
