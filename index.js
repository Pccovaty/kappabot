const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const moment = require("moment");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


const serverStats = {
  guildID: "516351264318291968",
  totalUsersID: "522479632528703488",
  botCountID: "522479718092767233",
  onlinecountID: "522480381526802456"

};
bot.on("guildMemberAdd", member => {
  
  if (member.guild.id !== serverStats.guildID) return;

  bot.channels.get(serverStats.totalUsersID).setName(`|👥| Osób: ${member.guild.memberCount}`);
  bot.channels.get(serverStats.onlinecountID).setName(`|👭| ${member.user.tag}`);
  bot.channels.get(serverStats.botCountID).setName(`|🤖| Boty: ${member.guild.members.filter(m => m.user.bot).size}`);
});
bot.on("guildMemberRemove", member => {

  if (member.guild.id !== serverStats.guildID) return;

  bot.channels.get(serverStats.totalUsersID).setName(`|👥| Osób: ${member.guild.memberCount}`);
  bot.channels.get(serverStats.botCountID).setName(`|🤖| Boty: ${member.guild.members.filter(m => m.user.bot).size}`);
});
bot.on("guildMemberAdd", async member => {

  console.log(`${member.id} dołączył(a) na serwer.`);

  const welcomechannel = member.guild.channels.find("name", "lobby");
  const welcomeEmebed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Witaj **${member.user.username}** na **${member.guild.name}** Cieszymy się że z nami jesteś! \n jest nas obecnie: ${member.guild.memberCount}`)
  welcomechannel.send(welcomeEmebed);
});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} wyszedł z serwera.`);

  const welcomeechannel = member.guild.channels.find("name", "lobby");
  const welcomeeEmebed = new Discord.RichEmbed()
  .setColor("#323438")
  .setDescription(`**${member.user.tag}** opuścił(a) **${member.guild.name}**`)
  
  welcomeechannel.send(welcomeeEmebed);
});
bot.on(`message`, async message => {
  if(message.content ===  `/reboot`) { 
if (message.author.id === "340557425511759892") {
  message.channel.send(":gear: ponowne uruchamianie...")
  
  bot.destroy()
  bot.login(process.env.TOKEN)
message.channel.send(":gear: ponownne uruchamianie...")
} else {
	
message.channel.send("Tylko Autor bota moze uzyc tej komendy.")
  
  }
  }
});
bot.on("message", async message => {
  if (message.content === "<@478200725340553226>") {
    return message.channel.send("<:Info:484996951515856906> | mój prefix to ``/``.");
  }

});
bot.on("ready", async() => {	
 let guild = bot.guilds.get('516351264318291968');	
 
      let all = 0;	
     let offline = 0;	
 
      const interval = setInterval(function () {	
         let guild = bot.guilds.get('516351264318291968');	
         guild.members.forEach(member => {	
 
              if (!member.user.bot) all++;	
             if (member.user.presence.status == 'offline' && !member.user.bot) offline++;	
         });	
 
       let online = all - offline;	
 
          bot.channels.get('522482489554632725').setName("|🔵| Online: " + online);	
 
          all = 0;	
         offline = 0;	
 
       }, 1 * 5000);	
 
  });
bot.on("ready", async() => {
      setInterval(async () => {
    const statuslist = [
      `BOT by Kociak#0001`,
      `/help | 2.2.1`,
      `Centrum Chillu ♥`
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      await bot.user.setPresence({
        game: {
          name: `${statuslist[random]}`,
          type: "WATCHING"
          //url: 'https://www.twitch.tv/spokloo'
        },
        status: "dnd"
      });
    } catch (error) {
      console.error(error);
    }
  }, 10000);

 });
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    bot.on('error', console.error);


     if(cmd === `${prefix}ping`){	
        const then = Date.now();	
  message.channel.send("Ping... ").then(m => {	
    m.edit(`Pong! Twój aktualny ping wynosi ${Date.now() - then}ms.`);	
  });	
  message.react("452183703267835910");	
    }	


    if(cmd === `${prefix}kick`){	
      const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!kUser) return message.channel.send("Nie znaleziono użytkownika");
const kReason = args.join(" ").slice(22);
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie możesz wyrzucić tej osoby!!");
if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie możesz wyrzucić tej osoby!");
message.channel.send(`Pomyślnie wyrzucono użytkownika: **${kUser}**, Powód: ${kReason}`);
message.guild.member(kUser).kick(kReason);

