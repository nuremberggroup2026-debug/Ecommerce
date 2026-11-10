import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import pg from "pg";

const { Pool } = pg;

let checkpointerInstance: PostgresSaver | null = null;
let isSetupComplete = false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const getPostgresCheckpointer = async (): Promise<PostgresSaver> => {
  if (!checkpointerInstance) {
    checkpointerInstance = new PostgresSaver(pool);
  }

  if (!isSetupComplete) {
    await checkpointerInstance.setup();
    isSetupComplete = true;
    console.log("✅ LangGraph Postgres checkpointer tables verified/created.");
  }

  return checkpointerInstance;
};
