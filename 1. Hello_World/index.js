import 'dotenv/config'
import { Agent, run } from "@openai/agents"

const helloAgent = new Agent({
    name: 'Hello-Agent',
    instructions: 'You are a agent that has to just greet the user with users name.'
})

const res = await run(helloAgent, 'Hello! I am Harsh and I love to eat Non-Veg Dishes!')

console.log('Agent:', res.finalOutput)
