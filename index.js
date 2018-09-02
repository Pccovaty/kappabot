const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const moment = require("moment");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Centrum chillu ", {type: "WATCHING"});
});
const serverStats = {
    guildID: "425741299719602195",
    totalUsersID: "485887154686263297",
    memberCountID: "485887171518267393",
    botCountID: "485887189125693450",
    onlinecountID: "485887237146279957"
    
  
  };
  bot.on("guildMemberAdd", member => {
  
    if (member.guild.id !== serverStats.guildID) return;
  
    bot.channels.get(serverStats.totalUsersID).setName(`✭ Użytkowników: ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`✭ Ludzi: ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.onlinecountID).setName(`👋 ${member.user.username}`);
    bot.channels.get(serverStats.botCountID).setName(`✭ Botów: ${member.guild.members.filter(m => m.user.bot).size}`);
  });
  bot.on("guildMemberRemove", member => {
  
    if (member.guild.id !== serverStats.guildID) return;
  
    bot.channels.get(serverStats.totalUsersID).setName(`✭ Użytkowników: ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`✭ Ludzi: ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`✭ Botów: ${member.guild.members.filter(m => m.user.bot).size}`);
  
  });

  bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} dołączył(a) na serwer.`);
  
    const welcomechannel = member.guild.channels.find("name", "👋witamy-żegnamy");
    const welcomeEmebed = new Discord.RichEmbed()
    .setColor("#9b0090")
    .addField(`**${member.user.username}** witaj na ⭐Centrum Chillu⭐! Have fun! 👻🙌`, `Koniecznie zapoznaj sie z zasadami które są na #regulamin \n aktualnie jest nas: **${member.guild.memberCount}**`);
   welcomechannel.send(welcomeEmebed);
  });
  bot.on("message", async message => {
    if (message.content === "<@478200725340553226>") {
      return message.channel.send("<:Info:484996951515856906> mój prefix to ``/``.");
    }
  
  });
  bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} wyszedł z serwera.`);
  
    const welcomechannel = member.guild.channels.find("name", "👋witamy-żegnamy");
    const welcomeEmbed = new Discord.RichEmbed()
      .setColor("#9b0090")
      .addField(`O nie! użytkownik ${member.user.username} opuścił(a) ⭐Centrum Chillu⭐ 😦`, "Nie wytrzymał(a) presji i uciekł(a) do ciepłych krajów")
      .addField(`Aktualnie zostało nas ${member.guild.memberCount}`, "Mamy nadzieje że wrócisz!")
    welcomechannel.send(welcomeEmbed);
  
  });
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

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
    .addField("Wyrzucony", kUser)
    .addField("Powód", kReason)

    const incidentchannel = message.guild.channels.find("name", "❌logi_kar");
    if (!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału. ``❌logi_kar``");

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

  const incidentchannel = message.guild.channels.find("name", "❌logi_kar");
  if (!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału. ``❌logi_kar``");
  message.channel.send(`Pomyślnie zbanowano użytkownika: ${member.user.tag}, Powód: **${bReason}**, `);



  message.guild.member(member).ban(bReason);
  incidentchannel.send(banEmbed);
  message.react("452183703267835910");


    }
    if(cmd === `${prefix}help`){
      const eambed = new Discord.RichEmbed()
      .setTitle("Komendy w bocie Chill BOT")
      .setColor('RANDOM')
      .addField("Moderator (8)", "**/mute <mention> <1s/m/h/d>** - wycisza danego użytkownika na X czasu \n **/unmute** - odcisza danego użytkownika \n **/warn** - ostrzega użytkownika \n ~~**/sprawdz** - pokazuje ile dany uzytkownik ma warnów~~ \n **/clear x** - Usuwa x wiadomości (max 100) \n **/ban** - Banuje danego użytkownika \n **/kick** - Wyrzuca danego użytkownika  \n ")
      .setFooter(`Komenda użyta przez: ${message.author.username}`, `${message.author.avatarURL}`)
    message.channel.send(eambed)

    }
    if(cmd === `${prefix}mute`){

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      if(args[0] == "help"){
        message.reply("Poprawne użycie: /mute <mention> <1s/m/h/d>");
        return;
      }
      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("Oznacz najpierw użytkownika");
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      let reason = args.slice(2).join(" ");
      if(!reason) return message.reply("Podaj przyczynę wyciszenia.");
    
      let muterole = message.guild.roles.find(`name`, "Mute");
      //start of create role
      if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "Mute",
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
        message.channel.send(`Użytkownik został wyciszony ... ale jego DM jest zablokowane. Został wyciszony na ${mutetime}`)
      }
    
      let muteembed = new Discord.RichEmbed()
      .setDescription(`Mute`)
      .setColor("#050505")
      .addField("Moderator", message.author.tag)
      .addField("Wyciszony użytkownik", tomute)
      .addField("Na czas", mutetime)
      .addField("Powód", reason);
    
      let incidentschannel = message.guild.channels.find(`name`, "❌logi_kar");
      if(!incidentschannel) return message.reply("Nie znalazłem kanału ``❌logi_kar``");
      incidentschannel.send(muteembed);
    
      await(tomute.addRole(muterole.id));
    let muteset = new Discord.RichEmbed()
      .setTitle("Mute")
      .setColor("#56f546")
      .setDescription(`\n Twoje wyciszenie się skończyło. \n`)
      .setFooter("Centrum chillu | Zapraszamy spowrotem!")
      setTimeout(function(){
        
        tomute.removeRole(muterole.id);
        tomute.send(muteset);
      }, ms(mutetime));
    
    
    //end of module

    }
    
    if(cmd === `${prefix}clear`){
      
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: Dostęp zablokowany. Nie posiadasz roli ``Moderator`` lub wyższej");
      if (!args[0]) return message.channel.send("Usuwanie wiadomości musi być większa od 0 ale mniejsza od 100");
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`usunięto **${args[0]}** wiadomości.`).then(msg => msg.delete(2000));
      });
    
      message.react("452183703267835910");

    
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
        .addField("Ostrzeżony użytkownik", `<@${wUser.id}>`)
        .addField("Liczba ostrzeżeń", warns[wUser.id].warns)
        .addField("Powód", reason)
        .addField("Maksymalna liczba ostrzeżeń", "**3**")
    
      const warnchannel = message.guild.channels.find("name", "❌logi_kar");
      if (!warnchannel) return message.reply("Nie znalazłem kanału ``❌logi_kar``");
    
      warnchannel.send(warnEmbed);
    
      if (warns[wUser.id].warns === 3) {
        message.guild.member(wUser).ban(reason);
        message.reply(`<@${wUser.id}> został/a zbanowany/a za maksymalną liczbę ostrzeżeń ``3`` `);
      }
      message.channel.send(`Pomyślnie ostrzeżono użytkownika: **${wUser}** \n Powód: ${reason} \n Aktualnie posiada: ${warns[wUser.id].warns} warnów`);
    }
    if(cmd === `${prefix}unmute`){
      if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send(":lock: Dostęp zablokowany. nie posiadasz roli ``Moderator``");

      const toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if (!toMute) return message.channel.send("Nie podałeś/aś nazwy użytkownika ani identyfikatora");
      const role = message.guild.roles.find(r => r.name === "Muted");
      if (!role || !toMute.roles.has(role.id)) return message.channel.send("Ten użytkownik jest już odciszony!");
    
      await toMute.removeRole(role);
      message.channel.send(`Pomyślnie odciszono użytkownika ${toMute}`);
    
      return;
      message.react("452183703267835910");
    }

});
bot.login(process.env.BOT_TOKEN);
