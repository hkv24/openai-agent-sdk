import 'dotenv/config';
import { Agent, run, tool } from "@openai/agents";
import { z } from 'zod';
import axios from 'axios';

const WeatherResultSchema = z.object({
	city: z.string().describe('The city for which the weather is reported'),
	degree_c: z.number().describe('The current temperature in degree Celsius'),
	condition: z.string().optional().describe('The current weather condition description'),
});

const getWeatherTool = tool({
	name: 'get_weather',
	description: 'Get the current weather of a location',
	parameters: z.object({
		city: z.string().describe('The city to get the weather for')
	}),
	execute: async function ({ city }) {
		// TODO: Integrate with a real weather API
		const url = `https://wttr.in/${city.toLowerCase()}?format=%c+%t`;
		// Not accurate, just for learning purposes!
		const response = await axios.get(url, { responseType: 'text' });

		return `The current weather in ${city} is ${response.data}.`;
	}
});

// const sendEmailTool = tool({
// 	name: 'send_email',
// 	description: 'Send an email to a recipient',
// 	parameters: z.object({
// 		recipient: z.string().describe('The email address of the recipient'),
// 		subject: z.string().describe('The subject of the email'),
// 		body: z.string().describe('The body of the email')
// 	}),
// 	execute: async function({ recipient, subject, body }) {
// 		// # TODO: Integrate with a real email API
// 		return `Email sent to ${recipient} with subject "${subject}" and body "${body}"`;
// 	}
// })

const agent = new Agent({
	name: 'Weather Agent',
	instructions: `
		You are an expert weather agent, that help users to tell weather report.
	`,
	tools: [getWeatherTool],
	outputType: WeatherResultSchema
})

async function main(query = '') {
	const result = await run(agent, query);
	console.log(`Weather Agent: `, result.finalOutput);
}

main('What is the weather of Ghaziabad? Just give a report.');

`
# TODO: Tasks Pending
TODO: Tasks executed
`