const kickeembed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#29ff00")
  .addField("Moderator", message.author.tag)
  .addField("Wyrzucony", kUser.user.tag)
  .addField("Powód", kReason)

  const incidentchannel = message.guild.channels.find("name", "logi-kar");
  if (!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału. ``logi-kar``");

  incidentchannel.send(kickeembed);
    }


    if(cmd === `${prefix}ban`){	

   const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));	
  if (!member) return message.channel.send("Oznacz użytkownika!");	
  const bReason = args.join(" ").slice(22);	
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");	
  if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");	
  const banEmbed = new Discord.RichEmbed()	
    .setDescription("~Ban~")	
    .setColor("#9b0090")	
    .addField("Moderator", message.author.tag)	
    .addField("Zbanowany Użytkownik", `${member.user.tag}`)	
    .addField("Powód", bReason);	

   const incidentchannel = message.guild.channels.find("name", "logi-kar");	
  if (!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału. ``logi-kar``");	
  message.channel.send(`Pomyślnie zbanowano użytkownika: ${member.user.tag}, Powód: **${bReason}**, `);	



   message.guild.member(member).ban(bReason);	
  incidentchannel.send(banEmbed);	
  message.react("452183703267835910");	


     }	
    if(cmd === `${prefix}help`){	
      const help = new Discord.RichEmbed()
.setTitle("Lista kategorii:")
.setColor("GREEN")
.setDescription("Aby wyświetlić całkowitą liste komend do podanej kategorii wpisz ``/help [nazwa kategorii]`` \n \n ``administracyjne (7)`` \n ``zabawa (X)``")
const administracyjne = new Discord.RichEmbed()
.setTitle("Lista komend w kategorii: Administracyjne")
.setDescription("``/ban <@user> <powód>`` - Banuje użytkownika \n \n ``/kick <@user> <powód>`` - Wyrzuca użytkownika \n \n ``/clear <liczba wiadomości>`` - usuwa X liczbe wiadomości (nie moze byc mniejsza od 1 ani wieksza od 100) \n \n ``/mute <@user> <powod>`` - Wycisza użytkownika \n \n ``/unmute <@user> <powód>`` - Odcisza użytkownika \n \n ``/warn <@user> <powód>`` - Ostrzega użytkownika")
.setColor("RED")
const zabawa = new Discord.RichEmbed()
.setTitle("Lista komend w kategorii: Zabawa")
.setDescription("``/ping`` - pokazuje twój aktualny ping \n \n ``Więcej komend już wkrótce!")
.setColor("RED")
if (args[0] == "administracyjne"){
        message.channel.send(administracyjne)
      } else if (args[0] == "zabawa"){
        message.channel.send(zabawa)
      } else {
     message.channel.send(help)  
    }


     }	


    if(cmd === `${prefix}mute`){	

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      if(args[0] == "help"){
        message.reply("Poprawne użycie: /mute <@user> <1s/m/h/d>");
        return;
      }
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("Najpierw Oznacz użytkownika");
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      let reason = args.slice(2).join(" ");
      if(!reason) return message.reply("Podaj przyczynę wyciszenia.");
    
      let muterole = message.guild.roles.find(`name`, "Muted");
      //start of create role
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      //end of create role
      let mutetime = args[1];
      if(!mutetime) return message.reply("Nie określiłeś(aś) czasu!");
    
      message.delete().catch(O_o=>{});
     let mutembed = new Discord.RichEmbed()
      .setTitle("Mute")
      .setColor("#ff0000")
      .setDescription(`użytkownik ${tomute} został wyciszony przez **${message.author.tag}** \n  na czas **${mutetime}** \n **powód:** ${reason}`)
      .setFooter("Centrum Chillu | Zapraszamy!")
      try{
        await tomute.send(mutembed)
      }catch(e){
        message.channel.send(`Użytkownik został wyciszony lecz jego DM jest zablokowane. Został wyciszony na ${mutetime}`)
      }
    
      let muteembed = new Discord.RichEmbed()
      .setDescription(`Mute`)
      .setColor("#050505")
      .addField("Moderator", message.author.tag)
      .addField("Wyciszony użytkownik", tomute.user.tag)
      .addField("Na czas", mutetime)
      .addField("Powód", reason);
    
      let incidentschannel = message.guild.channels.find(`name`, "logi-kar");
      if(!incidentschannel) return message.reply("Nie znalazłem kanału ``logi-kar``");
      incidentschannel.send(muteembed);
    
      await(tomute.addRole(muterole.id));
    let muteset = new Discord.RichEmbed()
      .setTitle("Mute")
      .setColor("#56f546")
      .setDescription(`\n Twoje wyciszenie dobiegło końca. \n`)
      .setFooter("Centrum chillu | Zapraszamy spowrotem!")
      setTimeout(function(){
        
        tomute.removeRole(muterole.id);
        tomute.send(muteset);
      }, ms(mutetime));
    
    
    //end of module
  
  }


     if(cmd === `${prefix}clear`){	

      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      if (!args[0]) return message.channel.send("Prawidłowe użycie to ``/clear [liczba wiadomosci od 1 do 100]``");
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`usunięto **${args[0]}** wiadomości.`).then(msg => msg.delete(2000));
      });

     }	
    if(cmd === `${prefix}warn`){	
      const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    message.react("452183703267835910");
    //!warn @daeshan <reason>
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!wUser) return message.reply("Nie mogłem znaleźć użytkownika");
    const reason = args.join(" ").slice(22);
  
    if (!warns[wUser.id]) {
      warns[wUser.id] = {
        warns: 0
      };
    }
  
    warns[wUser.id].warns++;
  
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
    });
  
    const warnEmbed = new Discord.RichEmbed()
      .setAuthor("Warn")
      .setColor("#9b0090")
      .addField("Ostrzezony przez", message.author.tag)
      .addField("Ostrzeżony użytkownik", `${wUser.user.tag}`)
      .addField("Powód", reason)

  
    const warnchannel = message.guild.channels.find("name", "logi-kar");
    if (!warnchannel) return message.reply("Nie znalazłem kanału ``logi-kar``");
  
    warnchannel.send(warnEmbed);
  
    if (warns[wUser.id].warns === 3) {
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> został/a zbanowany/a za maksymalną liczbę ostrzeżeń ``3`` `);
    }
    message.channel.send(`Pomyślnie ostrzeżono użytkownika: **${wUser.user.tag}**`);
 }
    if(cmd === `${prefix}unmute`){	
      if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send(":lock: Dostęp zablokowany. nie posiadasz roli ``Moderator``");

      const toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if (!toMute) return message.channel.send("Prawidłowe użycie to: ``/unmute <@user>``");
      const role = message.guild.roles.find(r => r.name === "Muted");
      if (!role || !toMute.roles.has(role.id)) return message.channel.send("Ten użytkownik jest już odciszony!");
    
      await toMute.removeRole(role);
      message.channel.send(`Pomyślnie odciszono użytkownika ${toMute.user.tag}`);
    
    }	

});
bot.login(process.env.BOT_TOKEN);
