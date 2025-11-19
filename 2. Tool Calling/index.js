import 'dotenv/config';
import { Agent, run } from "@openai/agents";

const location = 'India';

const helloAgent = new Agent({
    name: 'Hello-Agent',
    instructions: function () {
        if (location.toLowerCase().includes('india')) {
            return 'Greet the user with Namaste.'
        } else {
            return 'Greet the user with Hello.'
        }
    }
});

const res = await run(helloAgent, 'Hello! I am Harsh and I love to eat Non-Veg Dishes!');

console.log('Agent:', res.finalOutput);