require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const reactTo_F = ['😭', '😢', '🙁', '😞', '☹️', '😦', '):', ':(', ')=', '=(', 'd:', 'd='];
const lastFiveMessages = ['', '', '', '', ''];

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	if (checkForTooManyRepeats(message)) {
		return;
	}
	checkForDirections(message);
	checkForGameReactions(message);
	checkForFReactions(message);
	checkForServerDownMessages(message);
	checkForOtherReactions(message);

});

function checkForTooManyRepeats(message) {
	lastFiveMessages.push(message.content.toLowerCase());
	lastFiveMessages.shift();

	// checks to see if the last five messages were the same, if so, yell at the most recent message-sender;
	try {
		if (lastFiveMessages.every((val, i, arr) => val === arr[0])) {
			message.channel.send(`calm it down, <@${message.member.user.id}>!`);
			return true;
		}
	}
	catch(err) {
		message.channel.send('Whoah, something just happened that almost broke me. Dunno what, tho. Don\'t do that again!');
	}

}

function checkForDirections(message) {

	let msg = message.content.toLowerCase();
	let directions;
	const params = new Array;
	/*
	thought process:
	- see if the message starts with the command char (!)
	parse out the message. If it's just one word, use that word. If it's more than one word, take the first word as the command and see if the remaining "word(s)" are valid parameters
	*/
	if(msg.startsWith('!')) {
		console.log('receiving instructions: ' + msg);
		const firstSpace = msg.indexOf(' ', msg);
		console.log(firstSpace);
		if (firstSpace > -1) {
			directions = msg.substring(1, msg.indexOf(' ', msg));
			msg = msg.substring(msg.indexOf(' ', msg), msg.length);
			console.log ('directions shortened: now it\'s just ' + msg);
		}
		else {
			directions = msg.substring(1, msg.length);
		}
		console.log('d: ' + directions);
	}

	if(message.content.includes('-')) {
		console.log('found - at ' + msg.indexOf('-', msg));
		for (let i = 2; i <= msg.length; i++) {
			params.push(msg.substring(i, i + 1));
		}
		console.log('p: ' + params);
	}

	switch(directions) {
	case 'pop':
		bubbleWrap(message, params);
		break;
	case 'help':
		showHelp(message);
		break;
	case 'scold':
		if (message.member.user.id == 687656633119408174) {
			scold();
		}

	}

}

function showHelp(message) {

	if (message.content === lastFiveMessages[0]) {
		message.channel.send('I ... just ... told you everything I can do. Nothing has changed.');
		return;

	}
	let msg = '';
	console.log(message.member.user.id);
	if (message.member.user.id == 687656633119408174) {
		msg += 'Hello father! Here\'s what I can do so far:';
	}
	else {
		msg += 'Well hey there, <@' + message.member.user.id + '>! I\'m F Bot. I was written by <@687656633119408174>. Here\'s some of the stuff I can do so far:';
	}
	msg += '\n';
	msg += 'If you type just the letter **f**, I\'ll respond with the F emoji. I\'ll do the same if you have a sadface emoji somewhere in your message.';
	msg += 'I\'ll also try to interpret if you\'re sending a sad message; I\'ll reply the same.';
	msg += '\n\n';
	msg += 'If you type **rip**, I\'ll react with a skull emoji. I\'m trying to learn how to ignore when you\'re using "rip" as a verb - let me know how I\'m doing!';
	msg += '\n\n';
	msg += 'If you reference a game that I know, I\'ll react with the game\'s logo.';
	msg += '\n\n';
	msg += 'If you type **!pop**, I\'ll make some bubble wrap for you.';
	msg += '\n\n';
	msg += 'I get excited if you type **!fbot**';
	msg += '\n\n';
	msg += 'I\'m always excited to learn something new! If you have ideas, let me know!';
	try {
		message.channel.send(msg);
	}
	catch(err) {
		message.channel.send('Whoah, something just happened that almost broke me. Dunno what, tho. Don\'t do that again!');
	}

}

function bubbleWrap(message, params) {
	let popMsg = '';
	let popSize = 8;
	if (params[0] === 's') {
		message.channel.send('Here\'s your tiny bubble wrap, <@' + message.member.user.id + '>!');
		popSize = 5;
	}
	else if (params[0] === 'm') {
		message.channel.send('Here\'s your medium bubble wrap, <@' + message.member.user.id + '>!');
		popSize = 10;
	}
	else if (params[0] === 'l') {
		message.channel.send('Here\'s your big bubble wrap, <@' + message.member.user.id + '>!');
		popSize = 14;
	}
	else {
		try {
			message.channel.send('Here\'s your bubble wrap, <@' + message.member.user.id + '>!');
		}
		catch(err) {
			message.channel.send('Whoah, something just happened that almost broke me. Dunno what, tho. Don\'t do that again!');
			return;
		}
	}
	for (let i = 0; i < popSize; i++) {
		for (let k = 0; k < popSize; k++) {
			popMsg += '||POP|| ';
		}
		popMsg += '\n';
	}

	try {
		message.channel.send(popMsg);
	}
	catch(err) {
		message.channel.send('Whoah, something just happened that almost broke me. Dunno what, tho. Don\'t do that again!');
	}

}

