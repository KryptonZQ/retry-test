
import { retry } from "resilient-retry-js";

let attempts = 0;

async function fetchData() {
  attempts++;

  console.log(`Attempt ${attempts}`);

  if (attempts < 3) {
    throw new Error("Temporary failure");
  }

  return "Data fetched successfully!";
}

async function main() {
  try {
    const result = await retry(fetchData, {
      retries: 3,
      delay: 500,
      backoff: "exponential"
    });

    console.log("\nResult:", result);
    console.log("Total attempts:", attempts);
  } catch (error) {
    console.error("Operation failed:", error.message);
  }
}

main();
