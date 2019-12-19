const moveerMessage = require('../moveerMessage.js')
const helper = require('../helper.js')

async function move (args, message) {
  let messageMentions = message.mentions.users.array() // Mentions in the message
  let toVoiceChannel

  try {
	await helper.checkIfTextChannelIsAvNumbers(message)
	helper.checkArgsLength(args, 1)	  
	let toVoiceChannelName = args[0].toLowerCase()
	
	if(parseInt(toVoiceChannelName) <= 500) 
	{
		toVoiceChannelName = "AV " + toVoiceChannelName
		toVoiceChannel = helper.getChannelByName(message, toVoiceChannelName)
	
		helper.checkIfVoiceChannelExist(message, toVoiceChannel, toVoiceChannelName)
		helper.checkIfChannelIsTextChannel(message, toVoiceChannel)
		
		const userIdsToMove = [ message.author.id ]
		
		// No errors in the message, lets get moving!
		if (userIdsToMove.length > 0) helper.moveUsers(message, userIdsToMove, toVoiceChannel.id)
	}
	else if(toVoiceChannelName == "queue" || toVoiceChannelName == "q")
	{
		let toVoiceChannelName = "Waiting to Queue"
	
		toVoiceChannel = helper.getChannelByName(message, toVoiceChannelName)
		const userIdsToMove = [ message.author.id ]
		
		// No errors in the message, lets get moving!
		helper.moveUsers(message, userIdsToMove, toVoiceChannel.id)
	}
  } catch (err) {
    if (!err.logMessage) console.log(err)
    moveerMessage.logger(message, err.logMessage)
    moveerMessage.sendMessage(message, err.sendMessage)
  }
}

module.exports = {
  move
}