function checkForGameReactions(message) {

	message.content = message.content.toLowerCase();
	const noSpaceMessage = message.content.replace(/\s/g, '');

	// OVERWATCH

	if (message.content.includes('overwatch') || noSpaceMessage === 'overwatch') {
		message.react('700423350257844335');
	}
	if (message.content.includes(' ow ') || message.content.startsWith('ow ') || message.content.endsWith(' ow') || message.content === 'ow' || message.content === 'ow?' || message.content === 'ow!' || message.content.endsWith(' ow?') || message.content.endsWith(' ow!')) {
		message.react('700423350257844335');
	}


	// CS:GO
	if (message.content.includes('cs:go') || message.content.includes('csgo') || message.content.includes('counterstrike') || message.content.includes('counter strike')) {
		message.react('700699925675245579');
	}

	// MW
	// https://cdn.discordapp.com/emojis/709755370083713037.png?v=1
	if (message.content.includes('mw') || message.content.includes('modern warfare') || message.content.includes('codmw') || message.content.includes('warzone')) {
		message.react('709755370083713037');
	}

	// VALORANT
	if (message.content.includes('valorant') || noSpaceMessage === 'valorant') {
		message.react('703211593022046278');
	}
	if (message.content.includes(' val ') || message.content.startsWith('val ') || message.content.endsWith(' val') || message.content === 'val' || message.content === 'val?' || message.content === 'val!' || message.content.endsWith(' val?') || message.content.endsWith(' val!')) {
		message.react('703211593022046278');
	}
}

function checkForServerDownMessages(message) {
	/* js pseudocode
	if (("is" OR "are") are present AND ("down") is present) {
	  if ("who" or "anyone") is present) {
	    assume "who wants to/is anyone down" => no F
	} else {
	    assume "statement: X is down" or "statement: X are down" or "question: is X down" or question: "are X down" => F
	}*/
	if (message.content.includes('down') && (message.content.includes('is') || message.content.includes('are'))) {
		if (!(message.content.includes('who') || message.content.includes('anyone') || message.content.includes('anybody') || message.content.includes('any body') || message.content.includes('?'))) {
			message.react('🇫');
		}
	}
}


function checkForFReactions(message) {
	// F BOT MADNESSSSSSS
	if (message.content === 'f') {
		message.react('🇫');
	}

	if (message.content.startsWith('dang')) {
		message.react('🇫');
	}

	if (message.content.includes('welp')) {
		message.react('🇫');
	}


	if (!message.content.includes('http')) {
		reactTo_F.forEach(async function(validReaction) {
			if(message.content.includes(validReaction)) {
				message.react('🇫');
			}
		});
	}
	/*
	if (message.content.includes('😭') || message.content.includes('😢') || message.content.includes('🙁') || message.content.includes('😞') || message.content.includes('☹️') || message.content.includes('😦') || message.content.includes('):') || message.content.includes(':(') || message.content.includes(')=') || message.content.includes('=(') || message.content.includes('D:') || message.content.includes('D=')){
		message.react('🇫');
	}
	*/
	if (message.content.includes(' rip ') || message.content.startsWith('rip ') || message.content.endsWith(' rip') || message.content === 'rip') {
		if (!message.content.includes('paper') && !message.content.includes('to rip') && !message.content.includes('rip a')) {
			message.react('💀');
		}
	}

	if (message.content === '!fbot') {
		const randResponse = Math.floor(Math.random() * 4);
		console.log(randResponse);
		if(randResponse === 0) {
			message.react('🇫')
				.then(() => message.react('🇧'))
				.then(() => message.react('🇴'))
				.then(() => message.react('🇹'))
				.then(() => message.react('‼️'))
				.catch(() => console.error('One of the emojis failed to react.'));
		}
		else if (randResponse === 1) {
			message.react('🇨')
				.then(() => message.react('🇪'))
				.then(() => message.react('🇸'))
				.then(() => message.react('🇹'))
				.then(() => message.react('🇲'))
				.then(() => message.react('🇴'))
				.then(() => message.react('🇮'))
				.then(() => message.react('‼️'))
				.catch(() => console.error('One of the emojis failed to react.'));

		}
		else if (randResponse === 2) {
			message.react('🇸')
				.then(() => message.react('🇺'))
				.then(() => message.react('🇵'))
				.catch(() => console.error('One of the emojis failed to react.'));

		}
		else if (randResponse === 3) {
			message.react('😘')
				.then(() => message.react('👋'))
				.catch(() => console.error('One of the emojis failed to react.'));

		}

	}
}

function checkForOtherReactions(message) {
	if (message.content.includes('corona') && !(message.content.includes('beer') || message.content.includes('lite') || message.content.includes('light'))) {
		message.react('😷');
	}

	if (message.content.includes('good bot') && !(message.content.includes('not a') || message.content.includes('isn\'t a')))	{
		message.react('♥');
	}

	if ((message.content.includes('love') && (message.content.includes('fbot'))) && !(message.content.includes('do not') || message.content.includes('don\'t') || message.content.includes('dont')))	{
		message.react('😘');
	}
}

function scold() {
	// if
}

client.login(process.env.BOT_TOKEN);